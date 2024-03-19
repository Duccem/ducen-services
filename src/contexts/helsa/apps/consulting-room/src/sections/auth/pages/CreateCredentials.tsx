import { useUserContext } from '@/modules/user/state/UserContext';
import { Button, Form, Input, useForm } from '@shared/ui-web';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsForm } from '../forms/CredentialsForm';

export function CreateCredentials() {
  const location = useNavigate();
  const { userState, register: registerUser, setPartialUser } = useUserContext();
  const { register, handleSubmit, submitting, setSubmitting } = useForm({
    validateOn: 'all',
    fields: CredentialsForm,
  });
  async function sendRegister() {
    setSubmitting(true);
    await registerUser();
    location('/auth/completed');
  }
  useEffect(() => {
    if (userState.user.password !== '') {
      sendRegister();
    }
  }, [userState.user.password]);
  async function handleCredentialsSubmit(e) {
    handleSubmit(
      e,
      async ({ password }) => {
        setPartialUser({
          password: password,
        });
      },
      (values) => console.log(values),
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center box-border h-full">
        <div className="h-full w-full p-4 flex flex-col gap-5 justify-center items-center box-border">
          <div className="w-3/4">
            <p className="text-3xl font-bold mb-1">Access Credentials</p>
            <p className="text-base text-[#747474]">Username and password to login</p>
          </div>
          <Form onSubmit={handleCredentialsSubmit} className="mt-[1.25rem] w-[75%]">
            <Input.Password placeholder="Password" {...register('password')} />
            <Input.Password placeholder="Confirm Password" {...register('newPassword')} />
            <Button className="mt-5" type="submit" submitting={submitting}>
              Finish
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
