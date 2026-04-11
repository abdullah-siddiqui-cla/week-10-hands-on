import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import ThanksPage from "./pages/ThanksPage.jsx";
import TreatDetailPage from "./pages/TreatDetailPage.jsx";

function App() {
  const [orderCount, setOrderCount] = useState(0);

  // Mount-only: base document title
  useEffect(() => {
    document.title = "Treat Menu";
  }, []);

  // Dependent: reflect order count in title (outside render)
  useEffect(() => {
    document.title =
      orderCount === 0
        ? "Treat Menu"
        : `Treat Menu — ${orderCount} item${orderCount === 1 ? "" : "s"} in order`;
  }, [orderCount]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/menu"
        element={
          <MenuPage orderCount={orderCount} setOrderCount={setOrderCount} />
        }
      />
      <Route
        path="/treat/:treatId"
        element={
          <TreatDetailPage
            orderCount={orderCount}
            setOrderCount={setOrderCount}
          />
        }
      />
      <Route path="/thanks" element={<ThanksPage />} />
    </Routes>
  );
}

export default App;
