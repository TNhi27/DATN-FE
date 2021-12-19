import React from "react";
import { Link } from "react-router-dom";

function FooterComponent(props) {
  return (
    
      <footer>
        <div className="col">
          <img width="130px" src="../images/logo.png" alt="" />
          Drop là sàn thương mại điện tử về nguồn hàng kinh doanh online giúp
          kết nối nhà sản xuất với người bán hàng ở khắp cả nước.
        </div>
        <div className="col">
          <h3>Về chúng tôi</h3>
          <ul>
            <li><Link style={{textDecoration:'none',color:'white'}} to="/about">Về chúng tôi</Link></li>
            <li><Link style={{textDecoration:'none',color:'white'}} to="/policy" >Tiêu chuẩn cộng đồng</Link></li>
            <li><Link style={{textDecoration:'none',color:'white'}} to="/hdsd">Hướng dẫn sử dụng</Link></li>
          </ul>
        </div>
        <div className="col">
          <h3>Liên hệ chúng tôi</h3>
          <ul>
            <li>Nguyễn Văn Linh, An Khánh, Ninh Kiều, TP.Cần Thơ</li>
            <li>Email : Contact.ok200@gmail.com</li>
            <li>Phone : 0948482745</li>
          </ul>
          <div className="socal">
            <i className="fab fa-facebook-f" />
            <i className="fab fa-twitter" />
            <i  className="fab fa-instagram-square" />
          </div>
        </div>
      </footer>
    
  );
}

export default FooterComponent;
