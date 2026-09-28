const getContentExcerpt = (body: string, maxLength = 150) => {
  const plainText = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*[-+*]\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const characters = Array.from(plainText);

  if (characters.length <= maxLength) return plainText;

  return `${characters.slice(0, maxLength - 1).join("")}…`;
};

export default getContentExcerpt;
