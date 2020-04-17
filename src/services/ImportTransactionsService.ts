import path from 'path';
import csv from 'csv-parser';
import fs from 'fs';

import { getCustomRepository, getRepository } from 'typeorm';

import uploadConfig from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';

import Category from '../models/Category';

interface Request {
  filename: string;
}

interface NewTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';

  category: string;
}

class ImportTransactionsService {
  public async execute({ filename }: Request): Promise<object[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const filePath = path.join(uploadConfig.directory, filename);

    const parseCSV = (): Promise<NewTransaction[]> => {
      const transactions: NewTransaction[] = [];
      const stream = fs.createReadStream(filePath);

      return new Promise(resolve => {
        stream
          .pipe(
            csv({
              headers: ['title', 'type', 'value', 'category'],
              skipLines: 1,
            }),
          )
          .on('data', row => {
            const transactionRow: NewTransaction = {
              title: row.title.trim(),
              value: parseFloat(row.value.trim()),
              type: row.type.trim(),
              category: row.category.trim(),
            };
            transactions.push(transactionRow);
          })
          .on('end', () => {
            resolve(transactions);
          });
      });
    };
    const objectedCSV = await parseCSV();

    await Promise.all(
      objectedCSV.map(
        async (transaction): Promise<void> => {
          const cat = await categoriesRepository.findOne({
            where: { title: transaction.category },
          });

          let category_id = '';

          if (cat) {
            category_id = cat.id;
          } else {
            const newCategory = categoriesRepository.create({
              title: transaction.category,
            });
            category_id = newCategory.id;
            await categoriesRepository.save(newCategory);
          }

          const newTransaction = transactionsRepository.create({
            title: transaction.title,
            value: transaction.value,
            type: transaction.type,
            category_id,
          });
          await transactionsRepository.save(newTransaction);
        },
      ),
    );
    return objectedCSV;
  }
}

export default ImportTransactionsService;
