import { Flashcard } from "../entities/flashcard.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { FormSection } from "./FormSection.tsx";
import { Button } from "./Button.tsx";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../utils/localStorage.ts";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";

type AddNewFlashcardCollectionFormProps = {
  name?: string;
  flashcards: Flashcard[];
  onAdded: () => void;
};

export const AddNewFlashcardCollectionForm = ({
  flashcards,
  onAdded,
}: AddNewFlashcardCollectionFormProps) => {
  const { register, handleSubmit, setValue } =
    useForm<AddNewFlashcardCollectionFormProps>({
      defaultValues: {
        name: "Collection",
        flashcards: [],
      },
    });

  const [newFlashcards, setNewFlashcards] = useState<Flashcard[]>(flashcards);

  const onSubmit: SubmitHandler<AddNewFlashcardCollectionFormProps> = (
    data,
  ) => {
    const newFlashcardCollection = new FlashcardCollection();
    newFlashcardCollection.name = data.name;

    for (const flashcard of data.flashcards) {
      const f = new Flashcard();
      f.main = flashcard.main;
      f.sub = flashcard.sub;
      f.back = flashcard.back;
      newFlashcardCollection.flashcards.push(f);
    }

    let flashcardCollections = getFromLocalStorage<FlashcardCollection>(
      flashcardCollectionsKey,
    );
    flashcardCollections.push(newFlashcardCollection);
    setToLocalStorage(flashcardCollectionsKey, flashcardCollections);
    onAdded();
  };

  const handleAddFlashcard = () => {
    const newFlashcard = new Flashcard();
    setNewFlashcards([...newFlashcards, newFlashcard]);
  };

  const handleRemoveFlashcard = () => {
    if (newFlashcards.length > 0) {
      const updatedFlashcards = [...newFlashcards];
      updatedFlashcards.pop();
      setNewFlashcards(updatedFlashcards);
      setValue("flashcards", updatedFlashcards);
    }
  };

  const inputClassName: string =
    "w-full px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500";

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-red-500 p-6 bg-gray-900"
      >
        <label className="text-2xl font-semibold mb-3" htmlFor="name">
          COLLECTION NAME
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className={inputClassName}
        />

        <FormSection sectionName={"FLASHCARDS"}>
          {newFlashcards.map((_, index) => (
            <Fragment key={`${index}-main`}>
              <div className={"bg-gray-900 p-3 mt-2 mb-2"}>
                <label className="block mb-2 " htmlFor={`main-${index}`}>
                  Main
                </label>
                <input
                  id={`main-${index}`}
                  type="text"
                  {...register(`flashcards.${index}.main`)}
                  className={inputClassName}
                />

                <label className="block mb-2 " htmlFor={`sub-${index}`}>
                  Sub
                </label>
                <input
                  id={`sub-${index}`}
                  type="text"
                  {...register(`flashcards.${index}.sub`)}
                  className={inputClassName}
                />

                <label className="block mb-2" htmlFor={`back-${index}`}>
                  Back
                </label>
                <input
                  id={`back-${index}`}
                  type="text"
                  {...register(`flashcards.${index}.back`)}
                  className={inputClassName}
                />
              </div>
            </Fragment>
          ))}

          <Button
            type={"button"}
            buttonText={"+ ADD FLASHCARD"}
            onClick={handleAddFlashcard}
          />
          <Button
            type={"button"}
            buttonText={"- REMOVE LAST"}
            onClick={handleRemoveFlashcard}
          />
        </FormSection>

        <Button type={"submit"} buttonText={"ADD NEW COLLECTION"} />
      </form>
    </>
  );
};
