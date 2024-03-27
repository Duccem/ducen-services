import { PropsWithChildren, createContext, useContext, useState } from "react";
import { GenericError } from "./components/GenericError/GenericError";

export const ErrorContext = createContext({
  setErrorData: (_error: any, _notification?: JSX.Element) => {}
})

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const setErrorData = (error: any, notification?: JSX.Element) => {
    setError(error);
    setNotification(notification)
  }
  return (
    <ErrorContext.Provider value={{setErrorData}}>
      { error && (notification ? notification : <GenericError error={error} action={() => setErrorData(null)}/>) }
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorContext = () => useContext(ErrorContext);
