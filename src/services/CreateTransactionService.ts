import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';

  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const balance = await transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Transaction type is not valid.');
    }

    if (type === 'outcome' && value > balance.total) {
      throw new AppError('The value exceds the total');
    }

    const cat = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (cat) {
      const transaction = transactionsRepository.create({
        title,
        value,
        type,
        category_id: cat.id,
      });
      await transactionsRepository.save(transaction);
      return transaction;
    }

    const newCategory = categoriesRepository.create({
      title: category,
    });
    await categoriesRepository.save(newCategory);

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: newCategory.id,
    });
    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
