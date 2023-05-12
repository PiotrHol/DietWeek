import React, { useState, useEffect } from "react";
import "./recipesGallery.scss";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  setSingleRecipe,
  recalculateCalories,
} from "../../redux/actions/editedWeekActions";
import {
  defaultDietDay,
  defaultDietDish,
} from "../../settings/recipesCategory";

export const RecipesGallery = ({ recipesDayAndCategory, closeGallery }) => {
  const [showGalleryContent, setShowGalleryContent] = useState(false);
  const recipesMap = useSelector((state) => state.diet.recipes);
  const tempRecipes = [];
  recipesMap.forEach((recipe) => tempRecipes.push(recipe));
  const recipes = tempRecipes.filter(
    (recipe) =>
      recipe.category.toLowerCase() ===
      defaultDietDish[
        defaultDietDay.indexOf(recipesDayAndCategory[1])
      ].toLowerCase()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowGalleryContent(true);
      clearTimeout(timeoutId);
    }, 10);
  }, []);

  const closeGalleryHandler = () => {
    setShowGalleryContent(false);
    const timeoutId = setTimeout(() => {
      closeGallery();
      clearTimeout(timeoutId);
    }, 400);
  };

  const handleRecipeToSetClick = (e, id, name, calories) => {
    e.stopPropagation();
    dispatch(setSingleRecipe(recipesDayAndCategory, id, name, calories));
    dispatch(recalculateCalories(recipesDayAndCategory[0]));
    closeGallery();
  };

  return (
    <div className="recipes-gallery" onClick={closeGalleryHandler}>
      <div
        className={classNames("recipes-gallery__content", {
          "recipes-gallery__content--empty": recipes.length === 0,
          "recipes-gallery__content--show": showGalleryContent,
        })}
      >
        {recipes.length > 0 ? (
          <>
            <div className="recipes-gallery__title">
              {
                defaultDietDish[
                  defaultDietDay.indexOf(recipesDayAndCategory[1])
                ]
              }
            </div>
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="recipes-gallery__recipe"
                onClick={(e) =>
                  handleRecipeToSetClick(
                    e,
                    recipe.id,
                    recipe.name,
                    recipe.calories
                  )
                }
              >
                <div className="recipes-gallery__recipe-name">
                  {recipe.name}
                </div>
                <div className="recipes-gallery__recipe-calories">
                  {recipe.calories} kcal
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="recipes-gallery__empty">
            Brak przepisów z kategorii "
            {defaultDietDish[defaultDietDay.indexOf(recipesDayAndCategory[1])]}"
          </div>
        )}
      </div>
    </div>
  );
};
