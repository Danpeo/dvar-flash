import { Fragment, useEffect, useState } from "react";
import { FlashcardCollection } from "../entities/flashcardCollection.ts";
import { getFromLocalStorage } from "../utils/localStorage.ts";
import { NavLink } from "react-router-dom";
import { flashcardCollectionsKey } from "../constants/storeKeys.ts";

export const DisplayFlashcardCollections = () => {
  const [flashcardCollections, setFlashcardCollections] = useState<
    FlashcardCollection[]
  >([]);
  useEffect(() => {
    const getFlashcardCollections = getFromLocalStorage<FlashcardCollection>(
      flashcardCollectionsKey,
    );
    setFlashcardCollections(getFlashcardCollections);
  }, []);

  return (
    <>
      {flashcardCollections.length > 0 ? (
        <>
          <div className="grid grid-cols-5 gap-1">
            {flashcardCollections.map((collection, index) => (
              <Fragment key={`${index}-main`}>
                <div className="mt-4 mb-4 flex border border-red-500 p-6 bg-gray-800">
                  <p className="text-xl mb-3">{collection.name}</p>
                  <div className="">
                    <NavLink
                      to={`/review/${collection.id}`}
                      className="w-full mb-2 mt-2 bg-gray-900 border border-red-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-red-500 hover:text-white text-xl cursor-pointer"
                    >
                      REVIEW
                    </NavLink>
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
