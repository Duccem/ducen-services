import { useUserContext } from '@/modules/user/state/UserContext';
import { Button, Form, Input, useForm } from '@shared/ui-web';
import { useSearchParams } from 'react-router-dom';
import { NewPasswordForm } from '../../forms/NewPassword';
import styles from './styles.module.css';

export function NewPassword() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const { changePassword } = useUserContext();

  const { register, handleSubmit } = useForm({
    validateOn: 'all',
    fields: NewPasswordForm,
  });
  async function handleCredentialsSubmit(e) {
    handleSubmit(
      e,
      async ({ oldPassword, password }) => {
        await changePassword(userId, password, oldPassword);
      },
      (values) => console.log(values),
    );
  }
  return (
    <>
      <div className={styles.new__page}>
        <div className={styles.new__container}>
          <div className={styles.new__header}>
            <p className={styles.new__header__title}>New password access</p>
            <p className={styles.new__header__subtitle}>Validate the new password</p>
          </div>
          <Form onSubmit={handleCredentialsSubmit} className={styles.new__form}>
            <Input.Password placeholder="Old Password" {...register('oldPassword')} />
            <Input.Password placeholder="New Password" {...register('password')} />
            <Input.Password placeholder="Repeat Password" {...register('newPassword')} />
            <Button className={styles.new__form__button} type="submit">
              Change password
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
