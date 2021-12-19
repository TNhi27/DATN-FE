import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalDetailsOrder from '../../components/Modal/ModalDetailsOrder';
import Pagination from '../../components/Pagination/Pagination';
import { timeStampToStringFormat } from '../../lib/TimeCover';
import { getOrder, getOrdersWithCtv, removeOrder } from '../../service/_ordersService';
import "./Orders.scss"

function Orders(props) {
    const [listOrder, setListOrder] = useState([]);

    const input = useRef();
    const [filter, setFilter] = useState({
        status: "%%",
        id: -1
    })

    const user = useSelector(state => state.login);

    const [modalShow, setModalShow] = useState({
        isShow: false,
        content: "",
        title: "Thông báo !!!",
        idorder: -1
    });

    useEffect(() => {
        getOrdersWithCtv(user.username, filter).then((res) => {
            setListOrder(res.data.content)

        })

    }, [filter])

    const hanldCancel = () => {
        getOrdersWithCtv(user.username, filter).then((res) => {
            setListOrder(res.data.content)
            setModalShow({ ...modalShow, isShow: false })
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const formatStatus = (status) => {
        switch (status) {
            case 0:
                return <span>Chờ xác nhận</span>;

            case 1:
                return <span>Đã hoàn thành</span>;
            case 2:
                return <span>Đang giao</span>;
            case 3:
                return <span>Trả về</span>;
            case 4:
                return <span>Bị hủy</span>;
            case 5:
                return <span>Đã thanh toán</span>;
            default:
                break;
        }
    }

    const hanldFilterStatus = (e) => {
        setFilter({ ...filter, status: e.target.value })
    }

    const hanldFilterId = (e) => {
        if (e.key === "Enter") {
            setFilter({ ...filter, id: input.current.value === "" ? -1 : input.current.value })
        }

    }




    return (
        <>
            <div className="products-ncc">
                <div className="products-header">
                    <h5>Đơn hàng</h5>

                    {/* <select class="form-select" aria-label="Default select example">
                    <option selected>-Chọn nhà cung cấp-</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select> */}
                    <div className="search">
                        <input ref={input} onKeyDown={(e) => hanldFilterId(e)} type="text" placeholder="Nhập mã đơn hàng"></input>
                        <i onClick={() => hanldFilterId()} class="fas fa-search"></i>
                    </div>
                    <div className="btn-ncc">
                        <Link to="/congtacvien/create_form" className="havatool">
                            <i class="fas fa-plus"></i> Tạo
                            <div className="tooltip-tao">
                                Tạo đơn hàng
                            </div>
                        </Link>
                        <a href="" className="havatool">
                            <i class="fas fa-print"></i> In{" "}
                            <div className="tooltip-tao">
                                Xuất excel bảng này
                            </div>
                        </a>
                    </div>

                </div>
                <div className="orders-filter">
                <select onChange={(e) => hanldFilterStatus(e)} class="custom-select">
                        <option value="%%">Tất cả</option>
                        <option value="0">Chờ xác nhận</option>
                        <option value="1">Đã giao thành công</option>
                        <option value="2">Đang giao</option>
                        <option value="3">Trả về</option>
                        <option value="4">Bị hủy</option>
                        <option value="5">Đã thanh toán cho CTV</option>
                    </select>
                  
                </div>
                <div className="products-body">
                    <div className="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input type="checkbox" />
                                    </th>
                                    <th >Mã đơn hàng</th>
                                    <th >Khách hàng</th>

                                    <th>Trạng thái</th>
                                    <th>Số tiền</th>
                                    <th>Tien thu cua khach</th>
                                    <th>Ngày tạo</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listOrder.map((e,i) => {
                                        return (
                                            <tr>
                                                <td scope="row">
                                                    {i+1}
                                                </td>
                                                <td >
                                                    {e.idorder}
                                                </td>
                                                <td>{e.customer}</td>
                                                <td>{formatStatus(e.status)}</td>
                                                <td>{e.total} <u>đ</u> </td>
                                                <td>{e.payment} <u>đ</u> </td>
                                                <td>{timeStampToStringFormat(e.dateorder)}</td>
                                                <td><i className="fas fa-info-circle add" onClick={() => setModalShow({ ...modalShow, idorder: e.idorder, isShow: true })}></i></td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>


                </div>

                <Pagination />
            </div>
            <ModalDetailsOrder
                show={modalShow.isShow}
                title={modalShow.title}
                content={modalShow.content}
                idorder={modalShow.idorder || 11}
                onHide={() => setModalShow(false)}
                onCancel={hanldCancel}

            />
        </>
    );
}

export default Orders;