import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Location,
  useLocation
} from 'react-router-dom';
import Home from "./scenes/home/Home";
import SearchResults from './scenes/searchResults/SearchResults';
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import Login from "./scenes/global/Login";
import Account from "./scenes/account/Account";
import ProtectedRoute from './ProtectedRoute';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/search" element = {<SearchResults />} />
          <Route path = "/item/:itemId" element = {<ItemDetails />} />
          <Route path = "checkout" element = {<Checkout />} />
          <Route path = "checkout/success" element = {<Confirmation />} />
          <Route path = "/account" element = {<ProtectedRoute element={Account} />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
