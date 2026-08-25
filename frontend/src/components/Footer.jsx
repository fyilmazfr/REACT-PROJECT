import logoBW from "../assets/logoBW.svg";
import "../css/components/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <img src={logoBW} alt="Kasa" className="footer-logo" />
      <p>© 2025 Kasa. Tous droits réservés.</p>
    </footer>
  );
}