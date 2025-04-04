import { useState } from 'react';
import PatientList from './PatientList';
import PatientAddModal from './PatientAddModal';
import MainLayout from '../layouts/MainLayout';
import { usePatients } from '../../contexts/PatientContext';
import { PatientFormData } from '../../types/patient';

const PatientManager: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addPatient } = usePatients();

  const handleAddPatient = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewPatient = (data: PatientFormData) => {
    addPatient(data);
  };

  return (
    <MainLayout onAddPatient={handleAddPatient}>
      <PatientList />

      <PatientAddModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewPatient}
      />
    </MainLayout>
  );
};

export default PatientManager;
