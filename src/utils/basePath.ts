export const getBasePath = (): string => {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? '';
};

export const getAssetUrl = (path: string): string => {
  const base = getBasePath();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
