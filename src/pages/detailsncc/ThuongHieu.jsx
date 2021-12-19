import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProvince } from '../../service/_giaohangnhanh';
import { getNccDTO, updateNccByDTO } from '../../service/_supplier';
import { uploadAvatar } from '../../service/_uploadToCloud';
import Validator from "../../lib/Validator"

function ThuongHieu(props) {
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    const user = useSelector(state=>state.login)
    const [tinh, setTinh] = useState([]);

    const [ncc,setNcc]  = useState({})

    const hinh = useRef();

    const username = useRef();
    const email = useRef();
    const sdt = useRef();

    const nccname = useRef();
    const fullname = useRef();
    const mota = useRef();
    const diachi = useRef();







    useEffect(() => {
        getProvince().then((res) => {
            setTinh(res.data.data)
        })
        getNccDTO(user.username).then((res)=>{
            
            setNcc(res.data)
        })

        Validator({
            rules:[
                Validator.isRequired(username),
                Validator.isEmail(email),
                Validator.isNumberPhone(sdt),
                Validator.isRequired(nccname),
                Validator.isRequired(fullname),
                Validator.isRequired(mota),
                Validator.isRequired(diachi),

            ]
        })
    }, [])

   const checkform=()=>{
       const emailRex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
       const sdtrex = /\d/g

    if (ncc.email.length===0||ncc.sdt.length===0||ncc.nccname.length===0||ncc.description.length===0||ncc.address.length===0) {
        alert("Nhập thiếu dữ liệu")
        return false;
    }

    if (!emailRex.test(ncc.email)) {
        alert("Sai định dạng email")
        return false;
    }

    if (!sdtrex.test(ncc.sdt)) {
        alert("Sai định dạng số điện thoại")
        return false;
    }
       return true;
   }

    const handleChangeNcc = (e)=>{
        setNcc({...ncc,[e.target.name]:e.target.value})
    }

    const handleSave =()=>{
       if (checkform()) {
        updateNccByDTO(user.username,ncc).then((res)=>{
            setNcc(res.data)
          
            alert("Lưu thành công")
        })
       }
    }

    const handlUpI = (file) => {
        const url = window.URL.createObjectURL(file);
        
        uploadAvatar(hinh.current.files[0]).then((res) => {
            setNcc({ ...ncc, ncclogo: res.data.url });
        })
    }
    return (
        <>
            <div className="nha-cung-cap mt-100 ">
                <img src="../images/bg-shop.jpg" alt="" />
                <div className="top">
                    <div className="st-name">
                        <a >{ncc.nccname}</a>
                    </div>



                    <div>
                    <i style={{color:'red',fontSize:'18px'}} class="fas fa-heart"></i>  {ncc.countFollow}
                    </div>
                    <span>{ncc.address} - {ncc.city}</span>
                    <div className="row w100">
                        <div className="col d-flex flex-column ">
                            <span>{ncc.createdate||""}</span>
                            Bán ở BM
                        </div>
                        <div className="col d-flex flex-column ">
                            <span>{ncc.countProducts||0}</span>
                            Sản phẩm
                        </div>
                        <div className="col d-flex flex-column ">
                            <span>{ncc.countOrders}</span>
                            Đơn hàng
                        </div>
                    </div>

                    <label className="avt-ncc1" htmlFor="avatar">
                        <input onChange={(e)=>handlUpI(e.target.files[0])} ref={hinh} hidden id='avatar' type="file" />
                        <img
                            style={{ cursor: 'pointer' }}
                            src={ncc.ncclogo}
                            alt=""
                            className="avt"
                        />
                    </label>
                </div>
            </div>
            <div className="form">
            <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <div ref={username} name="username" onChange={(e)=>handleChangeNcc(e)} value={ncc.username} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >{ncc.username}</div>
                            <small style={{color:'red'}} ></small>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email </label>
                            <input ref={email} name="email" onChange={(e)=>handleChangeNcc(e)} value={ncc.email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small style={{color:'red'}} ></small>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">SDT </label>
                            <input ref={sdt} name="sdt" onChange={(e)=>handleChangeNcc(e)} value={ncc.sdt} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small style={{color:'red'}} ></small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Nhà cung cấp</label>
                            <input ref={nccname} name="nccname" onChange={(e)=>handleChangeNcc(e)} value={ncc.nccname} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small style={{color:'red'}} ></small>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Tinh/TP </label>
                            <div class="form-group">
                                        <select name="city" onChange={(e)=>handleChangeNcc(e)} value={ncc.city} class="form-control" id="tinh">
                                            <option>--Tinh/TP--</option>
                                            {
                                                tinh.map((e) => {
                                                    return (
                                                        <option value={e.ProvinceName}>{e.ProvinceName}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>  </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Full name </label>
                            <input ref={fullname} name="fullname" onChange={(e)=>handleChangeNcc(e)} value={ncc.fullname} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <small style={{color:'red'}} ></small>
                        </div>
                    </div>
                </div>
               
                <div className="row">
                    <div className="col">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Mô tả </label>
                            <textarea ref={mota} name="description" onChange={(e)=>handleChangeNcc(e)} value={ncc.description} className='form-control'  cols="30" rows="3"></textarea>
                            <small style={{color:'red'}} ></small>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Địa chỉ </label>
                            <textarea ref={diachi} name="address" onChange={(e)=>handleChangeNcc(e)} value={ncc.address} className='form-control'  cols="30" rows="3"></textarea>
                            <small style={{color:'red'}} ></small>
                        </div>
                    </div>
                </div>
                <div className="bot">
                    <div className="">
                        <button onClick={()=>handleSave()}>Save</button>
                    </div>
                    <div className="">
                        <button>Thoát</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThuongHieu;