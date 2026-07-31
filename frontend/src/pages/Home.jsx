import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import bannerHome from "../assets/banner-home.jpg";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/properties")
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Erreur API :", error));
  }, []);  // properties = [logement1, logement2, logement3..]

  return (
    <div className="home">
      <Banner
        title="Chez vous, partout et ailleurs"
        image={bannerHome}
      />

      <div className="cards">
        {properties.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            title={p.title}
            cover={p.cover}
          />
        ))}
      </div>
    </div>
  );
}