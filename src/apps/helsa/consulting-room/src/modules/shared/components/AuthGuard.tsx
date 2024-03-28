import { useSharedContext } from "@/modules/shared/state/SharedProvider";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ children, redirect }) => {
  const { sharedState } = useSharedContext()
  if(!sharedState.token) {
    return <Navigate to={redirect}></Navigate>
  }
  return children;
}
