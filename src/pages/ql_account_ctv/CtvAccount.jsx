import React, { useRef,useEffect,useState } from "react";
import "./CtvAccount.scss";
import Dashboard_ctv from "./Dashboard_ctv";
import Orders from "./Orders";

import GiaoDich from "./GiaoDich";
import NhaCungCap from "./NhaCungCap";
import Products from "./Products";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Setting from "./Setting";
import FormCreateProduct from "./FormOrders";
import FormOrders from "./FormOrders";

function CtvAccount(props) {
  useEffect(()=>{
    window.scrollTo(0, 0)
},[])
  const menu = useRef();

  const [active,setActive] =useState({
    name:""
  })

 

  const crop = () => {
    menu.current.classList.toggle("crop");
  };
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
          <NavLink activeClassName="select-menu" exact  style={{textDecoration:'none'}} to="/congtacvien" className="menu-item "> 
          {/* select-menu */}
            <i class="fas fa-tachometer-alt"></i>
            <Link to="/congtacvien" >Dashboard</Link>
            <div className="menu-item-help">
              <b>Dashboard</b>
              <iframe src="https://embed.lottiefiles.com/animation/33758"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/congtacvien/products" className="menu-item">
            <i class="fas fa-box"></i>
            <NavLink to="/congtacvien/products"   >Sản phẩm</NavLink>
            <div className="menu-item-help">
              <b>Sản phẩm</b>
              <iframe src="https://embed.lottiefiles.com/animation/33739"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/congtacvien/giaodich" className="menu-item">
            <i class="fab fa-cc-mastercard"></i>
            <Link to="/congtacvien/giaodich" href="">Giao dịch</Link>
            <div className="menu-item-help">
              <b>Giao dịch</b>
              <iframe src="https://embed.lottiefiles.com/animation/39381"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/congtacvien/orders" className="menu-item">
            <i class="fas fa-scroll"></i>
            <Link to="/congtacvien/orders"> Đơn hàng</Link>
            <div className="menu-item-help">
              <b>Đơn hàng</b>
              <iframe src="https://embed.lottiefiles.com/animation/18084"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/congtacvien/nhacungcap" className="menu-item">
            <i class="fas fa-store"></i>
            <Link to="/congtacvien/nhacungcap" href="">Nhà cung cấp</Link>
            <div className="menu-item-help">
              <b>Nhà cung cấp</b>
              <iframe src="https://embed.lottiefiles.com/animation/48977"></iframe>
            </div>
          </NavLink>
          <NavLink activeClassName="select-menu" style={{textDecoration:'none'}} to="/congtacvien/setting" className="menu-item">
            <i class="fas fa-cog"></i>
            <Link to="/congtacvien/setting"> Cài đặt</Link>
            <div className="menu-item-help">
              <b>Cài đặt</b>
              <iframe src="https://embed.lottiefiles.com/animation/38199"></iframe>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="content">
        <Route exact path={`${props.match.path}/`} component={Dashboard_ctv} />
        <Route path={`${props.match.path}/products`} component={Products} />

        <Route path={`${props.match.path}/orders`} component={Orders} />
        <Route path={`${props.match.path}/create_form/`} component={FormOrders} />
        <Route path={`${props.match.path}/create_form/:id`} component={FormOrders} />
        <Route path={`${props.match.path}/giaodich`} component={GiaoDich} />
        <Route path={`${props.match.path}/nhacungcap`} component={NhaCungCap} />
        <Route path={`${props.match.path}/setting`} component={Setting} />


      </div>

    </div>
  );
}

export default CtvAccount;
