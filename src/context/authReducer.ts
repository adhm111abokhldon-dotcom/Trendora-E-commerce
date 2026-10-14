import { User } from "@/types/ecommerce";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthAction = {
  type: string;
  payload?: Partial<AuthState>;
};

type authReducer = (state: AuthState, action: AuthAction) => AuthState;

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer: authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        user: action.payload?.user ?? null,
        isAuthenticated: true,
        isLoading: false,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    }
    case "INITIALIZE_AUTH": {
      return {
        ...state,
        user: action.payload?.user ?? null,
        isAuthenticated: action.payload?.isAuthenticated ?? false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;

