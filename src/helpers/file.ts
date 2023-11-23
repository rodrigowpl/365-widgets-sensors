import * as fs from "fs";
import path from "path";

export const readFile = (fileName: string): Promise<string> => {
  const absoluteFilePath = path.join(process.cwd(), "src", fileName);

  return new Promise((resolve, reject) => {
    fs.readFile(absoluteFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
