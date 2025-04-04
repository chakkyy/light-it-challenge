import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  position: relative;
`;

export const StyledGridContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(280px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  width: 100%;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledEmptyState = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const StyledResultCount = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

export const StyledPatientCardAnimated = styled.div`
  height: 100%;
`;

export const StyledLoadingOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.background}80;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: ${(props) => (props.$isVisible ? 0.8 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
`;

export const StyledNoResults = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl} 0;
  color: ${(props) => props.theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

export const StyledLoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing.md};
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  margin: ${(props) => props.theme.spacing.md} 0;

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.lg};
`;
