import React, { useEffect, useState } from "react";
import "./editRecipe.scss";
import { FormInput } from "../FormInput/FormInput";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { setRecipe } from "../../redux/actions/dietActions";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { recipeDefaultCategory } from "../../settings/recipesCategory";
import { deleteActiveWeek } from "../../redux/actions/dietActions";
import {
  defaultDietWeek,
  defaultDietDay,
} from "../../settings/recipesCategory";

export const EditRecipe = ({
  recipeId = null,
  recipeName = null,
  recipeDescription = null,
  recipeCalories = null,
  recipeIngredients = [],
  recipeCategory = null,
  closeHandler,
}) => {
  const [ingredients, setIngredients] = useState(recipeIngredients);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState("");
  const [newIngredientUnit, setNewIngredientUnit] = useState("g");
  const [newIngredientNameError, setNewIngredientNameError] = useState(false);
  const [newIngredientQuantityError, setNewIngredientQuantityError] =
    useState(false);
  const [category, setCategory] = useState(recipeDefaultCategory[0]);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const activeWeek = useSelector((state) => state.diet.activeWeek);

  useEffect(() => {
    if (recipeName) {
      setValue("recipeName", recipeName);
    }
    if (recipeCalories) {
      setValue("recipeCalories", recipeCalories);
    }
    if (recipeDescription) {
      setValue("recipeDescription", recipeDescription);
    }
    if (recipeIngredients) {
      setIngredients(recipeIngredients);
    }
    if (recipeCategory) {
      setCategory(recipeCategory);
    }
    // eslint-disable-next-line
  }, []);

  const newIngredientBtnHandler = () => {
    if (
      newIngredientName &&
      newIngredientName.match(/^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŻżŹź0-9%()\- ]*$/g) &&
      newIngredientName.length < 50 &&
      newIngredientQuantity &&
      newIngredientQuantity < 10000 &&
      newIngredientUnit
    ) {
      setNewIngredientNameError(false);
      setNewIngredientQuantityError(false);
      setIngredients((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: newIngredientName,
          quantity: Number(newIngredientQuantity),
          unit: newIngredientUnit,
        },
      ]);
      setNewIngredientName("");
      setNewIngredientQuantity("");
      setNewIngredientUnit("g");
    } else {
      if (
        newIngredientName.length >= 50 ||
        !newIngredientName.match(/^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŻżŹź0-9%()\- ]*$/g)
      ) {
        setNewIngredientName("");
        setNewIngredientNameError(true);
      }
      if (newIngredientQuantity >= 10000) {
        setNewIngredientQuantity("");
        setNewIngredientQuantityError(true);
      }
      if (newIngredientName.length === 0 && newIngredientQuantity === "") {
        setNewIngredientNameError(true);
        setNewIngredientQuantityError(true);
      }
    }
  };

  const saveRecipe = async (editFormdata) => {
    let idOfRecipe = recipeId ? recipeId.toString() : Date.now().toString();
    let recipeDataToSet = {
      id: idOfRecipe,
      name: editFormdata.recipeName,
      category: category,
      calories: Number(editFormdata.recipeCalories),
      ingredients: ingredients,
      description: editFormdata.recipeDescription,
    };
    if (recipeId) {
      try {
        await updateDoc(
          doc(getFirestore(app), "users", userId, "recipes", idOfRecipe),
          recipeDataToSet
        );
      } catch (error) {}
    } else {
      try {
        await setDoc(
          doc(getFirestore(app), "users", userId, "recipes", idOfRecipe),
          recipeDataToSet
        );
      } catch (error) {}
    }
    let isInActiveWeek = false;
    for (const dietDay of defaultDietWeek) {
      for (const dietDish of defaultDietDay) {
        if (activeWeek && activeWeek.week[dietDay][dietDish] === idOfRecipe) {
          isInActiveWeek = true;
        }
      }
    }
    if (isInActiveWeek) {
      try {
        await updateDoc(doc(getFirestore(app), "users", userId), {
          activeWeekId: deleteField(),
          activeWeekIngredients: deleteField(),
        });
      } catch (error) {}
      dispatch(deleteActiveWeek());
    }
    dispatch(setRecipe(idOfRecipe, editFormdata, category, ingredients));
    closeHandler();
  };

  return (
    <div className="edit-recipe">
      <form onSubmit={handleSubmit(saveRecipe)}>
        <FormInput
          inputName="recipeName"
          labelText="Nazwa"
          inputType="text"
          inputPlaceholder="Nazwa"
          inputOptions={register("recipeName", {
            required: "Musisz podać nazwę przepisu",
            maxLength: {
              value: 50,
              message: "Nazwa może zawierać maksymalnie 50 znaków",
            },
            pattern: {
              value: /^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŻżŹź\-, ]*$/g,
              message: "Nazwa zawiera nieprawidłowe znaki",
            },
          })}
          formErrors={errors}
        />
        <div className="edit-recipe__category">
          <div className="edit-recipe__section-title">Kategoria</div>
          <select
            className="edit-recipe__select edit-recipe__category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {recipeDefaultCategory.map((singleCategory, index) => (
              <option
                key={index}
                className="edit-recipe__select-option"
                value={singleCategory}
              >
                {singleCategory}
              </option>
            ))}
          </select>
        </div>
        <FormInput
          inputName="recipeCalories"
          labelText="Kalorie (kcal)"
          inputType="number"
          inputPlaceholder="Liczba kalorii"
          inputOptions={register("recipeCalories", {
            required: "Musisz podać liczbę kalorii",
            max: {
              value: 10000,
              message: "Maksymalna liczba kalorii to 10000",
            },
          })}
          formErrors={errors}
        />
        <div className="edit-recipe__ingredients">
          <div className="edit-recipe__section-title">Składniki</div>
          <div className="edit-recipe__add-ingredient">
            <input
              className={classNames(
                "edit-recipe__add-ingredient-input edit-recipe__add-ingredient-name",
                {
                  "edit-recipe__add-ingredient-input--error":
                    newIngredientNameError,
                }
              )}
              type="text"
              value={newIngredientName}
              placeholder="Składnik"
              onChange={(e) => setNewIngredientName(e.target.value)}
            />
            <input
              className={classNames(
                "edit-recipe__add-ingredient-input edit-recipe__add-ingredient-quantity",
                {
                  "edit-recipe__add-ingredient-input--error":
                    newIngredientQuantityError,
                }
              )}
              type="number"
              min={1}
              value={newIngredientQuantity}
              placeholder="Ilość"
              onChange={(e) => setNewIngredientQuantity(e.target.value)}
            />
            <select
              className="edit-recipe__select edit-recipe__add-ingredient-select"
              value={newIngredientUnit}
              onChange={(e) => setNewIngredientUnit(e.target.value)}
            >
              <option className="edit-recipe__select-option" value="g">
                g
              </option>
              <option className="edit-recipe__select-option" value="szt">
                szt
              </option>
            </select>
          </div>
          <Button
            buttonStyle="secondary"
            buttonText="Dodaj"
            buttonTextSize={15}
            buttonHandleClick={newIngredientBtnHandler}
          />
          <div
            className={classNames("edit-recipe__ingredients-list", {
              "edit-recipe__ingredients-list-not-empty": ingredients.length > 0,
            })}
          >
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="edit-recipe__ingredient">
                <span className="edit-recipe__ingredient-text">
                  {ingredient.name} -
                </span>
                <span className="edit-recipe__ingredient-text">
                  {ingredient.quantity}
                </span>
                <span className="edit-recipe__ingredient-text">
                  {ingredient.unit}
                </span>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="edit-recipe__ingredient-remove"
                  onClick={() =>
                    setIngredients((prev) =>
                      prev.filter(
                        (ingredientsItem) =>
                          ingredientsItem.id !== ingredient.id
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="edit-recipe__description">
          <div className="edit-recipe__section-title">Przepis</div>
          <textarea
            className="edit-recipe__description-textarea"
            rows={4}
            placeholder="Opis przygotowania"
            {...register("recipeDescription", {
              maxLength: {
                value: 1000,
                message: "Przepis może zawierać maksymalnie 1000 znaków",
              },
              pattern: {
                value: /^[^<>]*$/g,
                message: "Nazwa zawiera nieprawidłowe znaki",
              },
            })}
          />
        </div>
        <Button
          buttonStyle="primary"
          buttonText="Zapisz"
          buttonTextSize={15}
          buttonFitWidth={false}
          buttonType="submit"
        />
      </form>
    </div>
  );
};
