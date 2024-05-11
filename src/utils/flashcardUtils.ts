import { getFromLocalStorage, setToLocalStorage } from "./localStorage.ts";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";

export const updateCollectionInLocalStorage = (
  updatedCollection: FlashcardCollection,
) => {
  const flashcardCollections = getFromLocalStorage<FlashcardCollection>(
    flashcardCollectionsKey,
  );

  const updatedCollections = flashcardCollections.map((collection) =>
    collection.id === updatedCollection.id ? updatedCollection : collection,
  );

  setToLocalStorage(flashcardCollectionsKey, updatedCollections);
};
