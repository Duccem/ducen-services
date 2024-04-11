import { required } from '@ducen/ui-web';

export const GuildForm = {
  name: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  email: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  country: {
    value: '',
  },
  foundationDate: {
    value: '',
  },
  image: {
    value: '',
  },
  terms: {
    value: false,
    validators: {
      required: (v: string) => required(v),
    },
  },
};
