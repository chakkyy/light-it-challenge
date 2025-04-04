import React, { useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema, PatientFormSchema } from '../../schemas/patientSchema';
import { Patient, PatientFormData } from '../../types/patient';
import Spinner from '../atoms/Spinner';
import {
  StyledTitle,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledTextArea,
  StyledErrorMessage,
  StyledActions,
  StyledCancelButton,
  StyledSaveButton,
  StyledButtonContent,
} from '../styles/PatientModalStyles';

interface PatientEditFormProps {
  patient: Patient;
  onCancel: () => void;
  onSave: (id: string, data: PatientFormData) => void;
  isSaving?: boolean;
  isNewPatient?: boolean;
}

const PatientEditForm: React.FC<PatientEditFormProps> = ({
  patient,
  onCancel,
  onSave,
  isSaving = false,
  isNewPatient = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<PatientFormSchema>({
    resolver: yupResolver(patientSchema),
    mode: 'all',
    defaultValues: {
      name: patient.name || '',
      avatar: patient.avatar || '',
      description: patient.description || '',
      website: patient.website || '',
    },
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit: SubmitHandler<PatientFormSchema> = (data) => {
    const formData: PatientFormData = {
      name: data.name,
      avatar: data.avatar || undefined,
      website: data.website || undefined,
      description: data.description || undefined,
    };
    onSave(patient.id, formData);
  };

  return (
    <>
      <StyledTitle>{isNewPatient ? 'Add Patient' : 'Edit Patient'}</StyledTitle>
      {isSaving ? (
        <Spinner
          text={isNewPatient ? 'Adding patient...' : 'Saving changes...'}
          size="small"
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormGroup>
            <StyledLabel htmlFor="name">
              Name <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
            <StyledInput
              id="name"
              placeholder="Enter patient name"
              $hasError={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <StyledErrorMessage>{errors.name.message}</StyledErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel htmlFor="avatar">Avatar URL</StyledLabel>
            <StyledInput
              id="avatar"
              placeholder="Enter avatar URL"
              $hasError={!!errors.avatar}
              {...register('avatar')}
            />
            {errors.avatar && (
              <StyledErrorMessage>{errors.avatar.message}</StyledErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel htmlFor="website">Website</StyledLabel>
            <StyledInput
              id="website"
              placeholder="Enter website URL"
              $hasError={!!errors.website}
              {...register('website')}
            />
            {errors.website && (
              <StyledErrorMessage>{errors.website.message}</StyledErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel htmlFor="description">Description</StyledLabel>
            <StyledTextArea
              id="description"
              placeholder="Enter a description"
              $hasError={!!errors.description}
              {...register('description')}
            />
            {errors.description && (
              <StyledErrorMessage>
                {errors.description.message}
              </StyledErrorMessage>
            )}
          </StyledFormGroup>

          <StyledActions>
            <StyledCancelButton
              type="button"
              onClick={onCancel}
              whileTap={{ scale: 0.97 }}
              disabled={isSaving}
            >
              Cancel
            </StyledCancelButton>
            <StyledSaveButton
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={!isValid || isSaving}
            >
              <StyledButtonContent>
                <FaSave size={14} />
                <span>{isNewPatient ? 'Create' : 'Save'}</span>
              </StyledButtonContent>
            </StyledSaveButton>
          </StyledActions>
        </form>
      )}
    </>
  );
};

export default PatientEditForm;
