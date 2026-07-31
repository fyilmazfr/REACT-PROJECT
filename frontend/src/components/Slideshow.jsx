import { useState } from "react";

export default function Slideshow({ pictures }) {
  const [index, setIndex] = useState(0);

  if (!pictures || pictures.length === 0) {
    return <p>Aucune image.</p>;
  }

  const total = pictures.length;

  function goNext() {
    if (index === total - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  function goPrev() {
    if (index === 0) {
      setIndex(total - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const showControls = total > 1;

  return (
    <div className="slideshow">
      <img className="slideshow-image" src={pictures[index]} alt="Logement" width="600" />

      {showControls && (
        <div className="slideshow-controls">
          <button className="slideshow-arrow slideshow-arrow-left" onClick={goPrev}>Précédent</button>
          <button className="slideshow-arrow slideshow-arrow-right" onClick={goNext}>Suivant</button>
          <p className="slideshow-counter" >
            {index + 1} / {total}
          </p>
        </div>
      )}
    </div>
  );
}