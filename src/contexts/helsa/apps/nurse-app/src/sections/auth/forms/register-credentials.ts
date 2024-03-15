import { password, required } from '@shared/ui-native';

export const formRegisterCredentials = {
  password: {
    value: '',
    validators: {
      required: (v: string) => required(v),
      password: (v: string) => password(v),
    },
  },
  confirmPassword: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
