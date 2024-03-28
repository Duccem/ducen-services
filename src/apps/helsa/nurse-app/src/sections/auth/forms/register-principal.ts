import { required } from '@shared/ui-native';

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
};
