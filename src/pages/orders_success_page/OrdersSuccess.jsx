//system
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
//for me
import style from './OrdersSuccess.module.scss'

import img from "../../assets/img/success.png"
import { getOrder } from '../../service/_ordersService'
import CommentComponent from '../../components/CommentComponent';
import ListProductsCmt from './ListProductsCmt';




function OrdersSuccess(props) {
    const [showComment, setShowComment] = useState(false);
    const [order, setOrder] = useState({});

    const param = useParams();
    const form = useRef();

    useEffect(() => {
        getOrder(param.idorder).then((res) => {
           
            setOrder(res.data)
        })
    }, [])

    return (
        <div className={clsx(style.container)}>
            <div className={clsx(style.card)}>

                <br />
                {
                    showComment ?<> <button onClick={()=>setShowComment(false)}>x</button> <ListProductsCmt order={order} details={order.details} /></> : <> 
                   
                        <h3>Tạo đơn thành công !!!</h3>

                        <img src={img} alt="" />
                        <h5>Đơn của bạn đã được giao cho nhà cung cấp</h5>
                        <p>Cảm ơn bạn đã sử dụng trang web</p>
                        <div className={clsx(style.bot)}>
                            <Link to="/congtacvien/orders"> <i class="fas fa-info-circle"></i> Chi tiết </Link>
                            <a onClick={() => setShowComment(!showComment)} ><i class="fas fa-pencil-alt"></i> Viết đánh giá </a>
                        </div></>
                }

            </div>



        </div>
    );
}

export default OrdersSuccess;