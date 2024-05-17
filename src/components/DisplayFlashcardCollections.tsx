import { Fragment, useEffect, useState } from "react";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../utils/localStorage.ts";
import { useNavigate } from "react-router-dom";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";
import { Button } from "./Button.tsx";
import { updateCollectionInLocalStorage } from "../utils/flashcardUtils.ts";

type DisplayFlashcardCollectionsProps = {
  _flashcardCollections: FlashcardCollection[];
};

export const DisplayFlashcardCollections = ({
  _flashcardCollections,
}: DisplayFlashcardCollectionsProps) => {
  const navigate = useNavigate();

  const [flashcardCollections, setFlashcardCollections] = useState<
    FlashcardCollection[]
  >(_flashcardCollections);
  useEffect(() => {
    setFlashcardCollections(_flashcardCollections);
  }, [_flashcardCollections]);

  const resetCollection = (collection: FlashcardCollection) => {
    for (let flashcard of collection.flashcards) {
      flashcard.doRemember = false;
      flashcard.rememberedInARow = 0;
    }
    updateCollectionInLocalStorage(collection);
  };

  const deleteCollection = (collection: FlashcardCollection) => {
    const collections = getFromLocalStorage<FlashcardCollection>(
      flashcardCollectionsKey,
    );
    const updatedCollections = collections.filter(
      (f) => f.id !== collection.id,
    );
    setToLocalStorage(flashcardCollectionsKey, updatedCollections);
    setFlashcardCollections(updatedCollections);
  };

  return (
    <>
      {flashcardCollections.length > 0 ? (
        <>
          <div className="grid grid-cols-5 gap-3 mt-4">
            {flashcardCollections.map((collection, index) => (
              <Fragment key={`${index}-main`}>
                <div className="card-flip-x flex border border-red-500 p-6 bg-gray-800">
                  <div className="">
                    <p className="text-xl text-center font-semibold mb-3">
                      {collection.name}
                    </p>
                    <Button
                      type={"button"}
                      buttonText={"REVIEW"}
                      onClick={() => navigate(`/review/${collection.id}`)}
                    />
                    <Button
                      type={"button"}
                      buttonText={"VIEW"}
                      onClick={() => navigate(`/view/${collection.id}`)}
                    />
                    <Button
                      type={"button"}
                      buttonText={"RESET"}
                      onClick={() => resetCollection(collection)}
                    />{" "}
                    <Button
                      type={"button"}
                      buttonText={"DELETE"}
                      onClick={() => deleteCollection(collection)}
                    />
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </>
      ) : (
        <p className="text-amber-500">No flashcard collections found</p>
      )}
    </>
  );
};
