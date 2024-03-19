import { useUserContext } from '@/modules/user/state/UserContext';
import { Button, Form, Input, useForm } from '@shared/ui-web';
import { useNavigate } from 'react-router-dom';
import { EmailForm } from '../forms/EmailForm';

export function RecoveryPassword() {
  const navigate = useNavigate();
  const { handleSubmit, register, submitting } = useForm({
    fields: EmailForm,
  });
  const { recoveryPassword } = useUserContext();
  const submitEmail = (event) => {
    handleSubmit(event, async ({ email }) => {
      await recoveryPassword(email);
      navigate('/auth/email-sended');
    });
  }
  return (
    <>
      <div className="h-full w-full flex box-border py-[20px] px-[30px] flex-col justify-center items-center">
        <div className="w-3/4 mb-4">
          <p className="text-2xl font-semibold">Introduce your email</p>
        </div>
        <Form onSubmit={submitEmail} className='W-[75%]'>
          <Input placeholder="Your email" {...register('email')} />
          <Button type="submit" submitting={submitting}>Identify</Button>
        </Form>
      </div>
    </>
  );
}
