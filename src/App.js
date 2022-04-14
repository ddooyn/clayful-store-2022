import { Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AuthContextProvider from "./context/AuthContext";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  return (
    <AuthContextProvider>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/product/:productId" element={<DetailProductPage />}></Route>
        <Route path="/user/cart" element={<CartPage />}></Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
