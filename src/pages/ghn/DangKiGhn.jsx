import React, { useEffect, useRef, useState } from 'react';

import { getAccountNcc } from '../../service/_accountService';
import { DangKiShop, getDistrict, getOTP, getProvince, getWard } from '../../service/_giaohangnhanh';
import { setShopId } from '../../service/_supplier';

function DangKiGhn(props) {
    const [tinh, setTinh] = useState([]);
    const [huyen, setHuyen] = useState([]);
    const [xa, setXa] = useState([]);


    const [shop, setShop] = useState({
        phone: "",
        address: "",
        district_id: 0,
        ward_code: 0,
        name:""
    })
    const [modalShow, setModalShow] = useState({
        isShow: false,
        content: "",
        title:"Thông báo !!!"
    });
    const tinh_input = useRef();
    const huyen_input = useRef();
    const xa_input = useRef();


    useEffect(() => {
        getAccountNcc().then((res) => {
            setShop({ ...shop,name:res.data.nccname, phone: res.data.sdt, address: res.data.address, shopid: res.data.idghn || "" })
        })
        getProvince().then((res) => {
            setTinh(res.data.data)
        })
    }, [])

    const handleHuyen = (e) => {
        getDistrict(e.target.value).then((res) => {
            setHuyen(res.data.data)

        })

    }

    const handleXa = (e) => {
        getWard(e.target.value).then((res) => {
            setXa(res.data.data)
        })
        setShop({ ...shop, district_id: Number.parseInt(e.target.value )})
    }

    const handleChangeShop = (e) => {
        setShop({ ...shop, ward_code:e.target.value})
    }

    const save = () => {
      
       DangKiShop(shop).then((res)=>{
          
           setShopId(res.data.data.shop_id).then((res)=>{
            getAccountNcc().then((res) => {
                setShop({ ...shop,name:res.data.nccname, phone: res.data.sdt, address: res.data.address, shopid: res.data.idghn || "" })
                alert("Đăng ký thành công!")
            })
           })
       })
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <img width="200px" src="https://sso-v2.ghn.vn/static/media/Giao_Hang_Nhanh_Toan_Quoc.b7d18fe5.png" alt="" />
                </div>
               {
                   shop.shopid!==undefined ? <> <div className="col-sm-12 col-md-8">
                   <span>Shop id : </span>:{shop.shopid} <br />
                   <span>Số điện thoại đăng kí: </span> {shop.phone} <br />
                   <span>Tên shop : {shop.name}</span>
                </div></>:"Bạn chưa liên kết với đơn vị vận chuyển"
               }

            </div>

            <div className="row">
                <div class="form-group col-sm-12 col-md-4">
                    <label for="exampleInputEmail1">Xã/phường/thị trấn<span className="note">*</span></label>
                    <div class="form-group">
                        <select name="ward_code" ref={xa_input} onChange={(e) => handleChangeShop(e)} class="form-control" id="xa">
                            <option>--Xã--</option>
                            {
                                xa.map((e) => {
                                    return (
                                        <option value={e.WardCode}>{e.WardName}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group col-sm-12 col-md-4">
                    <label for="exampleInputEmail1">Quận/huyện/thị xã<span className="note">*</span></label>
                    <div class="form-group">
                        <select ref={huyen_input} onChange={(e) => handleXa(e)} class="form-control" id="huyen">
                            <option>--Quận/huyện/thị xã--</option>
                            {
                                huyen.map((e) => {
                                    return (
                                        <option value={e.DistrictID}>{e.DistrictName}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group col-sm-12 col-md-4">
                    <label for="exampleInputEmail1">Tỉnh/thành phố<span className="note">*</span></label>
                    <div class="form-group">
                        <select ref={tinh_input} onChange={(e) => handleHuyen(e)} class="form-control" id="tinh">
                            <option>--Tỉnh/TP--</option>
                            {
                                tinh.map((e) => {
                                    return (
                                        <option value={e.ProvinceID}>{e.ProvinceName}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
            </div>
            <div className="row">
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Dia Chi</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col"> <button className="btn btn-primary mb-2" onClick={() => save()}>Đăng Kí</button></div>
            </div>
          
        </div>
    );
}

export default DangKiGhn;