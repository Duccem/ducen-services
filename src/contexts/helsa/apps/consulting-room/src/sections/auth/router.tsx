import { AuthIndex } from "./pages";
import { Completed } from "./pages/Completed";
import { CreateCredentials } from "./pages/CreateCredentials";
import { Login } from "./pages/Login";
import { NewPassword } from "./pages/NewPassword";
import { SelectRegister } from "./pages/SelectRegister";
import { UserRegister } from "./pages/UserRegister";

export const AuthRouter = {
  path: "/auth",
  Component: AuthIndex,
  children: [
    { path: "login", Component: Login },
    { path: "select-register", Component: SelectRegister },
    { path: "register-user", Component: UserRegister },
    { path: "create-credentials", Component: CreateCredentials },
    { path: "completed", Component: Completed},
    { path: "recovery-password", Component: NewPassword },
    { path: "new-password", Component: NewPassword },
  ],
}
