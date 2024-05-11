import { DvkContainer } from "../components/DvkContainer.tsx";
import { AddNewFlashcardCollectionForm } from "../components/AddNewFlashcardCollectionForm.tsx";
import { DisplayFlashcardCollections } from "../components/DisplayFlashcardCollections.tsx";
import { useState } from "react";
import { Modal } from "../components/Modal.tsx";
import { Button } from "../components/Button.tsx";

export const Home = () => {
  const [modalFormIsOpen, setModalFormIsOpen] = useState(false);
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
          <AddNewFlashcardCollectionForm flashcards={[]} />
        </Modal>
        <DisplayFlashcardCollections />
      </DvkContainer>
    </>
  );
};
