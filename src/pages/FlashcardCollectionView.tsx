import { useParams } from "react-router-dom";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import { Fragment, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../utils/localStorage.ts";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";
import { DvkContainer } from "../components/DvkContainer.tsx";
import { Button } from "../components/Button.tsx";
import { Flashcard } from "../entities/flashcard.ts";
import { AddNewFlashcardToCollectionForm } from "../components/AddNewFlashcardToCollectionForm.tsx";

export const FlashcardCollectionView = () => {
  const { collectionId } = useParams();

  const [flashcardCollection, setFlashcardCollection] =
    useState<FlashcardCollection>();

  const [flashcards, setFlashcards] = useState<Flashcard[] | undefined>([]);

  useEffect(() => {
    const flashcardCollections = getFromLocalStorage<FlashcardCollection>(
      flashcardCollectionsKey,
    );

    const collection = flashcardCollections.find(
      (fc) => fc.id === collectionId,
    );

    setFlashcardCollection(collection);
    setFlashcards(collection?.flashcards);
  }, [collectionId]);

  const deleteFlashcard = (flashcardToDelete: Flashcard) => {
    // Создайте копию массива flashcards без удаляемой флэшкарты
    const updatedFlashcards = flashcards.filter(
      (flashcard) => flashcard !== flashcardToDelete,
    );

    // Обновите состояние flashcards
    setFlashcards(updatedFlashcards);

    // Получите текущие флэшкарты из localStorage
    const flashcardCollections = getFromLocalStorage<FlashcardCollection>(
      flashcardCollectionsKey,
    );

    // Найдите коллекцию, к которой принадлежит удаляемая флэшкарта
    const collectionToUpdate = flashcardCollections.find(
      (fc) => fc.id === collectionId,
    );

    // Обновите флэшкарты в коллекции
    if (collectionToUpdate) {
      collectionToUpdate.flashcards = updatedFlashcards;
    }

    // Обновите localStorage с обновленными данными
    setToLocalStorage(flashcardCollectionsKey, flashcardCollections);
  };

  return (
    <>
      <DvkContainer>
        <AddNewFlashcardToCollectionForm
          flashcard={new Flashcard()}
          flashcardCollection={flashcardCollection}
        />
        <h1 className={"text-4xl font-bold mb-4"}>
          {flashcardCollection?.name}
        </h1>
        <div className="card-flip-x relative overflow-x-auto border border-red-500">
          <table className="w-full text-left">
            <thead className="uppercase bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Front Main
                </th>
                <th scope="col" className="px-6 py-3">
                  Front Sub
                </th>
                <th scope="col" className="px-6 py-3">
                  Back
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {flashcardCollection?.flashcards.map((flashcard, index) => (
                <Fragment key={`${index}-main`}>
                  <tr className="border-b bg-gray-800 border-red-500">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {flashcard.main}
                    </th>
                    <td className="px-6 py-4">{flashcard.sub}</td>
                    <td className="px-6 py-4">{flashcard.back}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center mt-2 gap-2">
                        <Button
                          type={"button"}
                          buttonText={"DELETE"}
                          onClick={() => deleteFlashcard(flashcard)}
                        />
                        <Button type={"button"} buttonText={"VIEW"} />
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </DvkContainer>
    </>
  );
};
