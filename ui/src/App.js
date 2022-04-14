import CustomerList from "./components/CustomerList";
import ProductList from "./components/ProductList";
import StoreList from "./components/StoreList";
import SaleList from "./components/SaleList";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
/*
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { Customer } from "./components/Customer.js";
import { Store } from "./components/Store";
import { Product } from "./components/Product";
import { Sales } from "./components/Sales";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <nav className="ui top inverted attached menu">
          <span className="item link">React</span>
          <NavLink className="item link" to="customer">
            Customer
          </NavLink>
          <NavLink className="item link" to="/product">
            Product
          </NavLink>
          <NavLink className="item link" to="/store">
            Store
          </NavLink>
          <NavLink className="item link" to="/sales">
            Sales
          </NavLink>
        </nav>

        <Routes>
          <Route path="customer" element={<Customer />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
*/

const App = () => (
  <BrowserRouter>
    <div className="App container">
      <nav className="ui top inverted attached menu">
        <span className="item link">React</span>
        <NavLink className="item link" to="/customer">
          Customer
        </NavLink>
        <NavLink className="item link" to="/product">
          Product
        </NavLink>
        <NavLink className="item link" to="/store">
          Store
        </NavLink>
        <NavLink className="item link" to="/sales">
          Sales
        </NavLink>
      </nav>

      <Routes>
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/sales" element={<SaleList />} />
        <Route path="/store" element={<StoreList />} />
        <Route path="/product" element={<ProductList />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
