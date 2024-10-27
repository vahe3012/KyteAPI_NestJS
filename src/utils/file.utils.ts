import * as fs from 'fs';
import * as path from 'path';

export function readFile<T>(relativePath: string): Promise<T> {
  const filePath = path.join(process.cwd(), relativePath);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(new Error(`Error reading file: ${filePath}`));
      }
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (error) {
        reject(
          new Error(`Error parsing JSON from: ${filePath} - ${error.message}`),
        );
      }
    });
  });
}
