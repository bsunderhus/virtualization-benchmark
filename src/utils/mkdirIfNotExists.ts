import fs from "fs";

export async function mkdirIfNotExists(path: string) {
  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, { recursive: true });
  }
}
