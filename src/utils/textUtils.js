export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}
