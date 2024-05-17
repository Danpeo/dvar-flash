import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import { getFromLocalStorage } from "../utils/localStorage.ts";
import { DvkContainer } from "../components/DvkContainer.tsx";
import { Flashcard } from "../entities/flashcard.ts";
import { shuffleArray } from "../utils/extensions.ts";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";
import { FlashCard } from "../components/FlashCard.tsx";
import { DomFunctions } from "../utils/dom.ts";
import { Button } from "../components/Button.tsx";
import { updateCollectionInLocalStorage } from "../utils/flashcardUtils.ts";

export const FlashcardCollectionReview = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  const [flashcardCollection, setFlashcardCollection] =
    useState<FlashcardCollection>();

  const [flashcardsToReview, setFlashcardsToReview] = useState<Flashcard[]>([]);
  const [currentFlashcard, setCurrentFlashcard] = useState<number>(0);
  const [remembered, setRemembered] = useState<number>(0);
  const [forgotCount, setForgotCount] = useState<number>(0);
  const [rememberedPerfectly, setRememberedPerfectly] = useState<number>(0);
  const [showFront, setShowFront] = useState<boolean>(true);

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
    }

    setFlashcardCollection(collection);
    animateFlip();
  }, [collectionId]);

  const animateFlip = () => {
    DomFunctions.addClassToElementForTime("flashcard", "card-flip-y", 500);
  };

  const flipCard = () => {
    animateFlip();
    setShowFront(!showFront);
  };

  const remember = () => {
    flashcardsToReview[currentFlashcard].rememberedInARow++;
    setRemembered(remembered + 1);
    nextCard();
  };

  const forgot = () => {
    flashcardsToReview[currentFlashcard].rememberedInARow = 0;
    setForgotCount(forgotCount + 1);
    nextCard();
  };

  const rememberPerfectly = () => {
    flashcardsToReview[currentFlashcard].rememberedInARow++;
    flashcardsToReview[currentFlashcard].doRemember = true;
    setRememberedPerfectly(rememberedPerfectly + 1);
    nextCard();
  };

  const nextCard = () => {
    let reviewFinished = false;
    if (currentFlashcard >= flashcardsToReview.length - 1) {
      reviewFinished = true;
    } else {
      animateFlip();
      setCurrentFlashcard(currentFlashcard + 1);
      setShowFront(true);
    }

    if (reviewFinished) {
      finishReview();
    }
  };

  const finishReview = () => {
    if (flashcardCollection) {
      const updatedCollection = {
        ...flashcardCollection,
        flashcards: flashcardsToReview,
      };
      updateCollectionInLocalStorage(updatedCollection);
      navigate("/");
    }
  };

  return (
    <>
      <DvkContainer>
        {flashcardsToReview.length > 0 ? (
          <>
            <p className={"text-2xl font-semibold"}>
              {flashcardCollection?.name}
            </p>

            <div
              id={"flashcard"}
              className={`w-full border p-6 select-none card-flip-y cursor-pointer  ${showFront ? "text-red-500 bg-gray-900 border-red-500" : "text-black bg-red-500 border-gray-500"}`}
              onClick={flipCard}
            >
              <div
                className={`flex flex-wrap border-b-2 ${showFront ? "border-red-500" : "border-black"} `}
              >
                <h1 className="text-2xl font-bold">
                  {showFront ? "FRONT" : "BACK"}
                </h1>
              </div>
              <div>
                {showFront ? (
                  <>
                    <h5 className={"text-9xl text-center font-bold"}>
                      {flashcardsToReview[currentFlashcard].main}
                    </h5>
                    <p className={"text-center text-5xl"}>
                      {flashcardsToReview[currentFlashcard].sub}
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className={"text-9xl text-center font-bold"}>
                      {flashcardsToReview[currentFlashcard].back}
                    </h5>
                    <p className={"text-center text-5xl"}>
                      {flashcardsToReview[currentFlashcard].main}
                    </p>
                  </>
                )}
              </div>
              <div>
                <p className={"text-xl"}>
                  {currentFlashcard + 1}/{flashcardsToReview.length}{" "}
                  <span className="fs-5">
                    Memorised{" "}
                    <b>
                      {flashcardsToReview[currentFlashcard].rememberedInARow}
                    </b>{" "}
                    Times In A Row
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-2 gap-2">
              <Button type={"button"} buttonText={"FORGOT"} onClick={forgot} />
              <Button
                type={"button"}
                buttonText={"REMEMBER"}
                onClick={remember}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type={"button"}
                buttonText={"REMEMBER PERFECTLY"}
                onClick={rememberPerfectly}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type={"button"}
                buttonText={"FINISH REVIEW"}
                onClick={finishReview}
              />
            </div>
            <FlashCard />
          </>
        ) : (
          <p>No shit!</p>
        )}
      </DvkContainer>
    </>
  );
};
