import React, { useMemo, KeyboardEvent } from 'react';
import {
  FaEye,
  FaEdit,
  FaHeartbeat,
  FaIdBadge,
  FaCalendarAlt,
} from 'react-icons/fa';
import { usePatientAvatar } from '../../hooks/usePatientAvatar';
import {
  StyledAvatar,
  StyledCardHeader,
  StyledCardContainer,
  StyledDateTag,
  StyledMetaTag,
  StyledMetaData,
  StyledPatientName,
  StyledMedicalLabel,
  StyledPatientInfo,
  StyledPrimaryButton,
  StyledActionsContainer,
  StyledActionButton,
  StyledAvatarContainer,
} from './styles/PatientCardStyles';
import { Patient } from '../../types/patient';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onViewDetails: (patient: Patient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onEdit,
  onViewDetails,
}) => {
  const {
    shouldUseOriginal,
    imageSrc,
    initials,
    handleImageError,
    handleImageLoad,
  } = usePatientAvatar({
    avatarUrl: patient.avatar,
    patientName: patient.name,
    patientId: patient.id,
  });

  const patientName = patient.name?.trim() || 'Unnamed Patient';

  const formattedDate = useMemo(() => {
    try {
      const date = new Date(patient.createdAt);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    } catch {
      return 'Unknown date';
    }
  }, [patient.createdAt]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(patient);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onViewDetails(patient);
    }
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onEdit(patient);
    }
  };

  return (
    <StyledCardContainer
      onClick={() => onViewDetails(patient)}
      onKeyDown={handleKeyDown}
      whileTap={{ scale: 0.98 }}
      tabIndex={0}
      role="button"
      aria-label={`View details for patient ${patientName}`}
    >
      <StyledCardHeader>
        <StyledAvatarContainer>
          <StyledAvatar aria-hidden="true">
            {shouldUseOriginal ? (
              <img
                src={imageSrc}
                alt={`${patientName} avatar`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                crossOrigin="anonymous"
                key={patient.avatar}
              />
            ) : (
              initials
            )}
          </StyledAvatar>
          <StyledMedicalLabel
            aria-label="Medical record"
            title="Medical record"
          >
            <FaHeartbeat size={14} />
          </StyledMedicalLabel>
        </StyledAvatarContainer>
        <StyledPatientInfo>
          <StyledPatientName title={patientName}>
            {patientName}
          </StyledPatientName>
          <StyledMetaData>
            <StyledMetaTag>
              <FaIdBadge aria-hidden="true" />
              <span>
                <span className="sr-only">ID:</span> {patient.id}
              </span>
            </StyledMetaTag>
            <StyledDateTag>
              <FaCalendarAlt aria-hidden="true" />
              <span>
                <span className="sr-only">Created:</span> {formattedDate}
              </span>
            </StyledDateTag>
          </StyledMetaData>
        </StyledPatientInfo>
      </StyledCardHeader>

      <StyledActionsContainer>
        <StyledActionButton
          onClick={handleEdit}
          onKeyDown={handleEditKeyDown}
          whileTap={{ scale: 0.97 }}
          aria-label={`Edit patient ${patientName}`}
        >
          <FaEdit size={14} aria-hidden="true" />
          <span>Edit</span>
        </StyledActionButton>
        <StyledPrimaryButton
          onClick={() => onViewDetails(patient)}
          whileTap={{ scale: 0.97 }}
          aria-label={`View details for patient ${patientName}`}
        >
          <FaEye size={14} aria-hidden="true" />
          <span>View</span>
        </StyledPrimaryButton>
      </StyledActionsContainer>
    </StyledCardContainer>
  );
};

export default PatientCard;
