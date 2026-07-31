import { Link } from "react-router-dom";

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