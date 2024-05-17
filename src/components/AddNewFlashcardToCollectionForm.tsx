import { Flashcard } from "../entities/flashcard.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./Button.tsx";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import { updateCollectionInLocalStorage } from "../utils/flashcardUtils.ts";

type AddNewFlashcardToCollectionFormProps = {
  flashcard: Flashcard;
  flashcardCollection: FlashcardCollection;
};

export const AddNewFlashcardToCollectionForm = ({
  flashcard,
  flashcardCollection,
}: AddNewFlashcardToCollectionFormProps) => {
  const { register, handleSubmit, setValue } =
    useForm<AddNewFlashcardToCollectionFormProps>({});

  const onSubmit: SubmitHandler<AddNewFlashcardToCollectionFormProps> = (
    data,
  ) => {
    console.log(data.flashcard);
    flashcardCollection.flashcards.push(data.flashcard);
    updateCollectionInLocalStorage(flashcardCollection);
  };

  const inputClassName: string =
    "w-full px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500";

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-red-500 p-6 bg-gray-900"
      >
        <div className={"bg-gray-900 p-3 mt-2 mb-2"}>
          <label className="block mb-2 " htmlFor={`main`}>
            Main
          </label>
          <input
            id={`main`}
            type="text"
            {...register(`flashcard.main`)}
            className={inputClassName}
          />

          <label className="block mb-2 " htmlFor={`sub`}>
            Sub
          </label>
          <input
            id={`sub`}
            type="text"
            {...register(`flashcard.sub`)}
            className={inputClassName}
          />

          <label className="block mb-2" htmlFor={`back`}>
            Back
          </label>
          <input
            id={`back`}
            type="text"
            {...register(`flashcard.back`)}
            className={inputClassName}
          />
        </div>
        <Button type={"submit"} buttonText={"ADD NEW FLASHCARD"} />
      </form>
    </>
  );
};
