import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Pages/Layout";
import NoPage from "./Pages/NoPage";
import Shop from "./Pages/Shop";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import BuyNow from "./Pages/BuyNow";
import ConfirmationPage from "./Pages/confirmationPage";
library.add(fab, faCartShopping, faSearch);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/shop">
            <Route index element={<Shop />} />
            <Route path=":id">
              <Route index element={<ProductPage />}></Route>
              <Route path=":quantity/buyNow">
                <Route index element={<BuyNow />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
          <Route
            path=":id/:quantity/confirmationPage"
            element={<ConfirmationPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
