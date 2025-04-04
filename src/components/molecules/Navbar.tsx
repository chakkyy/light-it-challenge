import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
  onAddPatient: () => void;
}

const StyledNavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.surface}CC;
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${(props) => props.theme.colors.border}30;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const StyledLogo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const StyledLogoText = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  letter-spacing: 0.02em;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

const StyledThemeToggle = styled(motion.button)`
  background-color: ${(props) => props.theme.colors.background}80;
  border: 1px solid ${(props) => props.theme.colors.border}60;
  border-radius: ${(props) => props.theme.borderRadius.full};
  padding: ${(props) => props.theme.spacing.xs};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.primary};
  transition: all 0.2s ease;
  font-size: 1.1rem;
  backdrop-filter: blur(5px);

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}15;
    border-color: ${(props) => props.theme.colors.primary}40;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.primary}20;
  }
`;

const StyledAddPatientButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px ${(props) => props.theme.colors.primary}40;
  padding: ${(props) => props.theme.spacing.md};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${(props) => props.theme.colors.primary}60;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: ${(props) => props.theme.spacing.sm};

    span {
      display: none;
    }
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    padding: ${(props) => props.theme.spacing.xs};
  }
`;

const Navbar: React.FC<NavbarProps> = ({
  toggleTheme,
  isDark,
  onAddPatient,
}) => {
  return (
    <StyledNavContainer>
      <StyledLogoContainer>
        <StyledLogo
          src="https://assets.slite.com/logos/favicon.ico"
          alt="Logo"
        />
        <StyledLogoText>Patient Management System</StyledLogoText>
      </StyledLogoContainer>

      <StyledButtonContainer>
        <StyledAddPatientButton
          onClick={onAddPatient}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
        >
          <FaUserPlus size={14} />
          <span>Add Patient</span>
        </StyledAddPatientButton>

        <StyledThemeToggle
          onClick={toggleTheme}
          whileTap={{ scale: 0.95 }}
          whileHover={{ rotate: isDark ? -15 : 15 }}
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </StyledThemeToggle>
      </StyledButtonContainer>
    </StyledNavContainer>
  );
};

export default Navbar;
