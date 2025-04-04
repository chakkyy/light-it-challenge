import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Patient } from '../../types/patient';
import {
  ConfirmModalOverlay,
  ConfirmModalContent,
  ConfirmModalTitle,
  ConfirmModalText,
  ConfirmModalButtons,
  CancelButton,
  ConfirmButton,
} from './styles/DeleteModalStyles';

interface DeleteConfirmationModalProps {
  patient: Patient;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  patient,
  onCancel,
  onConfirm,
}) => {
  return (
    <ConfirmModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ConfirmModalContent
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <ConfirmModalTitle>Delete Patient</ConfirmModalTitle>
        <ConfirmModalText>
          Are you sure you want to delete {patient.name}? This action cannot be
          undone.
        </ConfirmModalText>
        <ConfirmModalButtons>
          <CancelButton onClick={onCancel} whileTap={{ scale: 0.97 }}>
            Cancel
          </CancelButton>
          <ConfirmButton onClick={onConfirm} whileTap={{ scale: 0.97 }}>
            <FaTrashAlt size={14} />
            Delete
          </ConfirmButton>
        </ConfirmModalButtons>
      </ConfirmModalContent>
    </ConfirmModalOverlay>
  );
};

export default DeleteConfirmationModal;
