import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatMoney } from '../lib/FormatMoney';
import { getTokenFromLocal } from '../lib/LocalStore';
import { regiProduct, RegiProduct } from '../service/_regi_products';
import ModalRegiProduct from "./Modal/ModalRegiProduct"

function Product(props) {

    const user = useSelector(s => s.login)

    const [modalShow, setModalShow] = useState({
        isShow: false,
        content: "",
        title: "Gia cua nha cung cap :"
    });



    return (
        <div className="col-md-3 col-sm-6 mt-1">
            <div className="san-pham ">
                {/* <img
                width="30px"
                className="hot"
                src="./images/icon/flame.png"
                alt=""
            /> */}
                <img
                    src={props.product.image0}
                    alt=""
                />
                <p className="sp-name">{props.product.name}</p>

                <div className="sp-gia-container">
                    <div className="sp-gia">
                        <i className="fas fa-store-alt" />  {props.product.ncc.nccname} <br />

                        Xuất xứ: {props.product.origin}
                    </div>
                    <div className="sp-gia">
                        {formatMoney(props.product.pricectv)}
                    </div>
                </div>

                <div className="row btn-sanpham-cover">
                    {
                        user.role === "[ROLE_CTV]" ? <div className="col m-2"><a style={{display:'block',textAlign:'center'}} onClick={() => setModalShow({ ...modalShow, isShow: true })} >Đăng kí</a></div> : ""
                    }

        
                   
                    <div className="col m-2">
                        <Link style={{display:'block',textAlign:'center'}} to={`/detail/${props.product.idpro}`} >Chi tiết</Link>
                    </div>


                </div>
                <ModalRegiProduct
                    show={modalShow.isShow}
                    idpro={props.product.idpro}
                    title={modalShow.title}
                    content={modalShow.content}
                    pricectv={props.product.pricectv}
                    onHide={() => setModalShow({ ...modalShow, isShow: false })}
                />
            </div>
        </div>

    );
}

export default Product;