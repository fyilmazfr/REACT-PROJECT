import "../css/components/Banner.css";

export default function Banner({ title, image, className = "" }) {
  return (
    <div
      className={`banner ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2 className="banner-title">{title}</h2>
    </div>
  );
}