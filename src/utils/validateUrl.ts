export default function validateUrl(url: string): boolean {
  const expression = /[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi;
  const regexp = new RegExp(expression);
  const result = regexp.test(url);

  return result;
}
