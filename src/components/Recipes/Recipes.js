import React, { useState } from "react";
import "./recipes.scss";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";
import { EditRecipe } from "../EditRecipe/EditRecipe";

export const Recipes = () => {
  const recipes = useSelector((state) => state.diet.recipes);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState(null);

  const handleAddRecipeBtn = () => {
    setPopupTitle("Dodaj przepis");
    setPopupContent(<EditRecipe closeHandler={() => setShowPopup(false)} />);
    setShowPopup(true);
  };

  return (
    <div className="recipes">
      {recipes.length > 0 ? (
        <div className="recipes__list"></div>
      ) : (
        <div className="recipes__empty">
          <div className="recipes__empty-text">Nie masz żadnych przepisów</div>
          <Button
            buttonStyle="secondary"
            buttonText="Dodaj"
            buttonTextSize={15}
            buttonHandleClick={handleAddRecipeBtn}
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
    </div>
  );
};
