import React from 'react';
import renderErrorToast from '@/utils/renderErrorToast';

import { Patient, PatientFormData } from '../../types/patient';
import PatientModal from '../molecules/PatientModal';
import { usePatients } from '../../contexts/PatientContext';

interface PatientEditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  patient: Patient | null;
  onSave: (data: PatientFormData) => void;
  onDelete?: () => void;
}

const PatientEditModal: React.FC<PatientEditModalProps> = ({
  isOpen,
  onRequestClose,
  patient,
  onSave,
  onDelete,
}) => {
  const { deletePatient } = usePatients();

  const handleSave = (id: string, data: PatientFormData) => {
    onSave(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePatient(id);
      onDelete?.();
      onRequestClose();
    } catch (error) {
      renderErrorToast({
        message: 'Failed to delete patient',
      });
    }
  };

  return (
    <PatientModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSave={handleSave}
      onDelete={handleDelete}
      patient={patient}
      title="Edit Patient"
      successMessage={
        patient ? `Patient ${patient.name} successfully updated` : ''
      }
    />
  );
};

export default PatientEditModal;
