import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';

type ImageStatus = 'loading' | 'loaded' | 'error';

interface CachedImage {
  status: ImageStatus;
  timestamp: number;
}

interface ImageCacheContextType {
  getImageStatus: (url: string) => ImageStatus;
  setImageLoaded: (url: string) => void;
  setImageError: (url: string) => void;
  clearImageError: (url: string) => void;
  getPlaceholderForUrl: (url: string, name?: string) => string;
}

const ImageCacheContext = createContext<ImageCacheContextType | undefined>(
  undefined,
);

const ERROR_EXPIRY_MS = 5 * 60 * 1000;

export const ImageCacheProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [imageCache, setImageCache] = useState<Record<string, CachedImage>>({});

  const getImageStatus = useCallback(
    (url: string): ImageStatus => {
      const cached = imageCache[url];
      if (!cached) return 'loading';

      if (cached.status === 'error') {
        const now = Date.now();
        if (now - cached.timestamp > ERROR_EXPIRY_MS) {
          return 'loading';
        }
      }

      return cached.status;
    },
    [imageCache],
  );

  const setImageLoaded = useCallback((url: string) => {
    setImageCache((prev) => ({
      ...prev,
      [url]: {
        status: 'loaded',
        timestamp: Date.now(),
      },
    }));
  }, []);

  const setImageError = useCallback((url: string) => {
    setImageCache((prev) => ({
      ...prev,
      [url]: {
        status: 'error',
        timestamp: Date.now(),
      },
    }));
  }, []);

  const clearImageError = useCallback((url: string) => {
    setImageCache((prev) => {
      const newCache = { ...prev };
      delete newCache[url];
      return newCache;
    });
  }, []);

  const getPlaceholderForUrl = useCallback((name = 'User'): string => {
    return `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(name)}`;
  }, []);

  const value = useMemo(
    () => ({
      getImageStatus,
      setImageLoaded,
      setImageError,
      clearImageError,
      getPlaceholderForUrl,
    }),
    [
      getImageStatus,
      setImageLoaded,
      setImageError,
      clearImageError,
      getPlaceholderForUrl,
    ],
  );

  return (
    <ImageCacheContext.Provider value={value}>
      {children}
    </ImageCacheContext.Provider>
  );
};

export const useImageCache = () => {
  const context = useContext(ImageCacheContext);
  if (context === undefined) {
    throw new Error('useImageCache must be used within an ImageCacheProvider');
  }
  return context;
};
