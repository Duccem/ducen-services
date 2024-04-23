import { required } from '@ducen/ui-native';

export const formRegisterPrincipal = {
  email: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  firstName: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  lastName: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  birthDate: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  gender: {
    value: '',
  },
  terms: {
    value: false,
    validators: {
      required: (v: boolean) => required(v),
    },
  },
};
