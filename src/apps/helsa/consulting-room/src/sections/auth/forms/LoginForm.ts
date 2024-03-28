import { required } from '@shared/ui-web';

export const LoginForm = {
  email: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  password: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
