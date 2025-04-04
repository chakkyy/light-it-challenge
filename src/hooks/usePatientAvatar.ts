import { useState, useEffect, useMemo } from 'react';
import { useImageCache } from '../contexts/ImageCacheContext';
import {
  isInvalidImageUrl,
  getAvatarPlaceholder,
  getInitials,
} from '../utils/imageUtils';

interface UsePatientAvatarProps {
  avatarUrl?: string;
  patientName?: string;
  patientId?: string;
}

interface UsePatientAvatarResult {
  shouldUseOriginal: boolean;
  imageSrc: string;
  initials: string;
  handleImageError: () => void;
  handleImageLoad: () => void;
  resetImageState: () => void;
}

/**
 * Custom hook for handling patient avatars with proper error handling
 * and fallback to initials or placeholder images
 */
export const usePatientAvatar = ({
  avatarUrl = '',
  patientName = '',
  patientId = '',
}: UsePatientAvatarProps): UsePatientAvatarResult => {
  const { getImageStatus, setImageLoaded, setImageError, clearImageError } =
    useImageCache();

  const [imgError, setImgError] = useState(false);
  const name = patientName?.trim() || 'Unnamed Patient';

  const resetImageState = () => {
    setImgError(false);
    if (avatarUrl) {
      clearImageError(avatarUrl);
    }
  };

  useEffect(() => {
    resetImageState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, avatarUrl]);

  const initials = useMemo(() => {
    return getInitials(name);
  }, [name]);

  const imageStatus = getImageStatus(avatarUrl);
  const shouldUseOriginal = useMemo(() => {
    return !!(
      avatarUrl &&
      !isInvalidImageUrl(avatarUrl) &&
      imageStatus !== 'error' &&
      !imgError
    );
  }, [avatarUrl, imageStatus, imgError]);

  const imageSrc = useMemo(() => {
    return shouldUseOriginal ? avatarUrl : getAvatarPlaceholder(name);
  }, [shouldUseOriginal, avatarUrl, name]);

  const handleImageError = () => {
    setImgError(true);
    setImageError(avatarUrl);
  };

  const handleImageLoad = () => {
    setImageLoaded(avatarUrl);
  };

  return {
    shouldUseOriginal,
    imageSrc,
    initials,
    handleImageError,
    handleImageLoad,
    resetImageState,
  };
};
