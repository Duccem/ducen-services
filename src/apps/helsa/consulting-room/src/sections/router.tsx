import { createBrowserRouter } from "react-router-dom";
import { ProtectIndex } from "../modules/shared/components/IndexComponent";
import { AuthRouter } from "./auth/router";
import { HomeRouter } from "./home/router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectIndex,
  },
  AuthRouter,
  HomeRouter,
]);
