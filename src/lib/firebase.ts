import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  Auth,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}

export async function signInWithGoogleFirebase(): Promise<{
  success: boolean;
  user?: {
    email: string;
    displayName: string;
    photoURL?: string;
    uid: string;
  };
  error?: string;
}> {
  try {
    const auth = getFirebaseAuth();
    if (!auth) {
      return {
        success: false,
        error: 'Firebase nao configurado. Adicione as credenciais nas variaveis de ambiente (.env).',
      };
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const result = await signInWithPopup(auth, provider);
    const fbUser: User = result.user;

    if (!fbUser.email) {
      return {
        success: false,
        error: 'Nao foi possivel obter o e-mail da conta Google autenticada.',
      };
    }

    return {
      success: true,
      user: {
        email: fbUser.email,
        displayName: fbUser.displayName || fbUser.email.split('@')[0],
        photoURL: fbUser.photoURL || undefined,
        uid: fbUser.uid,
      },
    };
  } catch (err: unknown) {
    console.error('Erro na autenticacao Firebase Google', err);
    const errorObj = err as { code?: string; message?: string };
    
    if (errorObj?.code === 'auth/popup-closed-by-user') {
      return {
        success: false,
        error: 'Janela de autenticacao do Google foi fechada antes de concluir.',
      };
    }
    if (errorObj?.code === 'auth/unauthorized-domain') {
      return {
        success: false,
        error: 'Dominio nao autorizado no Console do Firebase. Adicione "localhost" e o dominio da loja em Authentication > Settings > Authorized domains.',
      };
    }
    if (errorObj?.code === 'auth/configuration-not-found') {
      return {
        success: false,
        error: 'Provedor Google nao habilitado no Firebase. Ative "Google" em Firebase Console > Authentication > Sign-in method.',
      };
    }

    return {
      success: false,
      error: errorObj?.message || 'Falha ao autenticar com Google Firebase.',
    };
  }
}

export async function signOutFirebase(): Promise<void> {
  const auth = getFirebaseAuth();
  if (auth) {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Erro ao deslogar do Firebase', err);
    }
  }
}
