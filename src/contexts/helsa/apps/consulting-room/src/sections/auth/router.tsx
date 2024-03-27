import { AuthIndex } from "./pages";
import { Completed } from "./pages/Completed/Completed";
import { CreateCredentials } from "./pages/CreateCredentials/CreateCredentials";
import { Login } from "./pages/Login/Login";
import { NewPassword } from "./pages/NewPassword/NewPassword";
import { RecoveryPassword } from "./pages/RecoveryPassword/RecoveryPassword";
import { SelectRegister } from "./pages/SelectRegister/SelectRegister";
import { UserRegister } from "./pages/UserRegister/UserRegister";

export const AuthRouter = {
  path: "/auth",
  Component: AuthIndex,
  children: [
    { path: "login", Component: Login },
    { path: "select-register", Component: SelectRegister },
    { path: "register-user", Component: UserRegister },
    { path: "create-credentials", Component: CreateCredentials },
    { path: "completed", Component: Completed},
    { path: "recovery-password", Component: RecoveryPassword },
    { path: "new-password", Component: NewPassword },
  ],
}
