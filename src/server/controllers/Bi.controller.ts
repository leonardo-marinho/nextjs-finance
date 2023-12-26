import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import UserId from '../decorators/UserId.decorator';
import { BiCalculateBalanceBody } from '../dtos/BiCalculateBalanceBody.dto';
import { BiCalculateBalanceResponse } from '../dtos/BiCalculateBalanceResponse.dto';
import BiService from '../services/Bi.service';

class BiController {
  @Endpoint({ private: true })
  async calculateBalance(
    @Body({ schema: BiCalculateBalanceBody }) { filters }: BiCalculateBalanceBody,
    @UserId userId: number,
  ): Promise<BiCalculateBalanceResponse> {
    return await BiService.calculateBalance(filters, userId);
  }
}

export default new BiController();
