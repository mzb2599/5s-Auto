export const generateUniqueId=(prefix)=> {
    const randomId = Math.floor(100000 + Math.random() * 900000); // Generate random number between 100000 and 999999
    return `${prefix}${randomId}`;
  }