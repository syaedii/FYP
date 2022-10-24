import React, {useContext, useState} from 'react';
import Error from '../../subComponents/Error';
type ErrorType = {
  name: string;
  message: string;
};
type ErrorContextType = {
  error: ErrorType | undefined;
  setGlobalErrorMessage: (error: any) => void;
  resetError: () => void;
};
const ErrorContext = React.createContext<ErrorContextType>({
  error: {name: '', message: ''},
  setGlobalErrorMessage: () => {},
  resetError: () => {},
});

const ErrorProvider = (props: {children: React.ReactNode}) => {
  const [error, setError] = useState<ErrorType>();
  const setGlobalErrorMessage = (error: ErrorType) => {
    setError(error);
  };
  const resetError = () => {
    setError(undefined);
  };
  return (
    <ErrorContext.Provider value={{error, setGlobalErrorMessage, resetError}}>
      {props.children}
    </ErrorContext.Provider>
  );
};

const CommonError: React.FC = () => {
  const {error} = useContext(ErrorContext);
  return error && (error.name || error.message) ? (
    <Error error={error} showBack={true} />
  ) : (
    <></>
  );
};
export {ErrorContext, ErrorProvider};
export default CommonError;
