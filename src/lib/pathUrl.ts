export function generatePathUrl(name: string, maxLength = 50): string {
  if (!name) return "";

  // 1. Convert to lowercase and replace spaces/symbols with dash
  let pathUrl = name.toLowerCase().replace(/[\s\W_]+/g, "-");
  
  // 2. Remove leading/trailing dashes
  pathUrl = pathUrl.replace(/^-+|-+$/g, "");

  // 3. Truncate without cutting words
  if (pathUrl.length > maxLength) {
    // Find last dash before maxLength
    const lastDash = pathUrl.lastIndexOf("-", maxLength);
    if (lastDash > 0) {
      pathUrl = pathUrl.substring(0, lastDash);
    } else {
      // If no dash, just truncate
      pathUrl = pathUrl.substring(0, maxLength);
    }
  }

  return pathUrl;
}
