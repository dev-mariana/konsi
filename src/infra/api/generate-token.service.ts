import axios, { AxiosInstance } from 'axios';
import { env } from '../env';

export class GenerateTokenService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: env.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async generateToken(): Promise<string | undefined> {
    const { EXTERNAL_API_USERNAME: username, EXTERNAL_API_PASSWORD: password } =
      env;

    try {
      const response = await this.axios.post(`/api/v1/token`, {
        username,
        password,
      });

      const { token } = response.data.data;

      return token;
    } catch (error) {
      console.error(error);
    }
  }
}
