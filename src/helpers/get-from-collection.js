/**
 * get-next-from-collection
 * get-previous-from-collection
 */
export const getNextFromCollection = (collection, selected) => {
  const selectedIndex = collection.indexOf(selected);
  const previousIndex = selectedIndex >= collection.length - 1? 0: selectedIndex + 1;
  return collection[previousIndex];
};

export const getPreviousFromCollection = (collection, selected) => {
  const selectedIndex = collection.indexOf(selected);
  const previousIndex = selectedIndex === 0? collection.length - 1 : selectedIndex - 1;
  return collection[previousIndex];
};
