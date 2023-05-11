import React from "react";
import "./shoppingList.scss";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { checkIngredient } from "../../redux/actions/dietActions";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase";

export const ShoppingList = () => {
  const activeWeek = useSelector((state) => state.diet.activeWeek);
  const ingredientsList = activeWeek
    ? Object.keys(activeWeek.ingredients).map((ingredientKey) => {
        return {
          ...activeWeek.ingredients[ingredientKey],
          id: ingredientKey,
        };
      })
    : null;
  const sortIngredientsList = ingredientsList
    ? ingredientsList.sort((a, b) => a.check - b.check)
    : [];
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const ingredientClickHandler = async (ingredientKey, isCheck) => {
    const valueToSet = !isCheck;
    try {
      await updateDoc(doc(getFirestore(app), "users", userId), {
        [`activeWeekIngredients.${ingredientKey}.check`]: valueToSet,
      });
    } catch (error) {}
    dispatch(checkIngredient(ingredientKey, valueToSet));
  };

  return (
    <div className="shopping-list">
      {sortIngredientsList.length > 0 ? (
        <div className="shopping-list__list">
          {sortIngredientsList.map((ingredient) => (
            <div
              key={ingredient.id}
              className={classNames("shopping-list__ingredient", {
                "shopping-list__ingredient--active": ingredient.check,
              })}
              onClick={() =>
                ingredientClickHandler(ingredient.id, ingredient.check)
              }
            >
              <div className="shopping-list__ingredient-content">
                <div className="shopping-list__ingredient-value">
                  {ingredient.name}
                </div>
                <div className="shopping-list__ingredient-value">
                  - {ingredient.quantity}
                </div>
                <div className="shopping-list__ingredient-value">
                  {ingredient.unit}
                </div>
              </div>
              <div
                className={classNames("shopping-list__ingredient-check", {
                  "shopping-list__ingredient-check--active": ingredient.check,
                })}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="shopping-list__ingredient-check-icon"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="shopping-list__empty">
          <div className="shopping-list__empty-text">
            Nie masz wybranego tygodnia diety
          </div>
        </div>
      )}
    </div>
  );
};
