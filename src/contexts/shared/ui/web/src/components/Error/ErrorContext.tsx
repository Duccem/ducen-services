import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Notification } from "../Notification/Notification";

export const ErrorContext = createContext({
  setError: (_error: any) => {}
})

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState(null);
  return (
    <ErrorContext.Provider value={{setError}}>
      { error && <Notification type={'error'} title={error.message} closeAction={() => setError(null)} /> }
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorContext = () => useContext(ErrorContext);
