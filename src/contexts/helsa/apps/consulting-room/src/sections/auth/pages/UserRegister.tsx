import { useCities } from '@/modules/shared/hooks/useCities';
import { useConfData } from '@/modules/shared/hooks/useConfData';
import { useCountries } from '@/modules/shared/hooks/useCountries';
import { useUserContext } from '@/modules/user/state/UserContext';
import { User } from '@helsa/modules';
import { Primitives } from '@shared/core';
import { Button, Form, Input, useForm } from '@shared/ui-web';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../forms/RegisterForm';

export function UserRegister() {
  const location = useNavigate();
  const { countries, phoneCodes } = useCountries();
  const [selectedCity, setSelectedCity] = useState('');
  const { cities } = useCities(selectedCity);
  const { latitude, longitude, lang, theme, timezone } = useConfData();
  const { setPartialUser } = useUserContext();
  const { register, handleSubmit, handleChange, submitting } = useForm({
    validateOn: 'all',
    fields: RegisterForm,
  });
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
          phoneNumber: data.codeNumber.toString() + data.phoneNumber.toString(),
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
      <div className="flex flex-col justify-center items-center box-border h-full">
        <div className="h-full w-full p-4 flex flex-col gap-5 justify-center items-center box-border">
          <div className="w-3/4">
            <p className="text-3xl font-bold mb-1">Member information</p>
            <p className="text-base text-[#747474]">Register the essential information</p>
          </div>
          <Form onSubmit={handleClickRegister} className="mt-[1.25rem] w-[75%]">
            <Input placeholder="First Name" {...register('firstName')} />
            <Input placeholder="Last Name" {...register('lastName')} />
            <Input placeholder="Email" {...register('email')} />
            <Input.Date placeholder="Birth date" {...register('birthDate')} />
            <div className="flex gap-3 justify-between">
              <Input.Select
                autocomplete
                className="w-1/6"
                options={phoneCodes}
                {...register('codeNumber')}
                placeholder="Code"
              />
              <Input placeholder="Phone Number" className="w-3/6" {...register('phoneNumber')} />
              <Input.Select
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' },
                  { label: 'Other', value: 'OTHER' },
                ]}
                className="w-2/6"
                {...register('gender')}
                placeholder="Gender"
              />
            </div>
            <div className="flex gap-3">
              <Input.Select
                autocomplete
                options={countries}
                {...register('country')}
                onChange={(value) => {
                  setSelectedCity(value);
                  handleChange('country', value);
                }}
                placeholder="Country"
              />
              <Input.Select autocomplete options={cities} {...register('city')} placeholder="City" />
              <Input placeholder="Zip Code" {...register('zipCode')} />
              <Input placeholder="Street" {...register('street')} />
            </div>
            <Input.Check {...register('terms')} placeholder="Ok with our terms of service" />
            <Button type="submit" className="mt-3" submitting={submitting}>
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
