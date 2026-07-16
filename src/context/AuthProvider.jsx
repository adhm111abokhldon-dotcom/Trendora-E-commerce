import { createContext, useContext, useEffect, useReducer } from "react";
import authReducer, { initialAuthState } from "./authReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");
        if (savedToken && savedUser) {
          authDispatch({
            type: "INITIALIZE_AUTH",
            payload: { user: JSON.parse(savedUser), isAuthenticated: true },
          });
        } else {
          authDispatch({
            type: "INITIALIZE_AUTH",
            payload: { user: null, isAuthenticated: false },
          });
        }
      } catch (error) {
        console.error(error);
        authDispatch({
          type: "INITIALIZE_AUTH",
          payload: { user: null, isAuthenticated: false },
        });
      }
    };
    checkAuth();
  }, []);

  const hanldleLogIn = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.accessToken);
    authDispatch({ type: "LOGIN_SUCCESS", payload: userData });
  };
  const hanldleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authDispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ hanldleLogIn, hanldleLogOut, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthProvider;
