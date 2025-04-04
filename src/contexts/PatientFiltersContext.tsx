import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { useForm, useWatch, UseFormRegister } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { usePatients } from './PatientContext';
import { Patient } from '../types/patient';
import { useDebounce } from '../hooks/useDebounce';
import { useMediaQuery } from '../hooks/useMediaQuery';

export type SortOption = {
  id: string;
  label: string;
  sortFn: (a: Patient, b: Patient) => number;
};

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortMethod {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  ID = 'id',
}

export type FilterFormValues = {
  searchQuery: string;
  sortBy: SortMethod;
  sortDirection: SortDirection;
};

interface PatientFiltersContextType {
  formValues: FilterFormValues;
  debouncedSearchQuery: string;
  sortOptions: SortOption[];
  toggleSortDirection: () => void;
  resetFilters: () => void;
  filteredPatients: Patient[];
  isFiltering: boolean;
  setValue: (
    name: keyof FilterFormValues,
    value: FilterFormValues[keyof FilterFormValues],
  ) => void;
  setIsFiltering: (isFiltering: boolean) => void;
  register: UseFormRegister<FilterFormValues>;
  // Pagination
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  paginatedPatients: Patient[];
  loadMore: () => void;
  isMobile: boolean;
  scrollToTop: () => void;
}

const sortOptions: SortOption[] = [
  {
    id: SortMethod.NAME,
    label: 'Name',
    sortFn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: SortMethod.CREATED_AT,
    label: 'Date Created',
    sortFn: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  },
  {
    id: SortMethod.ID,
    label: 'ID',
    sortFn: (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
  },
];

const DEFAULT_FILTER_VALUES: FilterFormValues = {
  searchQuery: '',
  sortBy: SortMethod.NAME,
  sortDirection: SortDirection.ASC,
};

const PatientFiltersContext = createContext<
  PatientFiltersContextType | undefined
>(undefined);

interface PatientFiltersProviderProps {
  children: ReactNode;
}

export const PatientFiltersProvider: React.FC<PatientFiltersProviderProps> = ({
  children,
}) => {
  const { patients } = usePatients();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltering, setIsFiltering] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayLimit, setDisplayLimit] = useState(itemsPerPage);

  const form = useForm<FilterFormValues>({
    defaultValues: {
      searchQuery: searchParams.get('q') || DEFAULT_FILTER_VALUES.searchQuery,
      sortBy:
        (searchParams.get('sort') as SortMethod) ||
        DEFAULT_FILTER_VALUES.sortBy,
      sortDirection:
        (searchParams.get('dir') as SortDirection) ||
        DEFAULT_FILTER_VALUES.sortDirection,
    },
  });

  const { setValue, reset, control, register } = form;
  const formValues = useWatch({ control }) as FilterFormValues;
  const debouncedSearchQuery = useDebounce(formValues.searchQuery || '', 300);
  const debouncedIsFiltering = useDebounce(isFiltering, 150);

  useEffect(() => {
    const isSearchingQuery =
      debouncedSearchQuery && debouncedSearchQuery.length >= 3;

    setIsFiltering(formValues.searchQuery?.length >= 3 && !isSearchingQuery);

    const newParams = new URLSearchParams();

    if (debouncedSearchQuery) newParams.set('q', debouncedSearchQuery);
    if (formValues.sortBy !== DEFAULT_FILTER_VALUES.sortBy)
      newParams.set('sort', formValues.sortBy);
    if (formValues.sortDirection !== DEFAULT_FILTER_VALUES.sortDirection)
      newParams.set('dir', formValues.sortDirection);

    setSearchParams(newParams, { replace: true });
  }, [debouncedSearchQuery, formValues, setSearchParams]);

  useEffect(() => {
    const hasNonDefaultSort =
      formValues.sortBy !== DEFAULT_FILTER_VALUES.sortBy ||
      formValues.sortDirection !== DEFAULT_FILTER_VALUES.sortDirection;

    if (hasNonDefaultSort) {
      setIsFiltering(true);
      const timer = setTimeout(() => setIsFiltering(false), 250);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [formValues.sortBy, formValues.sortDirection]);

  const toggleSortDirection = useCallback(() => {
    const newDirection =
      formValues.sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    setValue('sortDirection', newDirection);
  }, [formValues.sortDirection, setValue]);

  const resetFilters = useCallback(() => {
    reset(DEFAULT_FILTER_VALUES);
    setSearchParams(new URLSearchParams(), { replace: true });
    setIsFiltering(false);
  }, [reset, setSearchParams]);

  const filteredPatients = useMemo(() => {
    if (!patients?.length) return [];

    return patients
      .filter((patient) => {
        if (!debouncedSearchQuery) return true;

        const query = debouncedSearchQuery.toLowerCase();
        return patient.name.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        const sortOption = sortOptions.find(
          (option) => option.id === formValues.sortBy,
        );
        if (!sortOption) return 0;

        const result = sortOption.sortFn(a, b);
        return formValues.sortDirection === SortDirection.ASC
          ? result
          : -result;
      });
  }, [
    debouncedSearchQuery,
    formValues.sortBy,
    formValues.sortDirection,
    patients,
  ]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPatients.length / itemsPerPage),
    [filteredPatients, itemsPerPage],
  );

  const paginatedPatients = useMemo(() => {
    if (isMobile) {
      return filteredPatients.slice(0, displayLimit);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage, isMobile, displayLimit]);

  const loadMore = useCallback(() => {
    if (isMobile && displayLimit < filteredPatients.length) {
      setDisplayLimit((prev) => prev + itemsPerPage);
    }
  }, [isMobile, displayLimit, filteredPatients.length, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayLimit(itemsPerPage);
  }, [
    debouncedSearchQuery,
    formValues.sortBy,
    formValues.sortDirection,
    itemsPerPage,
  ]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const contextValue = useMemo(
    () => ({
      formValues,
      debouncedSearchQuery,
      sortOptions,
      toggleSortDirection,
      resetFilters,
      filteredPatients,
      isFiltering: debouncedIsFiltering,
      setValue,
      setIsFiltering,
      register,
      // Pagination
      currentPage,
      totalPages,
      itemsPerPage,
      setCurrentPage,
      paginatedPatients,
      loadMore,
      isMobile,
      scrollToTop,
    }),
    [
      formValues,
      debouncedSearchQuery,
      toggleSortDirection,
      resetFilters,
      filteredPatients,
      debouncedIsFiltering,
      setValue,
      setIsFiltering,
      register,
      currentPage,
      totalPages,
      itemsPerPage,
      setCurrentPage,
      paginatedPatients,
      loadMore,
      isMobile,
      scrollToTop,
    ],
  );

  return (
    <PatientFiltersContext.Provider value={contextValue}>
      {children}
    </PatientFiltersContext.Provider>
  );
};

export const usePatientFiltersContext = (): PatientFiltersContextType => {
  const context = useContext(PatientFiltersContext);
  if (!context) {
    throw new Error(
      'usePatientFiltersContext must be used within a PatientFiltersProvider',
    );
  }
  return context;
};
