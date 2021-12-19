import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { proxy } from "../../const/proxy";
import _callAPI from "../../service/_callAPI";
// import style from "./dk.module.css"

function ModalVerify({ show, onHide, title, content, check, info, role }) {
  const [ma, setmMa] = useState({
    ma1: "",
    ma2: "",
    ma3: "",
    ma4: "",
  });

  function handleChangeMa(e) {
    setmMa({ ...ma, [e.target.name]: e.target.value });
  }

  function check_form() {
    if (!ma.ma1 || !ma.ma2 || !ma.ma3 || !ma.ma4) {
      alert("Vui lòng nhập đủ 4 mã số!");
      return false;
    }
    return true;
  }

  async function xacnhan() {
    if (!check_form()) return;
    const verify = [ma.ma1, ma.ma2, ma.ma3, ma.ma4].join("");
    const [error, resp] = await _callAPI(
      `${proxy}/password/${role ? "ncc" : "ctv"}/active?username=${
        info.username
      }&verify=${verify}`,
      "PUT",
      info
    );
    if (error) {
      console.log(error);
      return false;
    }
    const { message } = resp.data;
    if (message !== "OK") {
      alert(message);
      return false;
    }
    console.log(info);
    alert("Kích hoạt tài khoản thành cmn công!");
    return true;
  }

  async function guilaima(e) {
    e.preventDefault();
    const [error, resp] = await _callAPI(
      `${proxy}/password/${role ? "ncc" : "ctv"}/register`,
      "POST",
      info
    );
    if (error) {
      alert("Không thực hiện được thao tác!");
      console.log(error);
      return false;
    }
    const { message } = resp.data;
    if (message !== "OK") {
      alert(message);
      return false;
    }
    alert("Mã đã được gửi lại đến email của bạn!");
    return true;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      content={content}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title>{title}</Modal.Title>
      <Modal.Body>
        {check ? (
          <div id="app">
            <div className="container height-100 d-flex justify-content-center align-items-center">
              <div className="position-relative">
                <div className="card p-2 text-center">
                  <h6>
                    Verify Your Email Address <br />
                  </h6>
                  <div>
                    <span> Chúng tôi đã gửi 4 mã số đến email " ".</span> <br />
                    <small>Vui lòng kiểm tra và nhập ở ô dưới đây</small>
                  </div>
                  <div
                    id="otp"
                    className="inputs d-flex flex-row justify-content-center mt-2"
                  >
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input1"
                      maxLength="1"
                      name="ma1"
                      value={ma.ma1}
                      onChange={handleChangeMa}
                    />
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input2"
                      maxLength="1"
                      name="ma2"
                      value={ma.ma2}
                      onChange={handleChangeMa}
                    />
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input3"
                      maxLength="1"
                      name="ma3"
                      value={ma.ma3}
                      onChange={handleChangeMa}
                    />
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="input4"
                      maxLength="1"
                      name="ma4"
                      value={ma.ma4}
                      onChange={handleChangeMa}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={xacnhan}
                      className="btn btn-danger px-4 validate"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="mt-3 content d-flex justify-content-center align-items-center">
                    <span>Không nhận được mã?</span>
                    <a
                      onClick={guilaima}
                      href="#"
                      className="text-decoration-none ms-3"
                    >
                      Gửi lại
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <b style={{ color: "red" }}>{content}</b>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalVerify;
