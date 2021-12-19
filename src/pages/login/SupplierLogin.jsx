import React from 'react';
import "./login.scss"

function SupplierLogin(props) {
    
    return (
        <div className="hero-login">
       <div className="content-ncc">
           <a className="back" href=""><i className="fas fa-long-arrow-alt-left"></i> Back</a>
            <div className="form">
                <h1>SUPPLIER</h1>
                <h1>LOGIN</h1>
                <p>KHONG SAI CAI NAY :V</p>
                <form action="">

                    <div className="input-f">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username"/>
                    </div>
                    <div className="input-f">
                        <i className="fas fa-unlock-alt"></i>
                        <input type="password" placeholder="Mật khẩu"/>
                        <i s className="fas fa-eye-slash"></i>
                    </div>
                </form>
                <div className="qmk">
                    <a href="">Quên mật khẩu ?</a>
                </div>
                <div className="btn-f">
                    <a href="">Đăng nhập</a>
                    <a href="">Đăng kí</a>
                </div>
            </div>
       </div>
   </div>


    );
}

export default SupplierLogin;
