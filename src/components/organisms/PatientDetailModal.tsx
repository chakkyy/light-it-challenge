import React, { useState, useMemo, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { Patient, PatientFormData } from '../../types/patient';
import { useImageCache } from '../../contexts/ImageCacheContext';
import PatientDetailView from '../molecules/PatientDetailView';
import PatientEditModal from './PatientEditModal';
import {
  StyledModalContent,
  StyledButtonContainer,
  StyledCloseButton,
  StyledEditButton,
  customModalStyles,
} from '../styles/PatientModalStyles';

interface PatientDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  patient: Patient | null;
  onSave?: (id: string, data: PatientFormData) => void;
}

const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  isOpen,
  onRequestClose,
  patient,
  onSave,
}) => {
  const {
    getImageStatus,
    setImageLoaded,
    setImageError,
    getPlaceholderForUrl,
  } = useImageCache();
  const [imgError, setImgError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [localPatient, setLocalPatient] = useState<Patient>(
    patient || ({} as Patient),
  );

  useEffect(() => {
    if (patient) {
      setLocalPatient(patient);
      setImgError(false);
    }
  }, [patient]);

  const patientName = useMemo(() => {
    return localPatient?.name?.trim() || 'Unnamed Patient';
  }, [localPatient?.name]);

  const initials = useMemo(() => {
    if (!patientName || patientName === 'Unnamed Patient') return '?';

    return patientName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }, [patientName]);

  const isValidUrl = (url: string) => {
    try {
      return URL.canParse(url);
    } catch {
      return false;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return 'Invalid date';
    }
  };

  const imageStatus = getImageStatus(localPatient?.avatar || '');

  const shouldUseOriginal = useMemo(() => {
    return !!(localPatient?.avatar && imageStatus !== 'error' && !imgError);
  }, [localPatient?.avatar, imageStatus, imgError]);

  const imageSrc = useMemo(() => {
    return shouldUseOriginal
      ? localPatient?.avatar
      : getPlaceholderForUrl(patientName);
  }, [
    shouldUseOriginal,
    localPatient?.avatar,
    getPlaceholderForUrl,
    patientName,
  ]);

  const handleImageError = () => {
    setImgError(true);
    setImageError(localPatient?.avatar || '');
  };

  const handleImageLoad = () => {
    setImageLoaded(localPatient?.avatar || '');
  };

  const handleSavePatient = (data: PatientFormData) => {
    if (!onSave || !patient) return;

    setLocalPatient((prev) => ({
      ...prev,
      ...data,
      lastUpdated: new Date().toISOString(),
    }));

    onSave(patient.id, data);
  };

  if (!patient) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customModalStyles}
        contentLabel="Patient Details"
        ariaHideApp={false}
      >
        <StyledModalContent>
          <StyledButtonContainer>
            {onSave && (
              <StyledEditButton
                onClick={() => setIsEditModalOpen(true)}
                whileTap={{ scale: 0.9 }}
              >
                <FaEdit aria-hidden="true" />
              </StyledEditButton>
            )}
            <StyledCloseButton
              onClick={onRequestClose}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes aria-hidden="true" />
            </StyledCloseButton>
          </StyledButtonContainer>

          <PatientDetailView
            patient={localPatient}
            initials={initials}
            patientName={patientName}
            shouldUseOriginal={shouldUseOriginal}
            imageSrc={imageSrc || ''}
            formatDate={formatDate}
            isValidUrl={isValidUrl}
            onImageError={handleImageError}
            onImageLoad={handleImageLoad}
          />
        </StyledModalContent>
      </Modal>

      <PatientEditModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        patient={patient}
        onSave={handleSavePatient}
        onDelete={() => {
          setIsEditModalOpen(false);
          onRequestClose();
        }}
      />
    </>
  );
};

export default PatientDetailModal;
