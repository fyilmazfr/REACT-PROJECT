import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slideshow from "../components/Slideshow";
import Collapse from "../components/Collapse";

const MIN_LOGEMENT_COLLAPSE_HEIGHT = 320;

export default function Logement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logement, setLogement] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);
  const [sharedCollapseHeight, setSharedCollapseHeight] = useState(0);

  function updateSharedCollapseHeight(height) {
    setSharedCollapseHeight((current) =>
      Math.max(current, height, MIN_LOGEMENT_COLLAPSE_HEIGHT)
    );
  }

  useEffect(() => {
    setSharedCollapseHeight(0);

    fetch("http://localhost:8080/api/properties")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === id);

        if (!found) {
          navigate("/error");
          return;
        }

        setLogement(found);
      })
      .catch(() => navigate("/error"));
  }, [id, navigate]);

  if (!logement) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="logement">
      <Slideshow pictures={logement.pictures} />

      <div className="logement-top">
        <div className="logement-left">
          <div className="logement-info">
            <h1>{logement.title}</h1>
            <p>{logement.location}</p>
          </div>

          <ul className="logement-tags">
            {logement.tags.map((tag, index) => (
              <li className="tag" key={index}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="logement-right">
          <div className="logement-host">
            <p className="host-name">{logement.host.name}</p>
            <img
              className="host-picture"
              src={logement.host.picture}
              alt={logement.host.name}
            />
          </div>

          <div className="logement-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < Number(logement.rating) ? "star star-filled" : "star"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="logement-collapses">
        <Collapse
          title="Description"
          isOpen={openCollapse === "description"}
          minExpandedHeight={sharedCollapseHeight}
          onContentHeightChange={updateSharedCollapseHeight}
          onToggle={() =>
            setOpenCollapse(openCollapse === "description" ? null : "description")
          }
        >
          <p>{logement.description}</p>
        </Collapse>

        <Collapse
          title="Équipements"
          isOpen={openCollapse === "equipements"}
          minExpandedHeight={sharedCollapseHeight}
          onContentHeightChange={updateSharedCollapseHeight}
          onToggle={() =>
            setOpenCollapse(openCollapse === "equipements" ? null : "equipements")
          }
        >
          <ul>
            {logement.equipments.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Collapse>
      </div>
    </div>
  );
}