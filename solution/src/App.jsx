import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ThanksPage from "./pages/ThanksPage.jsx";
import TreatDetailPage from "./pages/TreatDetailPage.jsx";
import { useCartStore } from "./store/cartStore.js";

function DocumentTitleSync() {
  const cartCount = useCartStore((s) => s.cartItems.length);

  useEffect(() => {
    document.title =
      cartCount === 0
        ? "Treat Menu"
        : `Treat Menu — ${cartCount} item${cartCount === 1 ? "" : "s"} in order`;
  }, [cartCount]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <DocumentTitleSync />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/treat/:treatId" element={<TreatDetailPage />} />
        <Route path="/thanks" element={<ThanksPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
