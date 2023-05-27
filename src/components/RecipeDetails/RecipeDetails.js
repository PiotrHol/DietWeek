import React from "react";
import "./recipeDetails.scss";
import { Button } from "../Button/Button";
import classNames from "classnames";
import { EditRecipe } from "../EditRecipe/EditRecipe";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../redux/actions/dietActions";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "../../firebase";
import { showNotification } from "../../redux/actions/notificationActions";

export const RecipeDetails = ({
  recipeId,
  recipeName,
  recipeCalories,
  recipeCategory,
  recipeIngredients,
  recipeDescription,
  changePopupTitle,
  showEditRecipe,
  closeHandler,
  withOptions = true,
}) => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const handleEditBtn = () => {
    changePopupTitle("Edytuj przepis");
    showEditRecipe(
      <EditRecipe
        recipeId={recipeId}
        recipeName={recipeName}
        recipeCalories={recipeCalories}
        recipeCategory={recipeCategory}
        recipeIngredients={recipeIngredients}
        recipeDescription={recipeDescription}
        closeHandler={closeHandler}
      />
    );
  };

  const handleDeleteBtn = async () => {
    try {
      await deleteDoc(
        doc(getFirestore(app), "users", userId, "recipes", recipeId)
      );
    } catch (error) {}
    dispatch(deleteRecipe(recipeId));
    dispatch(showNotification("Przepis został usunięty"));
    closeHandler();
  };

  return (
    <div className="recipe-details">
      <div className="recipe-details__name-section">
        <div className="recipe-details__title">
          <div className="recipe-details__name">{recipeName}</div>
          <div>{recipeCalories} kcal</div>
        </div>
        {withOptions && (
          <div className="recipe-details__btn-section">
            <Button
              buttonStyle="secondary"
              buttonText="Edytuj"
              buttonTextSize={13}
              buttonHandleClick={handleEditBtn}
            />
            <Button
              buttonStyle="secondary"
              buttonText="Usuń"
              buttonTextSize={13}
              buttonHandleClick={handleDeleteBtn}
            />
          </div>
        )}
      </div>
      <div className="recipe-details__section">
        <div className="recipe-details__section-title">Składniki</div>
        <div className="recipe-details__ingredients">
          {recipeIngredients.length > 0 ? (
            recipeIngredients.map((ingredient, index) => (
              <div key={index} className="recipe-details__ingredient">
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </div>
            ))
          ) : (
            <div className="recipe-details__section-text">Brak</div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          "recipe-details__section recipe-details__description",
          {
            "recipe-details__description--ingredients":
              recipeIngredients.length > 0,
          }
        )}
      >
        <div className="recipe-details__section-title">Przepis</div>
        <div className="recipe-details__section-text">
          {recipeDescription ? recipeDescription : "Brak"}
        </div>
      </div>
    </div>
  );
};
