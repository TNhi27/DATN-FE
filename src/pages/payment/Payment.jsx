import React, { useEffect, useRef, useState } from 'react';
import "./payment.scss";
import PaypalExpressBtn from 'react-paypal-express-checkout';

import { PayPalButton } from "react-paypal-button-v2";
import { clientid } from '../../const/paypal';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { createTransaction } from '../../service/_transaction';

function Payment(props) {
    const user = useSelector(state => state.login)
    const [isPaypal, setIsPaypal] = useState(false);
    const [done, setDone] = useState(true);
    const p = useParams();
    const [pay, setPay] = useState(0);
    const h = useHistory()

    const [giaodich, setGiaoDich] = useState({
        type: p.t === "n" ? 0 : 1,
        value: 0,
        idpaypal: ""
    })




    const handleChange = (e) => {
        setGiaoDich({ ...giaodich, [e.target.name]: e.target.value })
    }


    const paypal = useRef();

    const handleCreate = () => {
        if (giaodich.value <= 0) {
            alert("Vui lòng nhập số tiền cần thực hiện")
        } else {
            if (user.username !== "") {
                createTransaction(giaodich).then((res) => {
                    alert("Giao dịch đã được tạo, tiền sẻ được cộng vào tài khoản sau khi admin check đúng thông tin!")
                    if (user.role === "[ROLE_CTV]") {
                        h.push("/congtacvien/giaodich")
                    } else {
                        h.push("/supplier/giaodich")
                    }
                }).catch(() => {
                    alert("Tạo giao dịch thất bại")
                })
            } else {
                alert("Đăng nhập trước khi thực hiện thao tác")
            }
        }



    }

    const handleBack = () => {
        h.goBack()
    }

    const client = {
        sandbox: 'AQAx56s_vQRgzG8bHp5MyFPAjkQUuldfMksAjT7vArhxk4HhInCRwCuNoPoPd48un41enseII3HWuWJj',
        production: 'YOUR-PRODUCTION-APP-ID',
    }

    useEffect(() => {
        if (pay > 0) {
            handleCreate();

        }
    }, [pay])

    const onSuccess = async (payment) => {
        setGiaoDich({ ...giaodich, idpaypal: payment.paymentID, value: giaodich.value * 21000 });
        setPay(pay + 1);
        setDone(true);

    }
    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        alert(err)
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }



    if (p.t === "n") {
        return (
            <div className="payment">
                <div className="card">
                    <h3>Nạp tiền vào hệ thống</h3>
                    <div className="row">

                        <div className="col">
                            <input name="value" onChange={(e) => setGiaoDich({ ...giaodich, value: e.target.value })} placeholder="Số tiền" type="number" class="form-control  item" />

                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => setDone(true)}>Chuyển khoản</a>
                                    <a class="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={() => setDone(false)}>Paypal</a>

                                </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    Nạp tiền bằng hình thức chuyển khoản
                                    <br />

                                    VUI LÒNG CHUYỂN KHOẢN TRƯỚC KHI THỰC HIỆN YÊU CẦU! <br />
                                     <h5>Thông tin chuyển khoản</h5>
                                    <ul>
                                        <li>NGÂN HÀNG : BIDV</li>
                                        <li>SỐ TÀI KHOẢN : 74110000784832</li>
                                        <li>TÊN : LƯU TRƯỜNG TÁ</li>
                                       
                                    </ul>
                                    <ul>
                                        <li>NGÂN HÀNG : Vietcombank</li>
                                        <li>SỐ TÀI KHOẢN :00003784827322</li>
                                        <li>TÊN : NGUYỄN TRẦN TIẾN TRUNG</li>
                                       
                                    </ul>
                                    <li>NỘI DUNG : {`<username> - <Họ tên> - NẠP TIỀN BM`} </li> <br />
                                </div>
                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <div className="pay">
                                        {
                                            user.username !== "" ? <PaypalExpressBtn onCancel={onCancel} onError={onError} client={client} currency={'USD'} total={giaodich.value} onSuccess={onSuccess} />
                                                : "Vui lòng đăng nhập"
                                        }
                                    </div>
                                </div>

                            </div>







                            {
                                done ? <div className="row">
                                    <button style={{ width: "100%", margin: "0 10px" }} onClick={() => handleCreate()} class="btn btn-primary col">Gửi yêu cầu</button>
                                    <button style={{ width: "100%" }} onClick={() => handleBack()} class="btn btn-primary col">Back</button>

                                </div> : <div className="row">

                                    <button style={{ width: "100%" }} onClick={() => handleBack()} class="btn btn-primary col">Back</button>

                                </div>

                            }


                        </div>
                    </div>
                </div>


            </div>
        )
    } else {
        return (
            <div className="payment">
                <div className="card">
                    <h3>Rút tiền về tài khoản</h3>
                    <div className="row">

                        <div className="col">
                            <input name="value" onChange={(e) => setGiaoDich({ ...giaodich, value: e.target.value })} placeholder="Nhập số tiền" type="number" class="form-control  item" />


                            <div className="row">
                                <button style={{ width: "100%", margin: "0 10px" }} onClick={() => handleCreate()} class="btn btn-primary col">Gủi yêu cầu</button>
                                <button style={{ width: "100%" }} onClick={() => handleBack()} class="btn btn-primary col">Back</button>

                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }

}

export default Payment;