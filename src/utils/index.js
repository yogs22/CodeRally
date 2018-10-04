export const validateUrl = (url) => {
  const urlRegex = /^(https:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  if (urlRegex.test(url)) {
    return true;
  }
  return false;
};

export const validateRepoLink = (link) => {
  const urlRegex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
  if (urlRegex.test(link)) {
    return true;
  }
  return false;
};

export default {
  validateUrl,
  validateRepoLink,
};
