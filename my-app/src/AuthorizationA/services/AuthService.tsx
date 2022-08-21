import { AxiosResponse } from "axios";
import { api } from "../axios/axios";

class AuthService {

  async login(email: string, password: string ): Promise<AxiosResponse<SinginResponse>> {
    return api.post('/signin', {email, password})
  }

  async registration(name: string, email: string, password: string ): Promise<AxiosResponse<RegistrationResponse>> {
    return api.post('/users', {name, email, password})
  }

}

export const authService = new AuthService;

interface SinginResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

interface RegistrationResponse {
  id: string;
  name: string;
  email: string;
}