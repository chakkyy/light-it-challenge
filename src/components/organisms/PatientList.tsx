import React, { useState } from 'react';
import { usePatients } from '../../contexts/PatientContext';
import { Patient, PatientFormData } from '../../types/patient';
import PatientDetailModal from './PatientDetailModal';
import PatientEditModal from './PatientEditModal';
import PatientCard from '../molecules/PatientCard';
import { usePatientFiltersContext } from '../../contexts/PatientFiltersContext';
import Spinner from '../atoms/Spinner';
import ScrollToTopButton from '../atoms/ScrollToTopButton';
import {
  StyledContainer,
  StyledGridContainer,
  StyledGrid,
  StyledEmptyState,
  StyledResultCount,
  StyledPatientCardAnimated,
  StyledLoadingOverlay,
  StyledNoResults,
  StyledLoadMoreButton,
  StyledPaginationContainer,
} from '../styles/PatientListStyles';
import Pagination from '../molecules/Pagination';

const PatientList: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updatePatient, isLoading } = usePatients();
  const {
    debouncedSearchQuery,
    filteredPatients,
    isFiltering,
    paginatedPatients,
    currentPage,
    totalPages,
    setCurrentPage,
    loadMore,
    isMobile,
  } = usePatientFiltersContext();

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailModalOpen(true);
  };

  const handleSavePatient = async (data: PatientFormData) => {
    if (selectedPatient) {
      try {
        await updatePatient(selectedPatient.id, data);
        setIsDetailModalOpen(false);
        setIsEditModalOpen(false);
      } catch {
        // Error is handled by the toast in the API layer
      }
    }
  };

  if (isLoading) {
    return <Spinner text="Loading patients..." fullScreen />;
  }

  if (!filteredPatients.length && !isFiltering) {
    return (
      <StyledNoResults>
        <h3>No patients found</h3>
        <p>Try adjusting your search criteria or add a new patient.</p>
      </StyledNoResults>
    );
  }

  return (
    <StyledContainer>
      {filteredPatients.length > 0 && (
        <StyledResultCount>
          Showing{' '}
          {isMobile
            ? paginatedPatients.length
            : `${paginatedPatients.length} of ${filteredPatients.length}`}{' '}
          {filteredPatients.length === 1 ? 'patient' : 'patients'}
          {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
        </StyledResultCount>
      )}

      <StyledGridContainer>
        <StyledLoadingOverlay $isVisible={isFiltering}>
          <Spinner size="small" />
        </StyledLoadingOverlay>

        <StyledGrid>
          {paginatedPatients.map((patient) => (
            <StyledPatientCardAnimated key={patient.id}>
              <PatientCard
                patient={patient}
                onEdit={handleEdit}
                onViewDetails={handleViewDetails}
              />
            </StyledPatientCardAnimated>
          ))}
        </StyledGrid>
      </StyledGridContainer>

      {!isLoading && !isFiltering && filteredPatients.length === 0 && (
        <StyledEmptyState>
          {debouncedSearchQuery
            ? 'No patients match your search criteria. Try different filters.'
            : 'No patients found. Add your first patient!'}
        </StyledEmptyState>
      )}

      {isMobile && filteredPatients.length > paginatedPatients.length && (
        <StyledLoadMoreButton
          onClick={loadMore}
          disabled={isLoading || isFiltering}
        >
          {isLoading ? <Spinner size="small" /> : 'Load more'}
        </StyledLoadMoreButton>
      )}

      {!isMobile && filteredPatients.length > 0 && (
        <StyledPaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </StyledPaginationContainer>
      )}

      <ScrollToTopButton />

      <PatientDetailModal
        isOpen={isDetailModalOpen}
        onRequestClose={() => setIsDetailModalOpen(false)}
        patient={selectedPatient}
        onSave={async (id, data) => {
          try {
            await updatePatient(id, data);
          } catch {
            // Error is handled by the toast in the API layer
          }
        }}
      />

      <PatientEditModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        patient={selectedPatient}
        onSave={handleSavePatient}
      />
    </StyledContainer>
  );
};

export default PatientList;
