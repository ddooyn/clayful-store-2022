import clayful from "clayful/client-js";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticated = () => {
    const Customer = clayful.Customer;

    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    Customer.authenticate(options, function (err, result) {
      if (err) {
        console.log(err.code);
        setIsAuth(false);
        return;
      }
      const headers = result.headers;
      const data = result.data;
      console.log(data);

      if (data.authenticated) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  };

  const signOut = () => {
    setIsAuth(false);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const AuthContextData = {
    isAuth,
    isAuthenticated,
    signOut,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
