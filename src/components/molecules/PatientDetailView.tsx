import React from 'react';
import { FaGlobe, FaIdCard, FaCalendarAlt } from 'react-icons/fa';
import { Patient } from '../../types/patient';
import ExpandableDescription from '../atoms/ExpandableDescription';
import {
  StyledModalHeader,
  StyledAvatarContainer,
  StyledAvatar,
  StyledPatientInfo,
  StyledName,
  StyledMetaInfo,
  StyledMetaItem,
  StyledMetaIcon,
  StyledDescription,
} from '../styles/PatientModalStyles';

interface PatientDetailViewProps {
  patient: Patient;
  initials: string;
  patientName: string;
  shouldUseOriginal: boolean;
  imageSrc: string;
  formatDate: (date: string) => string;
  isValidUrl: (url: string) => boolean;
  onImageError: () => void;
  onImageLoad: () => void;
}

const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patient,
  initials,
  patientName,
  shouldUseOriginal,
  imageSrc,
  formatDate,
  isValidUrl,
  onImageError,
  onImageLoad,
}) => {
  return (
    <>
      <StyledModalHeader>
        <StyledAvatarContainer>
          <StyledAvatar>
            {shouldUseOriginal ? (
              <img
                src={imageSrc}
                alt={patientName}
                onError={onImageError}
                onLoad={onImageLoad}
                crossOrigin="anonymous"
              />
            ) : (
              initials
            )}
          </StyledAvatar>
        </StyledAvatarContainer>
        <StyledPatientInfo>
          <StyledName>{patientName}</StyledName>
          <StyledMetaInfo>
            <StyledMetaItem>
              <StyledMetaIcon>
                <FaIdCard aria-hidden="true" size={16} />
              </StyledMetaIcon>
              <span>{patient.id}</span>
            </StyledMetaItem>

            <StyledMetaItem>
              <StyledMetaIcon>
                <FaCalendarAlt aria-hidden="true" size={16} />
              </StyledMetaIcon>
              <span>Created {formatDate(patient.createdAt)}</span>
            </StyledMetaItem>

            {patient.website && isValidUrl(patient.website) && (
              <StyledMetaItem>
                <StyledMetaIcon>
                  <FaGlobe aria-hidden="true" size={16} />
                </StyledMetaIcon>
                <a
                  href={patient.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website URL
                </a>
              </StyledMetaItem>
            )}
          </StyledMetaInfo>
        </StyledPatientInfo>
      </StyledModalHeader>

      {patient.description && (
        <StyledDescription>
          <ExpandableDescription
            description={patient.description}
            maxChars={300}
            maxHeight={250}
          />
        </StyledDescription>
      )}
    </>
  );
};

export default PatientDetailView;
