export const getBasePath = (): string => {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/jopi-sport' : '');
};

export const getAssetUrl = (path: string): string => {
  const base = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
