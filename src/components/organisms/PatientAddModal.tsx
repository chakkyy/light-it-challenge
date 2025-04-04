import React from 'react';
import { PatientFormData } from '../../types/patient';
import PatientModal from '../molecules/PatientModal';

interface PatientAddModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (data: PatientFormData) => void;
}

const emptyPatient = {
  id: 'new',
  name: '',
  avatar: '',
  description: '',
  website: '',
  createdAt: new Date().toISOString(),
};

const PatientAddModal: React.FC<PatientAddModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
}) => {
  const handleSave = (_id: string, data: PatientFormData) => {
    onSave(data);
  };

  return (
    <PatientModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onSave={handleSave}
      patient={emptyPatient}
      isNewPatient
      title="Add New Patient"
      successMessage="Patient successfully added"
    />
  );
};

export default PatientAddModal;
