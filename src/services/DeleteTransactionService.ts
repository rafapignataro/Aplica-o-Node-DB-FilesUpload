import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transactionRepository.findOne(transaction_id);

    if (!transaction) {
      throw new AppError('This transaction does not exists');
    }

    await transactionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
