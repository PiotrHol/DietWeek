import React from "react";
import "./shoppingList.scss";
import { useSelector } from "react-redux";

export const ShoppingList = () => {
  const activeWeek = useSelector((state) => state.diet.activeWeek);

  return (
    <div className="shopping-list">
      {activeWeek && activeWeek.ingredients ? (
        <div className="shopping-list__list">
          {Object.keys(activeWeek.ingredients).map((ingredientKey) => (
            <div key={ingredientKey} className="shopping-list__ingredient">
              <div className="shopping-list__ingredient-content">
                <div className="shopping-list__ingredient-value">
                  {activeWeek.ingredients[ingredientKey].name}
                </div>
                <div className="shopping-list__ingredient-value">
                  - {activeWeek.ingredients[ingredientKey].quantity}
                </div>
                <div className="shopping-list__ingredient-value">
                  {activeWeek.ingredients[ingredientKey].unit}
                </div>
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
