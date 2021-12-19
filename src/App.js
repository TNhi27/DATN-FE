import FooterComponent from "./components/Footer/FooterComponent";
import MenuComponent from "./components/Menu/MenuComponent";

import Supplier from "./pages/detailsncc/Supplier";
import DetailsProduct from "./pages/detailsproduct/DetailsProduct";
import HomePage from "./pages/home/HomePage";
import SupplierLogin from "./pages/login/SupplierLogin";
import UserLogin from "./pages/login/UserLogin";
import Products from "./pages/products/Products";
import CtvAccount from "./pages/ql_account_ctv/CtvAccount";
import DetailSell from "./pages/selldetail/DetailSell";
import ChinhSach from "./pages/Child/ChinhSach"

import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";


import Dashboard from "./pages/detailsncc/Dashboard";
import Hdsd from "./pages/Child/Hdsd";

import PrivateRouteCtv from "./components/PrivateRouteCtv";
import PrivateRouteNcc from "./components/PrivateRouteNcc";
import { useState } from "react";
import Loading from "./components/Loading";
import OrdersSuccess from "./pages/orders_success_page/OrdersSuccess";
import DangKiAccount from "./pages/dangkiaccount/DangKiAccount";
import Payment from "./pages/payment/Payment";
import About from "./pages/Child/About";
import News from "./pages/Child/News";
import DetailsPost from "./pages/Child/DetailsPost";
import Welcome from "./components/Modal/Welcome";

function App() {
  const [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false)
  }, 1500);

  return (



    load ? <Loading /> :
      <Router>
        <div className="App">


          <MenuComponent />
          <div className="div" id="top"></div>
          <Switch>
         
            <Route exact path="/" component={HomePage} />
            <Route  path="/payment/:t" component={Payment} />
            <Route exact path="/products" component={Products} />
            <Route path="/products_by_categoty/:category" component={Products} />
            <Route path="/products_by_query/:q" component={Products} />

            <Route path="/detail/:id" component={DetailsProduct} />

            <Route path="/detail_sell/:id" component={DetailSell} />
            <Route path="/dangki" component={DangKiAccount} />
            
           

            <Route path="/login">
              <UserLogin />
            </Route>
            <Route path="/login_supplier">
              <SupplierLogin />
            </Route>
            <Route path="/about">
             <About/>
            </Route>
            <Route path="/hdsd" component={Hdsd} />


            <Route exact path="/news">
             <News/>
            </Route>
            <Route path="/news/:id">
             <DetailsPost/>
            </Route>
            <Route path="/contact">
              <h1>LIEN HE</h1>
            </Route>
            <Route path="/policy">
             <ChinhSach/>
            </Route>
            <Route path="/success/:idorder">
              <OrdersSuccess />
            </Route>


            {/* 
          <Route path="/supplier" component={Supplier} />  */}
            <PrivateRouteNcc
              path="/supplier"
              component={Supplier}
            />
            <PrivateRouteCtv
              path="/congtacvien"
              component={CtvAccount}
            />



            <Route path="/404">
              <h1>404 :(</h1>
            </Route>
            <Route path="*">
              <h1>404 :(</h1>
            </Route>

          </Switch>


          <FooterComponent />
          <a href="#top" className="up-top">
            <i className="fas fa-chevron-up" />
          </a>
        </div>
      </Router>
     
  );
}

export default App;
