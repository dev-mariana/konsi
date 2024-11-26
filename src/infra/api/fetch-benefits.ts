import axios from 'axios';
import { env } from '../env';

export async function fetchBenefits(
  taxId: string,
  token: string,
): Promise<any> {
  const baseUrl = env.BASE_URL;

  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/inss/consulta-beneficios?cpf=${taxId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
