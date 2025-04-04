import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import renderErrorToast from '@/utils/renderErrorToast';
import renderSuccessToast from '@/utils/renderSuccessToast';
import { Patient, PatientFormData } from '@/types/patient';

import PatientEditForm from './PatientEditForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { DeleteButton } from './styles/DeleteModalStyles';
import {
  StyledModalContent,
  StyledButtonContainer,
  StyledCloseButton,
  customModalStyles,
} from '../styles/PatientModalStyles';

interface PatientModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (id: string, data: PatientFormData) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
  patient: Patient | null;
  isNewPatient?: boolean;
  title?: string;
  successMessage?: string;
}

const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  onDelete,
  patient,
  isNewPatient = false,
  title,
  successMessage = 'Operation completed successfully',
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleClose = () => {
    if (!isSaving) {
      onRequestClose();
    }
  };

  const handleSave = async (id: string, data: PatientFormData) => {
    try {
      setIsSaving(true);
      await onSave(id, data);
      renderSuccessToast({
        message: successMessage,
      });
      onRequestClose();
    } catch (error) {
      renderErrorToast({
        message: 'Failed to save patient',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (patient && onDelete) {
      try {
        await onDelete(patient.id);
        renderSuccessToast({
          message: `Patient ${patient.name} successfully deleted`,
        });
        setShowDeleteConfirm(false);
        onRequestClose();
      } catch (error) {
        renderErrorToast({
          message: 'Failed to delete patient',
        });
        setShowDeleteConfirm(false);
      }
    }
  };

  if (!patient && !isNewPatient) {
    return null;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customModalStyles}
        contentLabel={
          title || (isNewPatient ? 'Add New Patient' : 'Edit Patient')
        }
        ariaHideApp={false}
      >
        <StyledModalContent>
          <StyledButtonContainer>
            <StyledCloseButton
              onClick={handleClose}
              whileTap={{ scale: 0.9 }}
              disabled={isSaving}
              style={{ opacity: isSaving ? 0.5 : 1 }}
            >
              <FaTimes aria-hidden="true" />
            </StyledCloseButton>
          </StyledButtonContainer>

          {patient && (
            <>
              <PatientEditForm
                patient={patient}
                onCancel={handleClose}
                onSave={handleSave}
                isSaving={isSaving}
                isNewPatient={isNewPatient}
              />

              {!isNewPatient && onDelete && (
                <DeleteButton
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isSaving}
                >
                  <FaTrashAlt />
                  Delete Patient
                </DeleteButton>
              )}
            </>
          )}
        </StyledModalContent>
      </Modal>

      {showDeleteConfirm && patient && (
        <DeleteConfirmationModal
          patient={patient}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default PatientModal;
