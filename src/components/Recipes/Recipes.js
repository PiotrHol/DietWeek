import React, { useEffect, useState } from "react";
import "./recipes.scss";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";
import { EditRecipe } from "../EditRecipe/EditRecipe";
import { FixedButton } from "../FixedButton/FixedButton";
import { RecipeDetails } from "../RecipeDetails/RecipeDetails";

export const Recipes = () => {
  let recipes = useSelector((state) => state.diet.recipes);
  const [recipesToShow, setRecipesToShow] = useState(recipes);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    setRecipesToShow(recipes);
  }, [recipes]);

  const handleAddRecipeBtn = () => {
    setPopupTitle("Dodaj przepis");
    setPopupContent(<EditRecipe closeHandler={() => setShowPopup(false)} />);
    setShowPopup(true);
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

  return (
    <div className="recipes">
      {recipes.length > 0 ? (
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
