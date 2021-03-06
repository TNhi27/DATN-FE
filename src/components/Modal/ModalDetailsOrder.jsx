import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { timeStampToStringFormat } from '../../lib/TimeCover';
import { createOrderOfGhn, getStatusOrderGHN } from '../../service/_giaohangnhanh';
import { getOrder, payToCtv, removeOrder, removeOrderNcc, updateOrderCode, updateStatusOrder } from '../../service/_ordersService';


function ModalDetailsOrder(props) {
    const user = useSelector(state => state.login)
    const [change, setChange] = useState(true);

    const [load, setLoad] = useState(false);

    const [accept, setAccept] = useState({
        isAccept: true,
        message: ""
    });

    const input = useRef();
    const [o, setO] = useState({

    });

    const [details, setDetails] = useState([])
    const [order_ghn, setOrder_Ghn] = useState({
        payment_type_id: 2,
        note: "",
        required_note: "KHONGCHOXEMHANG",
        to_name: "",
        to_phone: "",
        to_address: "",
        to_ward_code: "",
        to_district_id: 0,
        cod_amount: 0,

        weight: 200,
        length: 1,
        width: 5,
        height: 10,

        service_type_id: 2,

        items: []
    })

    const hanldPayToCtv = () => {

        payToCtv(o.idorder).then((res) => {

            setO(res.data)
        })
    }

    useEffect(() => {
        if (props.idorder!==-1) {
            
        
        getOrder(props.idorder).then((res) => {
            setO(res.data)


            setDetails(res.data.details)
            setOrder_Ghn({
                ...order_ghn,
                to_name: res.data.customer,
                to_phone: res.data.sdtcustomer,
                to_address: res.data.address,
                to_district_id: res.data.huyen.slice(0,4),
                to_ward_code: res.data.xa.slice(0,6),
                cod_amount: res.data.payment,
                insurance_value: 10,
                items: res.data.details.map((e) => {
                    return {
                        name: e.products.name,
                        code: e.products.idpro,
                        quantity: e.qty,
                        price: e.revenue,
                        // length: 12,
                        // width: 12,
                        // height: 12
                    }
                })


            })

        })
    }

    }, [props.idorder, change])


    useEffect(() => {
        for (let i = 0; i < details.length; i++) {
            const e = details[i];
            if (e.products.active === false || e.qty > e.products.qty) {
                setAccept({ ...accept, isAccept: false, message: 'S???n ph???m ???? x??a ho???c ???? h???t h??ng!' })
                break;
            }
            setAccept(true)
        }

    }, [details])

    const handleUpdateStatusFromGHN = (code) => {
        getStatusOrderGHN({ order_code: code }).then((res) => {

            if (res.data.data.finish_date !== null) {
                updateStatusOrder(o.idorder, 1).then((res) => {
                    alert("Tr???ng th??i ???? ???????c c???p nh???t th??nh c??ng");
                    setChange(!change)
                })
            } else if(res.data.data.status==="delivery_fail" || res.data.data.status==="waiting_to_return"||res.data.data.status==="return"){
                updateStatusOrder(o.idorder, 3).then((res) => {
                    alert("Da cap nhat trang thai thanh tra ve !");
                    setChange(!change)
                })
            }else{
                alert("Trang thai don hang :"+res.data.data.status)
            }
            
            
               
            

        })
    }


    const renderButton = () => {

        switch (o.status) {
            case 0:

                return (
                    <>
                        <p style={{ color: 'red' }}>{accept.isAccept === true ? "" : accept.message}</p>
                        <Button disabled={accept.isAccept===false} onClick={() => hanldOk()}  >X??c nh???n</Button>
                    </>
                )
            case 1:

                return (
                    <Button onClick={() => hanldPayToCtv()}  >Thanh to??n cho CTV</Button>
                )
            case 2:

                return (
                    <Button onClick={() => handleUpdateStatusFromGHN(o.order_code)}  >C???p nh???t tr???ng th??i ????n h??ng t??? GHN</Button>
                )
            case 3:

                return (
                    <Button onClick={() => hanldPayToCtv()}  >Thanh to??n cho CTV</Button>
                )
            case 4:

                return (
                    <Button onClick={() => hanldPayToCtv()}  >Thanh to??n cho CTV</Button>
                )

            default:
                break;
        }
    }


    const hanldRemoveNcc = () => {
        const rson = prompt("Nh???p l?? do h???y ????n");
        removeOrderNcc(props.idorder,rson).then((res) => {
            setO(res.data)
            setDetails(res.data.details)
            props.onCancel();
        })
    }

    const hanldRemoveCtv = () => {
        removeOrder(props.idorder).then((res) => {
            setChange(!change)
            props.onCancel();
        })
    }
    const hanldOk = () => {

        setLoad(true);
        createOrderOfGhn(order_ghn, user.shopid).then((res) => {
          console.log(res.data.data.total_fee);
            updateOrderCode(o.idorder, res.data.data.order_code, res.data.data.total_fee).then((r) => {

                setLoad(false);
                setChange(!change)
            }).catch((er)=>{
               alert(er.response.data.message)
            })
           
        }).catch((err)=>{
            alert(err.response.data.code_message_value)
        })
    }

    const formatStatus = (status) => {
        switch (status) {
            case 0:
                return <span>Ch???? xa??c nh????n</span>;

            case 1:
                return <span>??a?? hoa??n tha??nh</span>;
            case 2:
                return <span>??ang giao</span>;
            case 3:
                return <span>Tra?? v????</span>;
            case 4:
                return <span>Bi?? hu??y</span>;
            case 5:
                return <span>???? thanh to??n</span>;
            default:
                break;
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
                    DH-{o.idorder}  [{timeStampToStringFormat(o.dateorder)}] <br />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="form-right">
                    <h5>Th??ng tin ????n ha??ng [{user.role === "[ROLE_NCC]" ? o.ctv === undefined ? "" : o.ctv.fullname : o.ncc === undefined ? "" : o.ncc.nccname}]</h5>
                    <div className="row">
                        <span className="col">Kha??ch ha??ng</span>

                        <span className="col">{o.customer}</span>
                    </div>
                    <div className="row">
                        <span className="col">Sdt</span>

                        <span className="col">{o.sdtcustomer}</span>
                    </div>

                    <div className="row">
                        <span className="col">??i??a chi??</span>

                        <span className="col">{o.address}</span>
                    </div>

                    <div className="row">
                        <span className="col">Thu cu??a kha??ch</span>

                        <span className="col">{o.payment}</span>
                    </div>
                    <div className="row">
                        <span className="col">T????ng ti????n</span>

                        <span className="col">{o.total}</span>
                    </div>
                    {
                        o.status !== 5 ? <div className="row">
                            <span className="col">Tra??ng tha??i</span>

                            <span className="col">{formatStatus(o.status)}</span>
                        </div> : <div className="row">
                            <span className="col">Ng??y Thanh To??n</span>

                            <span className="col">{o.datefinish}</span>
                        </div>
                    }
                    <div className="row">
                        <span className="col">M?? ????n v???n</span>

                        <span className="col">{o.order_code || "Ch??a t???o ????n v???n"}</span>
                    </div>
                    {
                        o.status===4 || o.status===5? <div className="row">
                        <span className="col">L?? do h???y</span>

                        <span className="col">{o.lydo || ""}</span>
                    </div>:''
                    }

                    <hr />
                    <div className="row">
                        <div className="col">T??n</div>
                        <div className="col">S???? l??????ng</div>
                        <div className="col">Gi?? b??n </div>
                    </div>
                    {
                        details.map((e) => {
                            return (
                                <div className="row">
                                    <div className="col">{e.products.name}</div>
                                    <div className="col">{e.qty}</div>
                                    <div className="col">{e.revenue || 0}</div>

                                </div>
                            )

                        })
                    }



                </div>
            </Modal.Body>
            <Modal.Footer>
                {
                    user.role === "[ROLE_NCC]" ?
                        <>

                            {renderButton()}
                            <Button disabled={o.status === 0 ? false : true} onClick={() => hanldRemoveNcc()} variant="danger" >Hu??y ????n</Button>
                        </> : <Button disabled={o.status === 0 ? false : true} onClick={() => hanldRemoveCtv()} variant="danger" >Hu??y ????n CTV</Button>


                }




            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailsOrder;