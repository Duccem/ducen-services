import { useErrorContext } from '@/modules/shared/ErrorContext';
import { useUserContext } from '@/modules/user/state/UserContext';
import { LoginForm } from '@/sections/auth/forms/LoginForm';
import { Button, Facebook, Form, Google, LinkedinIcon, PasswordInput, SocialButton, TextInput, useForm } from '@ducen/ui-web';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
export function Login() {
  const navigate = useNavigate();
  const { setErrorData } = useErrorContext();
  const { register, handleSubmit, submitting } = useForm({
    validateOn: 'all',
    fields: LoginForm,
  });
  const { login } = useUserContext();
  async function dispatchLogin(event) {
    handleSubmit(event, async ({ identifier, password }) => {
      try {
        await login(identifier, password);
        navigate('/main');
      } catch (error) {
        setErrorData(error);
      }
    });
  }
  function enterHandler(event) {
    if (event.key === 'Enter') dispatchLogin(event);
  }
  return (
    <>
      <div className={styles.login__page}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <p className={styles.login__header__title}>Hey, Hello!</p>
            <p className={styles.login__header__subtitle}>Welcome to Helsa, your mobile hospital!</p>
          </div>
          <div className={styles.login__login}>
            <Form className={styles.login__login__form} onSubmit={dispatchLogin}>
              <TextInput placeholder="Username" id="username" {...register('email')} />
              <PasswordInput placeholder="Password" {...register('password')} onKeyDown={enterHandler} />
              <Button type="submit" submitting={submitting}>
                Log In
              </Button>
            </Form>
            <div className={styles.login__login__links}>
              <Link className={styles.login__login__link} to="/auth/recovery-password">
                Forgot password?
              </Link>
              <Link
                className={styles.login__login__link}
                to="/auth/select-register"
              >
                Sign Up for Free
              </Link>
            </div>
          </div>
          <div className={styles.login__social}>
            <p>Log in with</p>
            <div className={styles.login__social__buttons}>
              <SocialButton>
                <Google size={15} />
              </SocialButton>
              <SocialButton>
                <Facebook size={15} />
              </SocialButton>
              <SocialButton>
                <LinkedinIcon size={15} />
              </SocialButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
