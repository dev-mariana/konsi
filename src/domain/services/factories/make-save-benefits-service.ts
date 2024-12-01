import { FetchBenefitsService } from '../../../infra/api/fetch-benefits.service';
import { GenerateTokenService } from '../../../infra/api/generate-token.service';
import { SaveBenefitsService } from '../save-benefits.service';
import { SendQueueService } from '../send-queue.service';

export function makeSaveBenefitsService(redisService) {
  const generateTokenService = new GenerateTokenService();
  const fetchBenefitsService = new FetchBenefitsService();
  const sendQueueService = new SendQueueService();
  const saveBenefitsService = new SaveBenefitsService(
    generateTokenService,
    fetchBenefitsService,
    redisService,
    sendQueueService,
  );

  return saveBenefitsService;
}
