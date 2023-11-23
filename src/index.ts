import { readFile } from "~/helpers/file";

import { evaluateSensors } from "./services";

export async function evaluateLogFile(logContentsStr?: string) {
  const fileData = logContentsStr ?? (await readFile("./mocks/log.txt"));
  console.log(await evaluateSensors(fileData));
}

evaluateLogFile();
