import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { formatMoney } from '../../lib/FormatMoney';
import { getDetailsCtv } from '../../service/_supplier';
import "./InfoCongTacVien.scss"

function InfoCongTacVien(props) {

    const param = useParams();
    const [ctv, setCtv] = useState({});
    const [listOd, setListOd] = useState([]);

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    useEffect(() => {
        getDetailsCtv(param.id).then((res) => {
          
            setCtv(res.data.ctv)
            setListOd(res.data.orders_done);
        })
    }, [])

    useEffect(() => {

    }, [listOd])

    const renderTop30 = () => {
        let rs = [];
        for (let i = 0; i < 30; i++) {
            const e = listOd[i];
            rs.push()

        }
        return rs;
    }
    return (
        <div className="info-ctv">
            <div className="top">
                <h5> <a href=""><i class="fas fa-caret-square-left"></i></a> Anh/Chị {ctv.fullname} | CTV</h5>

            </div>
            <div className="content">
                <div className="info">
                    <h5> <i class="fas fa-user-check"></i> Cộng tác viên</h5>
                    <div className="img">
                        <img src={ctv.image} alt="" />
                        <span> {ctv.username} </span>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span><i class="far fa-envelope"></i> E-mail</span>
                            <p> {ctv.email}</p>
                        </div>
                        <div className="col">
                            <span><i class="fas fa-phone"></i> Số điện thoại</span>
                            <p>{ctv.sdt}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span><i class="fas fa-map-marked-alt"></i> Địa chỉ</span>
                            <p>{ctv.address}</p>
                        </div>

                    </div>
                </div>
                <div className="his">
                    <h5>Đơn hàng đã thành công</h5>
                    <table class="table">
                        <thead>
                            <tr>

                                <th  >Mã đơn hàng</th>
                                <th >Ngày hoan thanh</th>
                                <th >Tổng tiền</th>
                                <th>Khách hàng</th>

                                <th>SDT</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                listOd !== undefined ? listOd.map((e,i) => {
                                    if (i<30) {
                                        return (
                                            <tr>
    
                                                <td >
                                                    {e.idorder}
                                                </td>
                                                <td>{e.datefinish || "Khong xacs dinh"}</td>
                                                <td>{formatMoney(e.total)}</td>
                                                <td>{e.customer} </td>
    
                                                <td>{e.sdtcustomer}</td>
    
                                            </tr>
                                        )
                                    }
                                }) : ""
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InfoCongTacVien;