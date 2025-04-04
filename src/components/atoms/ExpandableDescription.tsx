import React, { useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ExpandableDescriptionProps {
  description?: string;
  maxChars?: number;
  maxHeight?: number;
  className?: string;
}

const StyledDescriptionContainer = styled.div`
  width: 100%;
  position: relative;
`;

const StyledDescriptionContent = styled.div<{
  $maxHeight: number;
  $isExpanded: boolean;
}>`
  overflow-y: ${({ $isExpanded }) => ($isExpanded ? 'auto' : 'hidden')};
  max-height: ${({ $maxHeight, $isExpanded }) =>
    $isExpanded ? `${$maxHeight}px` : '150px'};
  line-height: 1.6;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1rem;
  transition: max-height 0.3s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.border};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.background}30;
    border-radius: 3px;
  }
`;

const StyledToggleButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  margin-top: 12px;
  display: block;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledFade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(
    to bottom,
    transparent,
    ${(props) => props.theme.colors.background}70
  );
  pointer-events: none;
  opacity: 0.8;
`;

const StyledEmptyDescription = styled.div`
  color: ${(props) => props.theme.colors.text.light};
  font-style: italic;
`;

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description = '',
  maxChars = 300,
  maxHeight = 250,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { displayText, isTruncated } = useMemo(() => {
    if (!description) return { displayText: '', isTruncated: false };
    const shouldTruncate = description.length > maxChars && !isExpanded;
    return {
      displayText: shouldTruncate
        ? `${description.slice(0, maxChars)}...`
        : description,
      isTruncated: shouldTruncate,
    };
  }, [description, maxChars, isExpanded]);

  useEffect(() => {
    if (contentRef.current) {
      const exceedsHeight = contentRef.current.scrollHeight > 150;
      setNeedsExpansion(exceedsHeight || isTruncated);
    }
  }, [description, isTruncated]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  if (!description) {
    return (
      <StyledEmptyDescription>No description available</StyledEmptyDescription>
    );
  }

  return (
    <StyledDescriptionContainer className={className}>
      <StyledDescriptionContent
        ref={contentRef}
        $maxHeight={maxHeight}
        $isExpanded={isExpanded}
      >
        {displayText}
      </StyledDescriptionContent>

      {needsExpansion && !isExpanded && <StyledFade />}

      {needsExpansion && (
        <StyledToggleButton onClick={toggleExpand} whileTap={{ scale: 0.95 }}>
          {isExpanded ? 'Show less' : 'Show more'}
        </StyledToggleButton>
      )}
    </StyledDescriptionContainer>
  );
};

export default ExpandableDescription;
