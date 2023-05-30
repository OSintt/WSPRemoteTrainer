import fs from 'fs';
import path from 'path';

async function arr() {
  try {
    const texto = await fs.promises.readFile(path.join(__dirname, "/arr.txt"), "utf-8");
    return texto.split("\n");
  } catch (err) {
    console.error("Ocurrió un error:", err);
    return [];
  }
}

export default arr;