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

export const Week = ({
  isEdit,
  isPopup,
  weekName,
  weekDays,
  showGallerySetter,
  galleryDayAndCategorySetter,
}) => {
  const [newWeekName, setNewWeekName] = useState("");
  const dietDays = useSelector((state) => state.editedWeek.weekDays);
  const weekCalories = useSelector((state) => state.editedWeek.weekCalories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && !weekDays) {
      const singleDayDishes = {
        breakfast: [],
        secondBreakfast: [],
        snack: [],
        dinner: [],
        supper: [],
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
      dispatch(setAllDays(weekDays));
    }
    if (isEdit && weekDays) {
      dispatch(recalculateCalories());
    }
    return () => dispatch(clearWeek());
    // eslint-disable-next-line
  }, []);

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
      console.log("Show click");
    }
  };

  return (
    <div className="week">
      {isPopup && (
        <div className="week__header">
          {isEdit ? (
            <div className="week__header-column">
              <div className="week__title">Nazwa</div>
              <input
                className="week__title-input"
                type="text"
                placeholder="Nazwa nowego tygodnia"
                value={newWeekName}
                onChange={(e) => setNewWeekName(e.target.value)}
              />
            </div>
          ) : (
            <div className="week__header-column">
              <div className="week__title">{weekName}</div>
            </div>
          )}
        </div>
      )}
      {isPopup && <div className="week__title">Tydzień</div>}
      <div className="week__days">
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
                  {dietDays[dietDay] &&
                  dietDays[dietDay][dietDish].length > 0 ? (
                    <div className="week__dish-title week__dish-title--recipe">
                      {dietDays[dietDay][dietDish][1]}
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
        />
      )}
    </div>
  );
};
