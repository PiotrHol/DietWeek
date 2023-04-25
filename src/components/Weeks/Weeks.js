import React, { useState } from "react";
import "./weeks.scss";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";
import { Week } from "../Week/Week";
import { RecipesGallery } from "../RecipesGallery/RecipesGallery";

export const Weeks = () => {
  let weeks = useSelector((state) => state.diet.weeks);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryDayAndCategory, setGalleryDayAndCategory] = useState([]);

  const handleAddWeek = () => {
    setPopupTitle("Nowy tydzień");
    setPopupContent(
      <Week
        isEdit={true}
        isPopup={true}
        showGallerySetter={(e) => setShowGallery(e)}
        galleryDayAndCategorySetter={(e) => setGalleryDayAndCategory(e)}
        closeWeekHandler={() => setShowPopup(false)}
      />
    );
    setShowPopup(true);
  };

  return (
    <div className="weeks">
      {weeks.length > 0 ? (
        <div className="weeks__list"></div>
      ) : (
        <div className="weeks__empty">
          <div className="weeks__empty-text">
            Nie masz żadnych zapisanych tygodni
          </div>
          <Button
            buttonStyle="secondary"
            buttonText="Dodaj"
            buttonTextSize={15}
            buttonHandleClick={handleAddWeek}
          />
        </div>
      )}
      {showPopup && (
        <Popup
          popupTitle={popupTitle}
          popupCloseHandler={() => setShowPopup(false)}
        >
          {popupContent}
        </Popup>
      )}
      {showGallery && (
        <RecipesGallery
          recipesDayAndCategory={galleryDayAndCategory}
          closeGallery={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};
