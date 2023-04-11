import React, { useEffect, useState } from "react";
import "./recipes.scss";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";
import { EditRecipe } from "../EditRecipe/EditRecipe";
import { FixedButton } from "../FixedButton/FixedButton";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";
import { recipeDefaultCategory } from "../../settings/recipesCategory";
import classNames from "classnames";

export const Recipes = () => {
  let recipes = useSelector((state) => state.diet.recipes);
  const [recipesToShow, setRecipesToShow] = useState(recipes);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    setRecipesToShow(recipes);
    setActiveFilter("all");
  }, [recipes]);

  const handleAddRecipeBtn = () => {
    if (recipes.length <= 200) {
      setPopupTitle("Dodaj przepis");
      setPopupContent(<EditRecipe closeHandler={() => setShowPopup(false)} />);
      setShowPopup(true);
    }
  };

  const handleShowRecipe = ({
    id,
    name,
    category,
    calories,
    ingredients,
    description,
  }) => {
    setPopupTitle(category);
    setPopupContent(
      <RecipeDetails
        recipeId={id}
        recipeName={name}
        recipeCalories={calories}
        recipeCategory={category}
        recipeIngredients={ingredients}
        recipeDescription={description}
        changePopupTitle={(value) => setPopupTitle(value)}
        showEditRecipe={(value) => setPopupContent(value)}
        closeHandler={() => setShowPopup(false)}
      />
    );
    setShowPopup(true);
  };

  const handleSetFilter = (e) => {
    const filterCategory = e.target.dataset.category;
    if (recipeDefaultCategory.some((category) => category === filterCategory)) {
      setActiveFilter(filterCategory);
      setRecipesToShow(
        recipes.filter((recipe) => recipe.category === filterCategory)
      );
    } else {
      setActiveFilter("all");
      setRecipesToShow(recipes);
    }
  };

  return (
    <div className="recipes">
      <div className="recipes__filters">
        <div
          className={classNames("recipes__filter", {
            "recipes__filter--active": activeFilter === "all",
          })}
          data-category="all"
          onClick={handleSetFilter}
        >
          Wszystko
        </div>
        {recipeDefaultCategory.map((category, index) => (
          <div
            key={index}
            className={classNames("recipes__filter", {
              "recipes__filter--active": activeFilter === category,
            })}
            data-category={category}
            onClick={handleSetFilter}
          >
            {category}
          </div>
        ))}
      </div>
      {recipesToShow.length > 0 ? (
        <>
          <div className="recipes__list">
            <div className="recipes__list-titles">
              <div className="recipes__recipe-name">Nazwa</div>
              <div className="recipes__recipe-category">Kategoria</div>
              <div className="recipes__recipe-calories">Kalorie</div>
              <div className="recipes__recipe-ingredients">Składniki</div>
              <div className="recipes__recipe-description">Opis</div>
            </div>
            {recipesToShow.map((recipe) => (
              <div
                key={recipe.id}
                className="recipes__recipe"
                onClick={() => handleShowRecipe(recipe)}
              >
                <div className="recipes__recipe-name">{recipe.name}</div>
                <div className="recipes__recipe-category">
                  {recipe.category}
                </div>
                <div className="recipes__recipe-calories">
                  {recipe.calories} kcal
                </div>
                <div className="recipes__recipe-ingredients">
                  {recipe.ingredients.length}
                </div>
                <div className="recipes__recipe-description">
                  {recipe.description.slice(0, 100)}
                </div>
              </div>
            ))}
          </div>
          <FixedButton
            buttonText="Dodaj"
            buttonTextSize={15}
            buttonHandleClick={handleAddRecipeBtn}
          />
        </>
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
