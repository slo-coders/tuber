const convertArray = item => {
  if (Array.isArray(item) === false) {
    item = [item];
  }
  return item;
};

module.exports = convertArray;
