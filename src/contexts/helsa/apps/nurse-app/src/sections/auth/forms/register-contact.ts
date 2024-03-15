import { required } from '@shared/ui-native';

export const formRegisterContact = {
  phoneNumber: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  country: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  city: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  street: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  zipCode: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
