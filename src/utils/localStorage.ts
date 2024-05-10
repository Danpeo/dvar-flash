export const setToLocalStorage = <TArray>(
  storageKey: string,
  items: TArray[],
) => {
  localStorage.setItem(storageKey, JSON.stringify(items));
};

export const getFromLocalStorage = <T>(storageKey: string): T[] => {
  const storedItems = localStorage.getItem(storageKey);
  return storedItems ? JSON.parse(storedItems) : [];
};
