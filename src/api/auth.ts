import api from "../lib/api";
import { User } from "../types/ecommerce";

type LoginResponse = {
  status: string;
  data: { accessToken: string; user: User };
};

const login = async (credentials: {
  username: string;
  password: string;
}): Promise<{ accessToken: string; user: User }> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data.data;
};

export { login };
