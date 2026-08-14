import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="overlay">
        <h1>Urooj Frozen Food</h1>

        <p>Fresh Frozen Quality Preserved</p>

        <button onClick={() => navigate("/products")}>
          Order Now
        </button>
      </div>
    </section>
  );
}

export default Home;