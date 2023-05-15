import React, { useEffect, useState } from "react";
import "./week.scss";
import {
  defaultDietWeek,
  defaultDietDay,
  defaultDietDish,
  defaultDietWeekTitles,
} from "../../settings/recipesCategory";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setAllDays,
  clearWeek,
  recalculateCalories,
} from "../../redux/actions/editedWeekActions";
import { setWeek } from "../../redux/actions/dietActions";
import classNames from "classnames";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { app } from "../../firebase";
import { deleteActiveWeek } from "../../redux/actions/dietActions";

export const Week = ({
  isEdit,
  isPopup,
  weekName,
  weekDays,
  showGallerySetter,
  galleryDayAndCategorySetter,
  closeWeekHandler,
  handleShowRecipe,
}) => {
  const [newWeekName, setNewWeekName] = useState(weekName ? weekName : "");
  const [newWeekNameError, setNewWeekNameError] = useState(false);
  const [newWeekNameErrorMessage, setNewWeekNameErrorMessage] = useState("");
  const dietDays = useSelector((state) => state.editedWeek.weekDays);
  const weekCalories = useSelector((state) => state.editedWeek.weekCalories);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const activeWeek = useSelector((state) => state.diet.activeWeek);
  const recipesObj = useSelector((state) => state.diet.recipes);

  useEffect(() => {
    if (isEdit && !weekDays) {
      const singleDayDishes = {
        breakfast: "",
        secondBreakfast: "",
        snack: "",
        dinner: "",
        supper: "",
      };
      dispatch(
        setAllDays({
          monday: { ...singleDayDishes },
          tuesday: { ...singleDayDishes },
          wednesday: { ...singleDayDishes },
          thursday: { ...singleDayDishes },
          friday: { ...singleDayDishes },
          saturday: { ...singleDayDishes },
          sunday: { ...singleDayDishes },
        })
      );
    } else {
      dispatch(setAllDays(weekDays.week));
    }
    dispatch(recalculateCalories(recipesObj));
    return () => dispatch(clearWeek());
    // eslint-disable-next-line
  }, []);

  let numberOfCurrentDay = 0;

  if (!isPopup) {
    numberOfCurrentDay = new Date().getDay() - 1;
    if (numberOfCurrentDay < 0) {
      numberOfCurrentDay = 6;
    }
  }

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: numberOfCurrentDay,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dietDishClickHandler = (day, category) => {
    if (isEdit) {
      galleryDayAndCategorySetter([day, category]);
      showGallerySetter(true);
    } else {
      const recipeToShowId = dietDays[day][category];
      if (Object.keys(recipesObj).includes(recipeToShowId)) {
        handleShowRecipe(recipeToShowId);
      }
    }
  };

  const handleSaveClick = async () => {
    if (
      newWeekName.length > 0 &&
      newWeekName.length < 30 &&
      newWeekName.match(/^[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŻżŹź0-9% ]*$/g)
    ) {
      setNewWeekNameError(false);
      setNewWeekNameErrorMessage("");
      const weekId = weekDays ? weekDays.id.toString() : Date.now().toString();
      let weekDataToSet = {
        id: weekId,
        name: newWeekName,
        week: dietDays,
      };
      if (weekDays) {
        try {
          await updateDoc(
            doc(getFirestore(app), "users", userId, "weeks", weekId),
            weekDataToSet
          );
        } catch (error) {}
      } else {
        try {
          await setDoc(
            doc(getFirestore(app), "users", userId, "weeks", weekId),
            weekDataToSet
          );
        } catch (error) {}
      }
      if (activeWeek && activeWeek.id === weekId) {
        try {
          await updateDoc(doc(getFirestore(app), "users", userId), {
            activeWeekId: deleteField(),
            activeWeekIngredients: deleteField(),
          });
        } catch (error) {}
        dispatch(deleteActiveWeek());
      }
      dispatch(setWeek(weekId, newWeekName, dietDays));
      closeWeekHandler();
    } else {
      setNewWeekNameError(true);
      setNewWeekNameErrorMessage("Niedozwolona nazwa tygodnia");
    }
  };

  return (
    <div className="week">
      {isPopup && (
        <div className="week__header">
          {isEdit && (
            <div className="week__header-column">
              <div className="week__title">Nazwa</div>
              <input
                className={classNames("week__title-input", {
                  "week__title-input--error": newWeekNameError,
                })}
                type="text"
                placeholder="Nazwa tygodnia"
                value={newWeekName}
                onChange={(e) => setNewWeekName(e.target.value)}
              />
              {newWeekNameErrorMessage && (
                <div className="week__title-error-message">
                  {newWeekNameErrorMessage}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="week__title">{isPopup ? "Tydzień" : weekName}</div>
      <div
        className={classNames("week__days", { "week__days--active": !isPopup })}
      >
        <Slider {...slickSettings}>
          {defaultDietWeek.map((dietDay, dietDayIndex) => (
            <div key={`${dietDay}-${dietDayIndex}`} className="week__day">
              <div className="week__day-head">
                <div className="week__title week__day-title">
                  {defaultDietWeekTitles[dietDayIndex]}
                </div>
                <div className="week__day-calories">
                  {weekCalories[defaultDietWeek[dietDayIndex]]} kcal
                </div>
              </div>
              {defaultDietDay.map((dietDish, dietDishIndex) => (
                <div
                  key={`${dietDish}-${dietDishIndex}`}
                  className="week__dish"
                  onClick={() =>
                    dietDishClickHandler(dietDay, defaultDietDay[dietDishIndex])
                  }
                >
                  <div className="week__dish-category">
                    {defaultDietDish[dietDishIndex]}
                  </div>
                  {dietDays[dietDay] && dietDays[dietDay][dietDish] ? (
                    <div className="week__dish-title week__dish-title--recipe">
                      {recipesObj[dietDays[dietDay][dietDish]]
                        ? recipesObj[dietDays[dietDay][dietDish]].name
                        : "Brak przepisu"}
                    </div>
                  ) : (
                    <div className="week__dish-title">
                      {isEdit ? "Kliknij, aby dodać" : "Brak przepisu"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
      {isEdit && (
        <Button
          buttonStyle="primary"
          buttonText="Zapisz"
          buttonTextSize={15}
          buttonFitWidth={false}
          buttonHandleClick={handleSaveClick}
        />
      )}
    </div>
  );
};
