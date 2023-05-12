import React, { useState } from "react";
import "./activeWeek.scss";
import { useSelector } from "react-redux";
import { Week } from "../Week/Week";
import { Popup } from "../Popup/Popup";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";

export const ActiveWeek = () => {
  const activeWeekData = useSelector((state) => state.diet.activeWeek);
  const activeWeek = useSelector((state) =>
    state.diet.weeks.filter(
      (week) => activeWeekData && week.id === activeWeekData.id
    )
  )[0];
  const recipes = useSelector((state) => state.diet.recipes);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState(null);

  const showRecipe = (recipeId) => {
    const recipeToShow = recipes.get(recipeId);
    setPopupTitle(recipeToShow.category);
    setPopupContent(
      <RecipeDetails
        recipeId={recipeToShow.id}
        recipeName={recipeToShow.name}
        recipeCalories={recipeToShow.calories}
        recipeCategory={recipeToShow.category}
        recipeIngredients={recipeToShow.ingredients}
        recipeDescription={recipeToShow.description}
        withOptions={false}
      />
    );
    setShowPopup(true);
  };

  return (
    <div className="active-week">
      {activeWeek ? (
        <div className="active-week__week">
          <Week
            isEdit={false}
            isPopup={false}
            weekName={activeWeek.name}
            weekDays={activeWeek}
            handleShowRecipe={showRecipe}
          />
        </div>
      ) : (
        <div className="active-week__empty">
          <div className="active-week__empty-text">
            Nie masz wybranego tygodnia diety
          </div>
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
