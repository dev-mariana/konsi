import axios from 'axios';
import { GenerateTokenParams } from './interfaces/generate-token-params';

export async function generateToken(
  params: GenerateTokenParams,
): Promise<string | undefined> {
  const { baseUrl, username, password } = params;

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
