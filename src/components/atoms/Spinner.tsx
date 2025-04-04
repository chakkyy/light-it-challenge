import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.98); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  padding: ${(props) => props.theme.spacing.xl};
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const StyledOverlay = styled(StyledContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.background}CC;
  backdrop-filter: blur(5px);
  z-index: 1000;
  min-height: 100vh;
`;

const StyledSpinnerWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const StyledSpinnerCircle = styled.div`
  border: 4px solid ${(props) => props.theme.colors.background};
  border-top: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledText = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-top: ${(props) => props.theme.spacing.sm};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

interface SpinnerProps {
  fullScreen?: boolean;
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const getSizeValue = (size: SpinnerProps['size']) => {
  switch (size) {
    case 'small':
      return '30px';
    case 'large':
      return '70px';
    case 'medium':
    default:
      return '50px';
  }
};

const Spinner: React.FC<SpinnerProps> = ({
  fullScreen = false,
  text = 'Loading...',
  size = 'medium',
}) => {
  const WrapperComponent = fullScreen ? StyledOverlay : StyledContainer;

  return (
    <WrapperComponent>
      <StyledSpinnerWrapper
        style={{ width: getSizeValue(size), height: getSizeValue(size) }}
      >
        <StyledSpinnerCircle />
      </StyledSpinnerWrapper>
      {text && <StyledText>{text}</StyledText>}
    </WrapperComponent>
  );
};

export default Spinner;
