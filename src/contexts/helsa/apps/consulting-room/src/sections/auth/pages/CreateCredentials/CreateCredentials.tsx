import { useUserContext } from '@/modules/user/state/UserContext';
import { Button, Form, Input, useForm } from '@shared/ui-web';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialsForm } from '../../forms/CredentialsForm';
import styles from './styles.module.css';

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
      <div className={styles.credentials__page}>
        <div className={styles.credentials__container}>
          <div className={styles.credentials__header}>
            <p className={styles.credentials__header__title}>Access Credentials</p>
            <p className={styles.credentials__header__subtitle}>Username and password to login</p>
          </div>
          <Form onSubmit={handleCredentialsSubmit} className={styles.credentials__form}>
            <Input.Password placeholder="Password" {...register('password')} />
            <Input.Password placeholder="Confirm Password" {...register('newPassword')} />
            <Button className={styles.credentials__form__button} type="submit" submitting={submitting}>
              Finish
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
