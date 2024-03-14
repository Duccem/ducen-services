import { useUserContext } from "@/modules/user/state/UserContext";
import { LoginForm } from "@/sections/auth/forms/LoginForm";
import { Button, Facebook, Form, Google, PasswordInput, SocialButton, TextInput, XIcon, useForm } from "@shared/ui-web";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, submitting } = useForm({
    validateOn: 'all',
    fields: LoginForm,
  });
  const { login } = useUserContext();
  async function dispatchLogin(event) {
    handleSubmit(event, async ({ identifier, password }) => {
      try {
        await login(identifier, password);
        navigate('/main')
      } catch (error) {
        console.log(error)
      }
    });
  }
  function enterHandler(event) {
    if (event.key === 'Enter') dispatchLogin(event);
  }
  return (
    <>
      <div className="flex justify-center items-center flex-col h-full box-border">
        <div className="h-full w-full p-[15px] flex flex-col box-border items-center justify-center">
          <div className="w-3/4">
            <p className="text-3xl font-bold mb-[5px]">Hey, Hello!</p>
            <p className="text-lg font-normal">Welcome to Helsa, your mobile hospital!</p>
          </div>
          <div className="my-5 w-3/4">
          <Form className='mt-[1.25rem]' onSubmit={() => console.log('submit')}>
            <TextInput placeholder="Username" id="username" {...register('email')}/>
            <PasswordInput placeholder="Password"  {...register('password')} onKeyDown={enterHandler} />
            <Button width={'percent.larger'} type="submit" submitting={submitting}>
              Log In
            </Button>
          </Form>
            <div className="flex justify-between items-center">
              <Link className="mt-5 block text-black no-underline hover:underline" to="/auth/recovery-password">
                Forgot password?
              </Link>
              <Link className="font-semibold mt-5 block text-black no-underline hover:underline" to="/auth/select-register">
                Sign Up for Free
              </Link>
            </div>
          </div>
          <div className="mt-8 w-3/4 flex flex-row justify-start items-center gap-5">
            <p>Log in with</p>
            <div className="flex gap-3">
              <SocialButton>
                <Google size={15}/>
              </SocialButton>
              <SocialButton>
                <Facebook size={15}/>
              </SocialButton>
              <SocialButton>
                <XIcon size={15}/>
              </SocialButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
