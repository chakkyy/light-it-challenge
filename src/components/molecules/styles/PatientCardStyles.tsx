import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${(props) => props.theme.borderRadius.full};
  background-color: ${(props) => props.theme.colors.background};
  flex-shrink: 0;
  transition: all 0.2s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledCardContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: ${(props) => props.theme.spacing.lg};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 220px;
  width: 100%;
  min-width: 280px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    outline: 1px solid ${(props) => props.theme.colors.primary};

    ${StyledAvatar} {
      outline: 1px solid ${(props) => props.theme.colors.primary}40;
    }
  }
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const StyledAvatarContainer = styled.div`
  margin-right: ${(props) => props.theme.spacing.md};
  position: relative;
`;

export const StyledMedicalLabel = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  background: ${(props) => props.theme.colors.surface};
  border: 2px solid ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius.full};
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  color: ${(props) => props.theme.colors.primary};
`;

export const StyledPatientInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const StyledPatientName = styled.h3`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1.25rem;
  line-height: 1.3;
`;

export const StyledMetaData = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.xs};
  margin-top: ${(props) => props.theme.spacing.xs};
`;

export const StyledMetaTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

export const StyledDateTag = styled(StyledMetaTag)`
  color: ${(props) => props.theme.colors.text.light};
  background-color: transparent;
  padding-left: 0;
`;

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: auto;
  padding-top: ${(props) => props.theme.spacing.md};
`;

export const StyledActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.colors.text.secondary};
  padding: ${(props) => props.theme.spacing.md};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    border-color: ${(props) => props.theme.colors.primary}40;
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-1px);
  }
`;

export const StyledPrimaryButton = styled(StyledActionButton)`
  background-color: ${(props) => props.theme.colors.primary}15;
  border-color: ${(props) => props.theme.colors.primary}30;
  color: ${(props) => props.theme.colors.primary};
`;
