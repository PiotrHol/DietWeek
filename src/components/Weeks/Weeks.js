import React, { useState } from "react";
import "./weeks.scss";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";
import { Week } from "../Week/Week";
import { RecipesGallery } from "../RecipesGallery/RecipesGallery";
import { FixedButton } from "../FixedButton/FixedButton";
import { useDispatch } from "react-redux";
import {
  deleteWeek,
  setActiveWeek,
  deleteActiveWeek,
} from "../../redux/actions/dietActions";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";
import {
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { app } from "../../firebase";
import {
  defaultDietWeek,
  defaultDietDay,
} from "../../settings/recipesCategory";
import classNames from "classnames";

export const Weeks = () => {
  let weeks = useSelector((state) => state.diet.weeks);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryDayAndCategory, setGalleryDayAndCategory] = useState([]);
  const recipes = useSelector((state) => state.diet.recipes);
  const [isRecipePopupContent, setIsRecipePopupContent] = useState(false);
  const [recipePopupContent, setRecipePopupContent] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const activeWeek = useSelector((state) => state.diet.activeWeek);

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

  const handleEditWeek = (weekData) => {
    setPopupContent(
      <Week
        isEdit={true}
        isPopup={true}
        weekName={weekData.name}
        weekDays={weekData}
        showGallerySetter={(e) => setShowGallery(e)}
        galleryDayAndCategorySetter={(e) => setGalleryDayAndCategory(e)}
        closeWeekHandler={() => setShowPopup(false)}
      />
    );
  };

  const handleDeleteWeek = async (weekId) => {
    setShowPopup(false);
    setPopupTitle("");
    setPopupContent(null);
    try {
      await deleteDoc(doc(getFirestore(app), "users", userId, "weeks", weekId));
    } catch (error) {}
    if (activeWeek && activeWeek.id === weekId) {
      try {
        await updateDoc(doc(getFirestore(app), "users", userId), {
          activeWeekId: deleteField(),
          activeWeekIngredients: deleteField(),
        });
      } catch (error) {}
      dispatch(deleteActiveWeek());
    }
    dispatch(deleteWeek(weekId));
  };

  const handleSetActiveWeek = async (weekData) => {
    const ingredientsDataTemp = [];
    for (const dietDay of defaultDietWeek) {
      for (const dietDish of defaultDietDay) {
        const dietFilteredDish = {
          ...recipes.filter(
            (recipe) => recipe.id === weekData.week[dietDay][dietDish][0]
          )[0],
        };
        const dishIngredients = dietFilteredDish.ingredients;
        if (dishIngredients) {
          for (const dishIngredient of dishIngredients) {
            let isIngredientAdded = false;
            ingredientsDataTemp.forEach((ingredient, index) => {
              if (
                ingredient.name.toLowerCase() ===
                  dishIngredient.name.toLowerCase() &&
                ingredient.unit === dishIngredient.unit
              ) {
                ingredientsDataTemp[index].quantity += Number(
                  dishIngredient.quantity
                );
                isIngredientAdded = true;
              }
            });
            if (!isIngredientAdded) {
              ingredientsDataTemp.push({
                name: dishIngredient.name.toLowerCase(),
                quantity: Number(dishIngredient.quantity),
                unit: dishIngredient.unit,
                check: false,
              });
            }
          }
        }
      }
    }
    let ingredientsData = {};
    ingredientsDataTemp.forEach((ingredient, index) => {
      ingredientsData = {
        ...ingredientsData,
        [index + 1]: ingredient,
      };
    });
    try {
      await updateDoc(doc(getFirestore(app), "users", userId), {
        activeWeekId: weekData.id,
        activeWeekIngredients: { ...ingredientsData },
      });
    } catch (error) {}
    setShowPopup(false);
    setPopupTitle("");
    setPopupContent(null);
    dispatch(setActiveWeek(weekData, { ...ingredientsData }));
  };

  const handleShowRecipe = (recipeId) => {
    if (recipeId) {
      const recipeToShow = recipes.filter(
        (recipe) => recipe.id === recipeId
      )[0];
      setRecipePopupContent(
        <div className="weeks__recipe-popup">
          <Button
            buttonStyle="secondary"
            buttonText="Powrót"
            buttonTextSize={13}
            buttonHandleClick={() => {
              setIsRecipePopupContent(false);
              setRecipePopupContent(null);
            }}
          />
          <RecipeDetails
            recipeId={recipeToShow.id}
            recipeName={recipeToShow.name}
            recipeCalories={recipeToShow.calories}
            recipeCategory={recipeToShow.category}
            recipeIngredients={recipeToShow.ingredients}
            recipeDescription={recipeToShow.description}
            withOptions={false}
          />
        </div>
      );
      setIsRecipePopupContent(true);
    }
  };

  const handleShowWeek = (weekData) => {
    setPopupTitle(weekData.name);
    setPopupContent(
      <>
        <div className="weeks__popup-buttons">
          <Button
            buttonStyle="secondary"
            buttonText="Edytuj"
            buttonTextSize={13}
            buttonHandleClick={() => handleEditWeek(weekData)}
          />
          <Button
            buttonStyle="secondary"
            buttonText="Usuń"
            buttonTextSize={13}
            buttonHandleClick={() => handleDeleteWeek(weekData.id)}
          />
          {activeWeek && weekData.id === activeWeek.id ? null : (
            <Button
              buttonStyle="secondary"
              buttonText="Aktywuj"
              buttonTextSize={13}
              buttonHandleClick={() => handleSetActiveWeek(weekData)}
            />
          )}
        </div>
        <Week
          isEdit={false}
          isPopup={true}
          weekDays={weekData}
          handleShowRecipe={handleShowRecipe}
        />
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
                className={classNames("weeks__week", {
                  "weeks__week--active":
                    activeWeek && activeWeek.id === week.id,
                })}
                data-name={week.name}
                onClick={() => handleShowWeek(week)}
              >
                <div className="weeks__week-name">{week.name}</div>
                <div className="weeks__week-calories">{week.calories} kcal</div>
              </div>
            ))}
          </div>
          {weeks.length <= 50 && (
            <FixedButton
              buttonText="Dodaj"
              buttonTextSize={15}
              buttonHandleClick={handleAddWeek}
            />
          )}
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
          popupCloseHandler={() => {
            setShowPopup(false);
            setIsRecipePopupContent(false);
          }}
        >
          {!isRecipePopupContent ? popupContent : recipePopupContent}
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
