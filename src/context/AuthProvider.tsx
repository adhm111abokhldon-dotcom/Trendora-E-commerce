import { createContext, useContext, useEffect, useReducer } from "react";
import authReducer, { initialAuthState } from "./authReducer";
import { User } from "@/types/ecommerce";

type AuthContextType = {
  authState: typeof initialAuthState;
  handleLogin: (data: { accessToken: string; user: User }) => void;
  handleLogout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
      } catch {
        authDispatch({
          type: "INITIALIZE_AUTH",
          payload: { user: null, isAuthenticated: false },
        });
      }
    };
    checkAuth();
  }, []);

  const handleLogin = ({ accessToken, user }: { accessToken: string; user: User }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", accessToken);
    authDispatch({ type: "LOGIN_SUCCESS", payload: { user } });
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authDispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

