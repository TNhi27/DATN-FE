import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import ModalCustom from '../../components/Modal/ModalCustom';
import Validator from '../../lib/Validator';
import { getAccountCtv, updateAccountCtv } from '../../service/_accountService';
import { uploadAvatar, uploadMutiFile } from '../../service/_uploadToCloud';

function Account(props) {
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const [change, setChange] = useState(true);

    const [account, setAccount] = useState({});
    const [avt, setAvt] = useState({});
    const [modalShow, setModalShow] = useState({
        isShow: false,
        content: "",
        title: "Thông báo !!!"
    });

    const his = useHistory()

    const hinh = useRef();

    const fullname = useRef();
    const sdt = useRef();
    const email = useRef();
    const diachi = useRef();

    const handlUploadAvatar = () => {
        if (checkform()) {
            updateAccountCtv(account).then((res) => {
                setChange(!change);
                setModalShow({ ...modalShow, isShow: true, content: "Cap nhat thanh cong" })
            })
        }
    }

    const handlUpI = (file) => {
        const url = window.URL.createObjectURL(file);
        setAvt(url)
        uploadAvatar(hinh.current.files[0]).then((res) => {
            setAccount({ ...account, image: res.data.url });
        })
    }


    //initn status
    useEffect(() => {
        getAccountCtv().then((res) => {
            
            setAccount(res.data);
            setAvt(res.data.image);
        })

        Validator({
            rules: [
                Validator.isRequired(fullname),
                Validator.isNumberPhone(sdt),
                Validator.isEmail(email),
                Validator.isRequired(diachi),
            ]
        })
    }, [change])


    const checkform = () => {
        const emailRex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const sdtrex = /\d/g

        if (account.email.length === 0 || account.sdt.length === 0 || account.fullname.length === 0 || account.address.length === 0) {
            alert("Nhập thiếu dữ liệu")
            return false;
        }

        if (!emailRex.test(account.email)) {
            alert("Sai định dạng email")
            return false;
        }

        if (!sdtrex.test(account.sdt)) {
            alert("Sai định dạng số điện thoại")
            return false;
        }
        return true;
    }

    const handlChangeAccount = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="form-tt">
                <div className="summary">
                    <div className="summary-header">
                        <h5>Thông tin tài khoản </h5>
                        <i class="fas fa-angle-right"></i>
                    </div>
                    <div className="summary-body">
                        <div className="row ">
                            <div className="col-lg-4 col-sm-12 avt-img">
                                <img width='100px' height='150px' src={avt} alt="" />

                            </div>
                            <div className="col-lg-8 col-sm-12">
                                <span>Ảnh đại diện</span> <br />
                                <p> Ảnh đại điện nên kích thước tối thiểu là 100x100(px)
                                    Yêu cầu file ảnh có định dạng .png hoặc .jpg với dung lượng không vượt quá 2MB</p>
                                <input ref={hinh} onChange={(e) => handlUpI(e.target.files[0])} id='avt-user' type="file" hidden />
                                <label htmlFor="avt-user"><i class="far fa-edit fa-2x"></i></label>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px' }} className="row">
                            <div className="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Tên tài khoản : {account.username}</label>

                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Full name</label>
                                    <input ref={fullname} name="fullname" onChange={(e) => handlChangeAccount(e)} value={account.fullname} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Số điện thoại</label>
                                    <input ref={sdt} name="sdt" onChange={(e) => handlChangeAccount(e)} value={account.sdt} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Ngày tạo</label>
                                    <input value={account.createdate} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">E-mail</label>
                                    <input ref={email} name="email" onChange={(e) => handlChangeAccount(e)} value={account.email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Địa chỉ </label>
                                    <textarea ref={diachi} name="address" onChange={(e) => handlChangeAccount(e)} value={account.address} className='form-control' id="" cols="30" rows="3"></textarea>
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bot">
                        <div className="">
                            <button onClick={() => handlUploadAvatar()} >Save</button>
                        </div>
                        <div className="">
                            <button onClick={() => his.goBack()}>Thoát</button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCustom
                show={modalShow.isShow}
                title={modalShow.title}
                content={modalShow.content}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Account;