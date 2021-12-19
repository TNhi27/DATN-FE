import React, { useEffect, useRef } from "react";
import Dashboard from "./Dashboard";
import FooterComponent from "../../components/Footer/FooterComponent";
import "./Supplier.scss";
import Products from "./Products";
import FormCreateProduct from "./FormCreateProduct";
import Orders from "./Orders";
import CongTacVien from "./CongTacVien";
import InfoCongTacVien from "./InfoCongTacVien";
import FormOrders from "./FormOrders";
import Setting from "./Setting";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import GiaoDich from "./GiaoDich";

function Supplier(props) {
  const menu = useRef();

  const crop = () => {
    menu.current.classList.toggle("crop");
  };

  useEffect(()=>{
    window.scrollTo(0, 0)
},[])


  return (
    <div className="supplier">


      <div ref={menu} className="menu">
        <div className="top">
          <h4>
            <span>Quản lý bán hàng</span>
          </h4>
          <i onClick={() => crop()} class="fas fa-chevron-right"></i>
        </div>
        <div className="menu-list">
        <NavLink activeClassName="select-menu" exact  style={{textDecoration:'none'}} to="/supplier" className="menu-item "> 
          {/* select-menu */}
            <i class="fas fa-tachometer-alt"></i>
            <Link to="/supplier" >Dashboard</Link>
            <div className="menu-item-help">
              <b>Dashboard</b>
              <iframe src="https://embed.lottiefiles.com/animation/33758"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/supplier/products" className="menu-item">
            <i class="fas fa-box"></i>
            <NavLink to="/supplier/products"  >Sản phẩm</NavLink>
            <div className="menu-item-help">
              <b>Sản phẩm</b>
              <iframe src="https://embed.lottiefiles.com/animation/33739"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/supplier/order" className="menu-item">
            <i class="fas fa-scroll"></i>
            <NavLink to="/supplier/order"  > Đơn hàng</NavLink>
            <div className="menu-item-help">
              <b>Đơn hàng</b>
              <iframe src="https://embed.lottiefiles.com/animation/18084"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/supplier/ctv" className="menu-item">
            <i class="fas fa-users"></i>
            <Link to="/supplier/ctv" href="">Cộng tác viên</Link>
            <div className="menu-item-help">
              <b>Cộng tác viên</b>
              <iframe src="https://embed.lottiefiles.com/animation/75503"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/supplier/giaodich" className="menu-item">
          <i class="fab fa-cc-mastercard"></i>
            <Link to="/supplier/giaodich" href="">Giao dịch</Link>
            <div className="menu-item-help">
              <b>Giao dịch</b>
              <iframe src="https://embed.lottiefiles.com/animation/39381"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/supplier/setting" className="menu-item">
            <i class="fas fa-cog"></i>
            <Link to="/supplier/setting" href=""> Cài đặt</Link>
            <div className="menu-item-help">
              <b>Cài đặt</b>
              <iframe src="https://embed.lottiefiles.com/animation/38199"></iframe>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="content">

        <Route exact path={`${props.match.path}/`} component={Dashboard} />
        <Route path={`${props.match.path}/products`} component={Products} />
        <Route exact path={`${props.match.path}/form_products`} component={FormCreateProduct} />
        <Route path={`${props.match.path}/form_products/:idpro`} component={FormCreateProduct} />
        <Route path={`${props.match.path}/order`} component={Orders} />
        <Route path={`${props.match.path}/form_order`} component={FormOrders} />
        <Route path={`${props.match.path}/ctv`} component={CongTacVien} />
        <Route path={`${props.match.path}/infoctv/:id`} component={InfoCongTacVien} />
        <Route path={`${props.match.path}/setting`} component={Setting} />
        <Route path={`${props.match.path}/giaodich`} component={GiaoDich} />
        
      </div>

    </div>
  );
}

export default Supplier;
