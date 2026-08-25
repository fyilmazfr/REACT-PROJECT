import { Link } from "react-router-dom";
import "../css/components/Card.css";

export default function Card({ id, title, cover }) {
  return (
    <div className="card">
      <Link to={`/logement/${id}`}>
        <img src={cover} alt={title} />
        <h3>{title}</h3>
      </Link>
    </div>
  );
}