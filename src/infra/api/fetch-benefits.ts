import axios from 'axios';
import { env } from '../env';

interface BenefitsResponse {
  number: string;
  type_code: string;
}

export async function fetchBenefits(
  taxId: string,
  token: string,
): Promise<BenefitsResponse[] | undefined> {
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

    const benefits = response.data.beneficios as BenefitsResponse[];

    return benefits;
  } catch (error) {
    console.error(error);
  }
}
