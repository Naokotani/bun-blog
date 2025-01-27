export default async function getFileContents(path: string) {
  try {
    const file = await Bun.file(path).text();
    return file;
  } catch (e) {
    console.error(e);
    return false;
  }
}
