import axios, { AxiosInstance } from 'axios';
import { env } from '../env';

interface BenefitsResponse {
  number: string;
  type_code: string;
}

export class FetchBenefitsService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: env.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async fetchBenefits(
    taxId: string,
    token: string,
  ): Promise<BenefitsResponse[] | undefined> {
    const baseUrl = env.BASE_URL;

    try {
      const response = await this.axios.get(
        `/api/v1/inss/consulta-beneficios?cpf=${taxId}`,
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
}
