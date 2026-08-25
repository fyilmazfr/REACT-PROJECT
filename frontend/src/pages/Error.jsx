import { Link } from "react-router-dom";
import "../css/pages/Error.css";

export default function Error() {
  return (
    <div className="error">
      <h1>404</h1>
      <p>Oups! La page que vous demandez n'existe pas.</p>
      <Link to="/" className="error-link">Retourner sur la page d’accueil</Link>
    </div>
  );
}