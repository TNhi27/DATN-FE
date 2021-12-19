import React, { useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { formatMoney } from '../../lib/FormatMoney';
import { getTokenFromLocal } from '../../lib/LocalStore';
import { regiProduct } from '../../service/_regi_products';

function ModalRegiProduct(props) {

    const input = useRef();

    const handldRegiProduct = () => {
       
        if (getTokenFromLocal() !== "") {

            if (input.current.value<=props.pricectv) {
                alert("Giá bán phải lớn hơn hoặc bằng giá sàn")
            }else{
                regiProduct({
                    idpro: props.idpro,
                    price: input.current.value
                }).then((res) => {
                    alert("Đăng kí bán thành công !")
                }).catch((er) => {
                    alert("Xảy ra lỗi !")
                }).finally(()=>{
                    props.onHide()
                })
            }
           
        } else {
            alert("ban chua dan gnhap")
        }
    }

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Giá Của Nhà Cung Cấp: {formatMoney(props.pricectv)} <br />
                   
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div class="input-group">
                    <input ref={input} type="number " class="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    <div class="input-group-append">
                        <span class="input-group-text">VND</span>
                       
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={()=>handldRegiProduct()}>Done</Button>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRegiProduct;