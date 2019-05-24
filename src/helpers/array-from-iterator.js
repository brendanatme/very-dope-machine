const iterate = (iterator, cb) => {
  for (
    let item = iterator.next();
    item && !item.done;
    item = iterator.next()
  ) {
    cb(item.value);
  }
};

export const arrayFromIterator = iterator => {
  let arr = [];
  iterate(iterator, item => arr.push(item));
  return arr;
};
