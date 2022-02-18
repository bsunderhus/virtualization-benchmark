import { PNG } from "pngjs";

export async function base64ToPNG(base64: string) {
  const buffer = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const png = new PNG();
  return new Promise<PNG>((resolve, reject) => {
    png.parse(buffer, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export async function base64ToWhitespaceAmount(base64: string) {
  const png = await base64ToPNG(base64);
  return png.data.reduce((acc, curr) => (curr === 255 ? acc + 1 : acc), 0);
}
