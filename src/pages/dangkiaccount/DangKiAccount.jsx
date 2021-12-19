import React, { useEffect, useState } from "react";
import clsx from "clsx";

import style from "./dangki.module.scss";
import img from "../../assets/img/logo.png";
import { proxy } from "../../const/proxy";
import _callAPI from "../../service/_callAPI";
import { getProvince } from "../../service/_giaohangnhanh";
import ModalVerify from "../../components/Modal/ModalVerify";
import { Link } from "react-router-dom";

function DangKiAccount() {
  const [tinh, setTinh] = useState([]);

  const [isNcc, setIsNcc] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    nccname: "",
    password: "",
    repassword: "",
    address: "",
    email: "",
    sdt: "",
    tinh: "",
    description: "",
  });

  const [modalShow, setModalShow] = useState({
    isShow: false,
    content: "",
    check: true,
    info: null,
    role: isNcc,
    title: "Nhập mã xác nhận !!!",
  });

  function alertError(errorName) {
    setModalShow({
      ...modalShow,
      isShow: true,
      check: false,
      info: null,
      role: isNcc,
      content: errorName,
      title: "Báo lỗi !!!",
    });
  }
  useEffect(()=>{
    window.scrollTo(0, 0)
},[])

  function check_from() {
    const regexEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const regexSDT =
      /^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (!formData.username.trim()) {
      alertError("Chưa nhập tên đăng nhập!");
      return false;
    }
    if (!formData.fullname.trim()) {
      alertError("Chưa nhập họ tên!");
      return false;
    }
    if (!formData.password.trim()) {
      alertError("Mật khẩu không hợp lệ!");
      return false;
    }
    if (formData.repassword.trim() != formData.password.trim()) {
      alertError("Xác nhận mật khẩu không khớp!");
      return false;
    }
    if (!regexEmail.test(formData.email.trim())) {
      alertError("Email không hợp lệ!");
      return false;
    }
    if (!regexSDT.test(formData.sdt.trim())) {
      alertError("Số điện thoại không hợp lệ!");
      return false;
    }
    if (!formData.address.trim()) {
      alertError("Chưa nhập địa chỉ!");
      return false;
    }
    if (isNcc && !formData.nccname) {
      alertError("Chưa nhập tên nhà cung cấp!");
      return false;
    }
    if (isNcc && !formData.tinh) {
      alertError("Chưa chọn Tỉnh/TP!");
      return false;
    }
    if (isNcc && !formData.description) {
      alertError("Chưa nhập giới thiệu!");
      return false;
    }
    return true;
  }

  // Đăng ký
  async function dangky() {
    if (!check_from()) return;
    var info;
    if (!isNcc) {
      info = {
        username: formData.username,
        fullname: formData.fullname,
        password: formData.password,
        address: formData.address,
        email: formData.email,
        sdt: formData.sdt,
      };
    } else {
      info = {
        username: formData.username,
        fullname: formData.fullname,
        nccname: formData.nccname,
        password: formData.password,
        address: formData.address,
        email: formData.email,
        sdt: formData.sdt,
        tinh: formData.tinh,
        description: formData.description,
      };
    }
    const [error, resp] = await _callAPI(
      `${proxy}/password/${isNcc ? "ncc" : "ctv"}/register`,
      "POST",
      info
    );
    if (error) {
      alertError("Không thực hiện được thao tác!");
      
      return false;
    }
    const { message } = resp.data;
    if (message !== "OK") {
      alertError(message);
      return false;
    }
    setModalShow({
      ...modalShow,
      isShow: true,
      check: true,
      info: info,
      role: isNcc,
      content: null,
      title: "Nhập mã xác nhận !!!",
    });
    return true;
  }

  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    getProvince().then((res) => {
      setTinh(res.data.data);
    });
    console.clear();
  }, []);

  return (
    <div className={clsx(style.container)}>
      <div className={clsx(style.form)}>
        <div className={`${clsx(style.form_content)} `}>
          <h3>Tạo tài khoản</h3>
          <div className="row" style={{flexWrap:'nowrap'}}>
            <div className="form-check col-5">
              <input
                className="form-check-input"
                type="radio"
                name="role_dk"
                id="exampleRadios1"
                checked={!isNcc}
                onChange={() => setIsNcc(false)}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                Bạn là cộng tác viên
              </label>
            </div>
            <div className="form-check col-5">
              <input
                className="form-check-input"
                type="radio"
                name="role_dk"
                id="exampleRadios2"
                checked={isNcc}
                onChange={() => setIsNcc(true)}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                Bạn là nhà cung cấp
              </label>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="form-group col-sm-12 col-md-6">
              <input
              style={{background:'#e9e9e9'}}
                id="username"
                name="username"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Tên đăng nhập"
                value={formData.username}
                onChange={handleFormData}
              />
            </div>
            <div className="form-group col-sm-12 col-md-6">
              <input
               style={{background:'#e9e9e9'}}
                id="fullname"
                name="fullname"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Họ tên"
                value={formData.fullname}
                onChange={handleFormData}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12 col-md-6">
              <input
               style={{background:'#e9e9e9'}}
                id="password"
                name="password"
                type="password"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleFormData}
              />
            </div>
            <div className="form-group col-sm-12 col-md-6">
              <input
               style={{background:'#e9e9e9'}}
                id="repassword"
                name="repassword"
                type="password"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nhập lại mật khẩu"
                value={formData.repassword}
                onChange={handleFormData}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12 col-md-6">
              <input
               style={{background:'#e9e9e9'}}
                id="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormData}
              />
            </div>
            <div className="form-group col-sm-12 col-md-6">
              <input
               style={{background:'#e9e9e9'}}
                id="sdt"
                name="sdt"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Số điện thoại"
                value={formData.sdt}
                onChange={handleFormData}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12 col-md-6">
              <input
               style={{background:'#e9e9e9'}}
                id="address"
                name="address"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={handleFormData}
              />
            </div>
          </div>

          {isNcc ? (
            <>
              <div className="row">
                <div className="form-group col-sm-12 col-md-6">
                  <input
                    id="nccname"
                    name="nccname"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Tên Nhà Cung Cấp"
                    value={formData.nccname}
                    onChange={handleFormData}
                  />
                </div>
                <div className="form-group col-sm-12 col-md-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="tinh"
                      name="tinh"
                      value={formData.tinh}
                      onChange={handleFormData}
                    >
                      <option value="">--Tinh/TP--</option>
                      {tinh.map((e, i) => {
                        return (
                          <option key={i} value={e.ProvinceID}>
                            {e.ProvinceName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Giới thiệu ngắn gọn về cửa hàng của bạn
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={formData.description}
                    onChange={handleFormData}
                  ></textarea>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className={clsx(style.bot)}>
            <a onClick={dangky} className="">
              Đăng kí
            </a>
            <Link
              to="/login"
              style={{
                background: "white",
                color: "#2d4b9c",
                border: "2px solid #2d4b9c",
              }}
            >
              Đăng nhập
            </Link>
          </div>
        </div>
        <div className={clsx(style.form_image)}>
          <img width="100%" src={img} alt="" />
        </div>
      </div>

      <ModalVerify
        show={modalShow.isShow}
        title={modalShow.title}
        content={modalShow.content}
        check={modalShow.check}
        info={modalShow.info}
        role={modalShow.role}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default DangKiAccount;
