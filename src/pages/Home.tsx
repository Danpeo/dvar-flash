import { DvkContainer } from "../components/DvkContainer.tsx";
import { AddNewFlashcardCollectionForm } from "../components/AddNewFlashcardCollectionForm.tsx";
import { DisplayFlashcardCollections } from "../components/DisplayFlashcardCollections.tsx";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal.tsx";
import { Button } from "../components/Button.tsx";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import { getFromLocalStorage } from "../utils/localStorage.ts";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";

export const Home = () => {
  const [modalFormIsOpen, setModalFormIsOpen] = useState(false);
  const [flashcardCollections, setFlashcardCollections] = useState<
    FlashcardCollection[]
  >([]);

  const [addCalled, setAddCalled] = useState<number>(0);

  useEffect(() => {
    const getFlashcardCollections = getFromLocalStorage<FlashcardCollection>(
      flashcardCollectionsKey,
    );
    setFlashcardCollections(getFlashcardCollections);
  }, [addCalled]);

  return (
    <>
      <DvkContainer>
        <Button
          type={"button"}
          buttonText={`${!modalFormIsOpen ? "SHOW ADD PANEL" : "HIDE ADD PANEL"}`}
          onClick={() => setModalFormIsOpen(!modalFormIsOpen)}
        />
        <Modal
          isOpen={modalFormIsOpen}
          onClose={() => setModalFormIsOpen(false)}
        >
          <AddNewFlashcardCollectionForm
            flashcards={[]}
            onAdded={() => setAddCalled(addCalled + 1)}
          />
        </Modal>
        <DisplayFlashcardCollections
          _flashcardCollections={flashcardCollections}
        />
      </DvkContainer>
    </>
  );
};
