import { useUserContext } from '@/modules/user/state/UserContext';
import { Button, Form, PasswordInput, useForm } from '@shared/ui-web';
import { useSearchParams } from 'react-router-dom';
import { NewPasswordForm } from '../forms/NewPassword';

export function NewPassword() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const { changePassword } = useUserContext();

  const { register, handleSubmit, setError } = useForm({
    validateOn: 'all',
    fields: NewPasswordForm,
  });
  async function handleCredentialsSubmit(e) {
    handleSubmit(
      e,
      async ({ oldPassword, password, newPassword }) => {
        if (password !== newPassword) {
          setError('newPassword', 'Passwords do not match');
          return;
        }
        await changePassword(userId, password, oldPassword);
      },
      (values) => console.log(values),
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center box-border h-full">
        <div className="h-full w-full p-4 flex flex-col gap-5 justify-center items-center box-border">
          <div className="w-3/4">
            <p className="text-3xl font-bold mb-1">New password access</p>
            <p className="text-base text-[#747474]">Validate the new password</p>
          </div>
          <Form onSubmit={handleCredentialsSubmit} width={'75%'} className="mt-[1.25rem]">
            <PasswordInput placeholder="Old Password" {...register('oldPassword')} />
            <PasswordInput placeholder="New Password" {...register('password')} />
            <PasswordInput placeholder="Repeat Password" {...register('newPassword')} />
            <Button className="mt-5" width={'percent.larger'} type="submit">
              Change password
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
