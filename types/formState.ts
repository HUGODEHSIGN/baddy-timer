export type FormSuccessState = {
  status: 'success';
  message: string;
};

export type FormErrorState = {
  status: 'error';
  message: string;
  errors?: {
    path: string;
    message: string;
  }[];
};

export type FormState = FormSuccessState | FormErrorState | null;
