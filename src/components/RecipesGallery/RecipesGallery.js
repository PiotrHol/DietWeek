import React, { useState, useEffect } from "react";
import "./recipesGallery.scss";
import { useSelector } from "react-redux";
import classNames from "classnames";

export const RecipesGallery = ({
  recipesDayAndCategory,
  setDayDish,
  closeGallery,
}) => {
  const [showGalleryContent, setShowGalleryContent] = useState(false);
  const recipes = useSelector((state) =>
    state.diet.recipes.filter(
      (recipe) => recipe.category.toLowerCase() === recipesDayAndCategory[1]
    )
  );

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

  return (
    <div className="recipes-gallery" onClick={closeGalleryHandler}>
      <div
        className={classNames("recipes-gallery__content", {
          "recipes-gallery__content--empty": recipes.length === 0,
          "recipes-gallery__content--show": showGalleryContent,
        })}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipes-gallery__recipe">
              <div className="recipes-gallery__recipe-name">{recipe.name}</div>
              <div className="recipes-gallery__recipe-calories">
                {recipe.calories} kcal
              </div>
            </div>
          ))
        ) : (
          <div className="recipes-gallery__empty">
            Brak przepisów z kategorii "{recipesDayAndCategory[1]}"
          </div>
        )}
      </div>
    </div>
  );
};
