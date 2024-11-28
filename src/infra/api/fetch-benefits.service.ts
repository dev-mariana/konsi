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
    try {
      const response = await this.axios.get(
        `/api/v1/inss/consulta-beneficios?cpf=${taxId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { beneficios: benefits } = response.data.data;

      const mappedBenefits = benefits.map((benefit) => {
        return {
          number: benefit.numero_beneficio,
          type_code: benefit.codigo_tipo_beneficio,
        };
      });

      return mappedBenefits;
    } catch (error) {
      console.error(error);
    }
  }
}
