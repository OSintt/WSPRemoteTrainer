import fs from 'fs';

async function arr() {
  try {
    const texto = await fs.promises.readFile("arr.txt", "utf-8");
    return texto.split("\n");
  } catch (err) {
    console.error("Ocurrió un error:", err);
    return [];
  }
}

export default arr;