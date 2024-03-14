import { Navigate } from "react-router-dom"

export const ProtectIndex = () => {
  return <Navigate to={'/home/dashboard'}></Navigate>
}
