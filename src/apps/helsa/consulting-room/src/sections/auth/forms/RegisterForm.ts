import { required } from '@ducen/ui-web';

export const RegisterForm = {
  firstName: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  lastName: {
    value: '',
  },
  email: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  birthDate: {
    value: '',
  },
  country: {
    value: '',
  },
  city: {
    value: '',
  },
  zipCode: {
    value: '',
  },
  street: {
    value: '',
  },
  phoneNumber: {
    value: '',
  },
  codeNumber: {
    value: '',
  },
  gender: {
    value: '',
  },
  terms: {
    value: false,
    validators: {
      required: (v: string) => required(v),
    },
  },
};
