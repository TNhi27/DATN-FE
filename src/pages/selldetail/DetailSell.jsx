import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ListProducts from '../../components/ListProducts/ListProducts';
import Product from '../../components/Product';
import { timeToString } from '../../lib/TimeCover';
import { follow, getFollowNcc, unFollow, unFollowWithNccAndCtv } from '../../service/_follow';
import { getNccById, getProductsByNcc } from '../../service/_supplier';
import "./DetailSell.scss"

function DetailSell(props) {
    const userlogin = useSelector(s => s.login)

    const param = useParams();
    const user = useSelector(state => state.login)
    const [isFollow, setIsFollow] = useState(false)
    const [products, setProducts] = useState([])
    const [size, setSize] = useState(12);
    const [ncc, setNcc] = useState({})

    const [change, setChange] = useState(true);

    useEffect(() => {
        getNccById(param.id, size).then((res) => {
            setNcc(res.data)
            setProducts(res.data.products)
        })
        if (userlogin.role === "[ROLE_CTV]") {
            getFollowNcc(user.username, { p: 0, size: 1000 }).then((res) => {
                res.data.content.map((e) => {

                    if (e.fl_ncc.username === param.id) {
                        setIsFollow(true)
                    }
                })
            })
        }


    }, [change, size])

    const handleFollow = () => {

        follow(param.id).then((res) => {
            setChange(!change)
            setIsFollow(true)
        })
    }

    const handleMore = () => {
        setSize(size + 12);
    }

    const handleUnFollow = () => {

        unFollowWithNccAndCtv(param.id, user.username).then((res) => {
            setChange(!change)
            setIsFollow(false)
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className='sell'>
            <h4>Thông tin nhà cung cấp</h4>
            <div className="brand row">
                <div className="col-sm-12 col-md-3 image">
                    <img
                        style={{ cursor: 'pointer' }}
                        src={ncc.ncclogo}
                        alt=""
                        className="avt"
                        width="100px"
                        height="100px"
                    />
                    <div className="info">
                        <h5>{ncc.nccname}</h5>
                        <div>
                            {isFollow ? <><i style={{ color: 'red' }} class="fas fa-heart"></i> </> : <i class="far fa-heart"></i>}   {ncc.countFollow} follow
                        </div>
                        {
                            user.username === "" ? "" : isFollow ?
                                <button onClick={() => handleUnFollow()}>Bo Theo dõi</button> :
                                <button onClick={() => handleFollow()} > Theo dõi</button>
                        }


                    </div>
                </div>
                <div className="col-sm-12 col-md-3 shop-col">
                    <i class="fas fa-store"></i>
                    <span>Kho hàng tại : {ncc.city}</span>

                </div>
                <div className="col-sm-12 col-md-3 shop-col">
                    <i class="fas fa-box-open"></i>
                    <span>{ncc.countProducts} Sản phẩm</span>
                </div>
                <div className="col-sm-12 col-md-3 shop-col">
                    <i class="far fa-calendar-alt"></i>
                    <span>Bán hàng trên Big Market {timeToString(ncc.createdate)}</span>
                </div>

            </div>
            <div className="mota-sell">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Trang chủ shop</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Thông tin & Liên hệ</a>
                    </li>

                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                        <div className="row-detail">
                            {
                                products.map((e) => {
                                    return (
                                        <Product product={e} />
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div class="card">
                            <div class="card-header">
                                Thông tin shop
                            </div>
                            <div class="card-body">
                                <div className="cont">
                                    <span>Mô tả</span>
                                    <p>{ncc.description}</p>
                                </div>
                                <div className="cont">
                                    <span>Địa chỉ</span>
                                    <p>{ncc.address}- {ncc.city}</p>
                                </div>
                                <div className="cont">
                                    <span>Số điên thoại</span>
                                    <p>{ncc.sdt}</p>
                                </div>
                                <div className="cont">
                                    <span>Email</span>
                                    <p>ncc.email</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bot">
            <a onClick={()=>handleMore()} >Xem Thêm</a>
          </div>

        </div>
    );
}

export default DetailSell;