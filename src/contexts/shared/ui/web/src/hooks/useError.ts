export const useError = () => {
  function errorCatching(cb: () => void, setError: (error: boolean) => void, setMessageError: (message: string) => void) {
    try {
      cb();
    } catch (error) {
      setError(true);
      setMessageError(error.message);
    }
  }
  return {
    errorCatching,
  };
};
