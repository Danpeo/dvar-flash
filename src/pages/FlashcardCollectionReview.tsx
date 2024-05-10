import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import { getFromLocalStorage } from "../utils/localStorage.ts";
import { Container } from "../components/Container.tsx";
import { Flashcard } from "../entities/flashcard.ts";
import { shuffleArray } from "../utils/extensions.ts";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";

export const FlashcardCollectionReview = () => {
  let currentFlashcard: number = 0;

  const { collectionId } = useParams();

  /* const [flashcardCollection, setFlashcardCollection] =
    useState<FlashcardCollection>();*/

  const [flashcardsToReview, setFlashcardsToReview] = useState<Flashcard[]>([]);

  useEffect(() => {
    const flashcardCollections = getFromLocalStorage<FlashcardCollection>(
      flashcardCollectionsKey,
    );

    const collection = flashcardCollections.find(
      (fc) => fc.id === collectionId,
    );

    if (collection) {
      const flashcards = collection.flashcards.filter((f) => !f.doRemember);
      shuffleArray(flashcards);
      setFlashcardsToReview(flashcards);
      console.log(flashcards);
    }

    //setFlashcardCollection(collection);
  }, [collectionId]);

  return (
    <>
      <Container>
        {flashcardsToReview.length > 0 ? (
          <>
            <p>{flashcardsToReview[currentFlashcard].main}</p>
          </>
        ) : (
          <p>No shit!</p>
        )}

        <p>sdf</p>
        <p>sdf</p>
        <p>sdf</p>
        <p>sdf</p>
      </Container>
    </>
  );
};
