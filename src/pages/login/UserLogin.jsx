import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ModalCustom from '../../components/Modal/ModalCustom';

import { saveTokenToLocal } from '../../lib/LocalStore';
import Validator from '../../lib/Validator';
import { login } from '../../service/_login';
import { doLogin } from '../../store/action';
import "./login_ctv.scss";

function UserLogin(props) {
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const his = useHistory();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [modalShow, setModalShow] = useState({
        isShow: false,
        content: "",
        title: "Thông báo !!!"
    });

    const hanldChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const hanldLogin = () => {
        login(user.username, user.password).then((res) => {
            saveTokenToLocal(res.data.token);
            props.doLogin(res.data);
           
        }).then(() => {

            his.goBack();
        }).catch((er) => {
            console.log(er.response);
            setModalShow({ ...modalShow, isShow: true, content: "Sai thông tin :(", title: "Thông báo !!!" })
        })
    }

    const handleEnterLogin =(evt)=>{
        if (evt.key==="Enter") {
            hanldLogin()
        }
    }

    const username = useRef();
    const password = useRef();
    const check = () => {
        Validator({
            rules: [
                Validator.isRequired(username),
                Validator.isRequired(password)
            ]
        })
    }

    useEffect(() => {
        check()
    }, [])

    return (
        <>
            <div className="hero-login">
                <div className="content">
                    <a className="back" href=""><i className="fas fa-long-arrow-alt-left"></i> Back</a>
                    <div className="form">

                        <h1>LOGIN</h1>
                        <p>Xin Chào, Cùng nhau tìm thêm đơn hàng nhé!</p>
                        <form action="">

                            <div className="input-group">
                                <div className="input-f">
                                   
                                    <input onKeyDown={(e)=>handleEnterLogin(e)} ref={username}  onChange={(e) => hanldChangeUser(e)} name="username" value={user.username} type="text" placeholder="Username" />
                                    <small style={{color:'red',marginTop:"-15px"}} name="mess-username" className="form-message"></small>
                                </div>
                               
                            </div>
                            <div className="input-group">
                                <div className="input-f">
                                   
                                    <input onKeyDown={(e)=>handleEnterLogin(e)} ref={password} id="password" onChange={(e) => hanldChangeUser(e)} name="password" value={user.password} type="password" placeholder="Mật khẩu" />
                                    <small style={{color:'red',marginTop:"-15px"}} name="mess-password" className="form-message"></small>
                                </div>
                               
                            </div>

                        </form>
                        {/* <div className="qmk">
                            <a href="">Quên mật khẩu ?</a>
                        </div> */}
                        <div className="btn-f">
                            <a onClick={() => hanldLogin()}>Đăng nhập</a>
                            <Link to="/dangki" href="">Đăng kí</Link>
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

//Gán dispatch thành props
const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (user) => {
            dispatch(doLogin(user))
        }
    }
}

//Gán giá trị của state thành props
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.login
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);