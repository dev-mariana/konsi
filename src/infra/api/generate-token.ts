import axios from 'axios';
import { env } from '../env';

export async function generateToken(): Promise<string | undefined> {
  const {
    BASE_URL: baseUrl,
    EXTERNAL_API_USERNAME: username,
    EXTERNAL_API_PASSWORD: password,
  } = env;

  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/token`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.token;
  } catch (error) {
    console.error(error);
  }
}
