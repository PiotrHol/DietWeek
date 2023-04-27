import React, { useState } from "react";
import "./weeks.scss";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";
import { Week } from "../Week/Week";
import { RecipesGallery } from "../RecipesGallery/RecipesGallery";
import { FixedButton } from "../FixedButton/FixedButton";

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

  const handleShowWeek = (weekName, week) => {
    setPopupTitle(weekName);
    setPopupContent(
      <>
        <div className="weeks__popup-buttons">
          <Button
            buttonStyle="secondary"
            buttonText="Edytuj"
            buttonTextSize={14}
            buttonHandleClick={() => console.log("Edit")}
          />
          <Button
            buttonStyle="secondary"
            buttonText="Usuń"
            buttonTextSize={14}
            buttonHandleClick={() => console.log("Delete")}
          />
          <Button
            buttonStyle="secondary"
            buttonText="Aktywuj"
            buttonTextSize={14}
            buttonHandleClick={() => console.log("Active")}
          />
        </div>
        <Week isEdit={false} isPopup={true} weekDays={week} />
      </>
    );
    setShowPopup(true);
  };

  return (
    <div className="weeks">
      {weeks.length > 0 ? (
        <>
          <div className="weeks__list">
            {weeks.map((week) => (
              <div
                key={week.id}
                className="weeks__week"
                data-name={week.name}
                onClick={() => handleShowWeek(week.name, week.week)}
              >
                <div className="weeks__week-name">{week.name}</div>
                <div className="weeks__week-calories">{week.calories} kcal</div>
              </div>
            ))}
          </div>
          <FixedButton
            buttonText="Dodaj"
            buttonTextSize={15}
            buttonHandleClick={handleAddWeek}
          />
        </>
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
