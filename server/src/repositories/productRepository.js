import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(__dirname, '../db/data/container/2010-01.json');


const readProducts = () => {
  return new Promise((resolve, reject) => {
    // readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse)
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeProducts = (products) => {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(products, null, 2);
    fs.writeFile(productsFilePath, jsonData, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export { readProducts, writeProducts };
