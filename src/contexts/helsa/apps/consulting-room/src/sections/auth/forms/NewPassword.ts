import { match, password, required } from '@shared/ui-web';

export const NewPasswordForm = {
  oldPassword: {
    value: '',
    validators: {
      required: (v: string) => required(v),
      password: (v: string) => password(v),
    },
  },
  password: {
    value: '',
    validators: {
      required: (v: string) => required(v),
      password: (v: string) => password(v),
    },
  },
  newPassword: {
    value: '',
    validators: {
      required: (v: string) => required(v),
      match: (v: string, v2) => match(v, v2, 'password'),
    },
  },
};
