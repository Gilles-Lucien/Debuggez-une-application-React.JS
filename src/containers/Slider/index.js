import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
  );

  // Correction applied : Array indices are zero-based, so the condition should be index < byDateDesc.length - 1, and not index < byDateDesc.length.
  // also, if byDateDesc is not yet defined, I added a default value of 0 to avoid undefined - 1
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < (byDateDesc?.length ?? 0) - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });

  // Correction applied : the radio button were rendered by a map in a map, which duplicated them and caused the issue. I took the map of the radio button out of the map of the events
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              // Correction applied : The condition should be index === radioIdx, and not idx === radioIdx, because idx was the index of the upper map function, and not the index of the current event.
              checked={index === radioIdx}
              // Correction applied : I added readOnly to the input to avoid the warning in the console
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
