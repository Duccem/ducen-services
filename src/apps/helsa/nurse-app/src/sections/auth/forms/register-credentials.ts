import { match, password, required } from '@shared/ui-native';

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
      match: (v: string, form: any) => match(v, form, 'password'),
    },
  },
};
