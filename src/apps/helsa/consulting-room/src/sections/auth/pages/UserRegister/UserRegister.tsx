import { useCities } from '@/modules/shared/hooks/useCities';
import { useConfData } from '@/modules/shared/hooks/useConfData';
import { useCountries } from '@/modules/shared/hooks/useCountries';
import { useUserContext } from '@/modules/user/state/UserContext';
import { Primitives } from '@ducen/core';
import { AnimatedView, Button, CheckInput, DateInput, Form, PhoneInput, SelectInput, TextInput, useForm } from '@ducen/ui-web';
import { User } from '@helsa/modules';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../../forms/RegisterForm';
import styles from './styles.module.css';

export function UserRegister() {
  const location = useNavigate();
  const { countries, phoneCodes } = useCountries();
  const [selectedCity, setSelectedCity] = useState('');
  const [phoneCode, setPhoneCode] = useState('+1');
  const { cities } = useCities(selectedCity);
  const { latitude, longitude, lang, theme, timezone } = useConfData();
  const { setPartialUser } = useUserContext();
  const { register, handleSubmit, handleChange, submitting } = useForm({
    validateOn: 'all',
    fields: RegisterForm,
  });
  useEffect(() => {
    const filteredPhone = phoneCodes.find((phone) => phone.value === selectedCity);
    if(filteredPhone) setPhoneCode(filteredPhone.label);
  }, [selectedCity])
  function handleClickRegister(e) {
    handleSubmit(
      e,
      (data) => {
        const user: Partial<Primitives<User>> = {
          name: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          email: data.email,
          birthDate: new Date(data.birthDate),
          phoneNumber: phoneCode + data.phoneNumber.toString(),
          address: {
            country: data.country,
            city: data.city,
            zipCode: data.zipCode,
            street: data.street,
            coordinates: {
              latitude,
              longitude,
            },
          },
          configuration: {
            lang,
            theme,
            timezone,
          },
        };
        setPartialUser(user);
        location('/auth/create-credentials');
      },
      (values) => {
        console.log(values);
      },
    );
  }
  return (
    <>
      <AnimatedView className={styles.register__page}>
        <div className={styles.register__container}>
          <div className={styles.register__header}>
            <p className={styles.register__header__title}>Member information</p>
            <p className={styles.register__header__subtitle}>Register the essential information</p>
          </div>
          <Form onSubmit={handleClickRegister} className={styles.register__form}>
            <TextInput placeholder="First Name" {...register('firstName')} />
            <TextInput placeholder="Last Name" {...register('lastName')} />
            <TextInput placeholder="Email" {...register('email')} />
            <DateInput placeholder="Birth date" {...register('birthDate')} />
            <div className={styles.register__form__address}>
              <SelectInput
                autocomplete
                options={countries}
                {...register('country')}
                onChange={(value) => {
                  setSelectedCity(value);
                  handleChange('country', value);
                }}
                placeholder="Country"
              />
              <SelectInput autocomplete options={cities} {...register('city')} placeholder="City" />
              <TextInput placeholder="Zip Code" {...register('zipCode')} />
              <TextInput placeholder="Street" {...register('street')} />
            </div>
            <div className={styles.register__form__other}>
              <PhoneInput placeholder="Phone" code={phoneCode} {...register('phoneNumber')} />
              <SelectInput
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' },
                  { label: 'Other', value: 'OTHER' },
                ]}
                {...register('gender')}
                placeholder="Gender"
              />
            </div>
            <CheckInput {...register('terms')} placeholder="Ok with our terms of service" />
            <Button type="submit" className={styles.register__form__button} submitting={submitting}>
              Sign Up
            </Button>
          </Form>
        </div>
      </AnimatedView>
    </>
  );
}
