import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import Pagination from "../../components/Pagination/Pagination";
import { convertToHuyen, convertToTinh, convertToXa } from "../../lib/ConvertCodeToStringAddress";
import { timeStampToStringFormat } from "../../lib/TimeCover";
import { getDistrict, getProvince, getWard } from "../../service/_giaohangnhanh";
import { createOrders, getOrder } from "../../service/_ordersService";
import { getNccOfCtv, getRegiProduct, getRegiProductOfNccAndCtv, regiProduct } from "../../service/_regi_products";
import { getNccByProduct } from "../../service/_supplier";
import "./FormOrders.scss";
import Validator from "../../lib/Validator";
import { formatMoney } from "../../lib/FormatMoney";




function FormOrders(props) {
  const [order, setOrder] = useState({
    status: -1,
    address: "",
    customer: "",
    sdtcustomer: "",
    payment: 0,
    idncc: "",
    note:""

  })

  const [listProduct, setListProduct] = useState([]);
  const [productsOfNcc, setProductOfNcc] = useState([]);
  const [details, setDetails] = useState([]);
  const [ncc, setNcc] = useState([]);




  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [xa, setXa] = useState([]);



  const tinh_input = useRef();
  const huyen_input = useRef();
  const xa_input = useRef();
  const customer = useRef();
  const sdtcustomer = useRef();
  const address = useRef();



  const his = useHistory();

  const [pay, setPay] = useState({
    forNcc: 0,
    vat: 0,
    customer: 0,
    ship: 0
  })

  const [filter, setFilter] = useState({
    category: "%%",
    name: "%%"
  })

  const user = useSelector(state => state.login)
  const check = () => {
    Validator({
      rules: [
        Validator.isRequired(customer),
        Validator.isRequired(address),
        Validator.isNumberPhone(sdtcustomer),
        Validator.isRequired(xa_input),
        Validator.isRequired(huyen_input),
        Validator.isRequired(tinh_input),
      ]
    })
  }


  useEffect(() => {

    getRegiProduct(user.username, filter).then((res) => {
      setListProduct(res.data.content)
      
    })
    getNccOfCtv(user.username).then((res) => {
      setNcc(res.data.content)
    })

    getProvince().then((res) => {
      setTinh(res.data.data)
    })

    check()

  }, [])

  useEffect(()=>{
    window.scrollTo(0, 0)
},[])




  useEffect(() => {
    let total = 0;
    let customer = 0;
    details.map((e) => {
      total += e.products.pricectv * e.sl;
      customer += e.price * e.sl;
    })


    setPay({ ...pay, forNcc: total, customer: customer, vat: Math.round((10 / 100) * customer * 100) / 100 })


  }, [details])

  useEffect(() => {




  }, [order])

  const saveOrder = () => {




    const t = convertToTinh(tinh, Number.parseInt(tinh_input.current.value));
    const h = convertToHuyen(huyen, Number.parseInt(huyen_input.current.value));
    const x = convertToXa(xa, Number.parseInt(xa_input.current.value));

    let orderdto = {
      address: `${order.address} ${x} - ${h} - ${t}`,
      status: 0,
      customer: order.customer,
      sdtcustomer: order.sdtcustomer,
      payment: pay.customer,
      total: pay.forNcc,
      idncc: order.idncc,
      huyen:`${ huyen_input.current.value}-${h}`,
      xa:`${xa_input.current.value}-${x}`,
      tinh:`${tinh_input.current.value}-${t}`,
      note:order.note
    }



    let listsp = [];

    details.map((e) => {
      listsp.push({
        idpro: e.products.idpro,
        username: user.username,
        price: e.price,
        sl: e.sl
      })
    })
    orderdto = { ...orderdto, details: listsp }


    if (details.length <= 0) {
      alert("Ch??a c?? s???n ph???m")
    } else {
      if (checkin() == true) {
        createOrders(orderdto).then((res) => {
          const status = res.data.status;
          
          if (status===400) {
              alert("Kh??ng ????? ti???n !")
          }else{
            his.push(`/success/${res.data.data.idorder}`)
            
          }
         
        }).catch((res) => {
            alert("L???i kh??ng x??c ?????nh")
        })
      }
    }






  }


  const checkin = () => {
    if (order.customer.trim().length <= 0 || order.address.trim().length <= 0 ||  order.idncc.trim().length <= 0) {
      alert("Vui l??ng ??i???n ?????y ????? th??ng tin")
      return false;
    }
   const regex =/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    if(!regex.test(order.sdtcustomer)){
      alert("S??? ??i???n tho???i kh??ng h???p l???")
      return false;
    }
    return true;
  }

  const removeDetails = (id) => {
    const rs = details.filter((e) => e.idregi !== id);
    setDetails(rs);

  }

  const handleHuyen = (e) => {
    getDistrict(e.target.value).then((res) => {
      setHuyen(res.data.data)

    })
  }

  const handleXa = (e) => {
    getWard(e.target.value).then((res) => {
      setXa(res.data.data)

    })
  }

  const handleChoseNcc = (e) => {
    setDetails([]);
    setOrder({ ...order, idncc: e.target.value })
    getRegiProductOfNccAndCtv(e.target.value, user.username).then((res) => {
      let rs = res.data.content.map((e) => {
        return { ...e, sl: 1 }
      })

      setProductOfNcc(rs);

    })
  }

  const handleChangeOrder = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }

  const handleChangeSl = async (regi, evt) => {
    let rs = [];
    for (let i = 0; i < details.length; i++) {
      const element = details[i];
      if (element.idregi === regi.idregi) {
        rs.push({ ...element, sl: evt.target.value })
      } else {
        rs.push({ ...element })
      }

    }
    setDetails(rs);
  }

  const addToDetails = (sp) => {
    const index = details.findIndex(e => e.idregi === sp.idregi)
    if (index < 0) {
      setDetails([...details, sp]);
    }
  }

  const formatStatus = (status) => {
    switch (status) {
      case -1:
        return <span>??ang t???o</span>;
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
      default:
        break;
    }
  }

  return (
    <div className="form-create">
      <div className="products-header">
        <h5>Chi ti???t ????n h??ng</h5>
        <div className="link">

          <a onClick={() => saveOrder()} className="sucess">
            <i class="far fa-save"></i> T???o ????n
          </a>
          <a href="" className="sucess">
            <i class="fas fa-print"></i> In H??a ????n
          </a>
          <a href="" className="sucess">
            <i class="fas fa-sign-out-alt"></i> Tho??t
          </a>
        </div>
      </div>
      <div className="form-products">
        <h5>Th??ng tin ????n h??ng</h5><span className="note">*S??? d???ng m??y t??nh ????? ch???nh s???a th??ng tin chi ti???t s???n ph???m</span>        <div className="form-pro">

          <form className="form-left" action="">

            <div className="row">


              <div class="form-group col-sm-12 col-md-6">
                <label for="exampleInputEmail1">Ng??y t???o </label> <br />
                <span>{timeStampToStringFormat(order.dateorder)}</span>
               
              </div>
              <div class="form-group col-sm-12 col-md-6">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Tr???ng th??i </label> <br />
                  <span>{formatStatus(order.status)}</span>

                </div>
              </div>
            </div>
            <div className="row">
              <div class="form-group col-sm-12 col-md-6">
                <label for="exampleInputEmail1">Kh??ch h??ng <span className="note">*</span></label>
                <input ref={customer} name="customer" onChange={(e) => handleChangeOrder(e)} value={order.customer} type="text" class="form-control" />
                <small style={{ color: 'red' }}></small>
              </div>
              <div class="form-group col-sm-12 col-md-6">
                <label for="exampleInputEmail1">S??? ??i???n tho???i <span className="note">*</span></label>
                <input ref={sdtcustomer} name="sdtcustomer" onChange={(e) => handleChangeOrder(e)} value={order.sdtcustomer} type="text" class="form-control" />
                <small style={{ color: 'red' }}></small>
              </div>

            </div>
            <div className="row">
             
             
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">T???nh/th??nh ph???<span className="note">*</span></label>
                <div class="form-group">
                  <select ref={tinh_input} onChange={(e) => handleHuyen(e)} class="form-control" id="tinh">
                    {/* <option>--Tinh/TP--</option> */}
                    {
                      tinh.map((e) => {
                        return (
                          <option value={e.ProvinceID}>{e.ProvinceName}</option>
                        )
                      })
                    }

                  </select>
                  <small style={{ color: 'red' }} ></small>
                </div>

              </div>

              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Qu???n/huy???n/th??? x??<span className="note">*</span></label>
                <div class="form-group">
                  <select ref={huyen_input} onChange={(e) => handleXa(e)} class="form-control" id="huyen">
                    {/* <option>--Qu???n/huy???n/th??? x??--</option> */}
                    {
                      huyen.map((e) => {
                        return (
                          <option value={e.DistrictID}>{e.DistrictName}</option>
                        )
                      })
                    }

                  </select>
                  <small style={{ color: 'red' }} ></small>
                </div>

              </div>

              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">X??/ph?????ng/th??? tr???n<span className="note">*</span></label>
                <div class="form-group">
                  <select ref={xa_input} onChange={(e) => handleChoseNcc(e)} class="form-control" id="xa">
                    {/* <option value="">--Xa--</option> */}
                    {
                      xa.map((e) => {
                        return (
                          <option value={e.WardCode}>{e.WardName}</option>
                        )
                      })
                    }

                  </select>
                  <small style={{ color: 'red' }} id="emailHelp" ></small>
                </div>

              </div>
            </div>
            <div className="row">
              <div class="form-group">
                <label for="floatingTextarea">?????a ch???</label>
                <textarea ref={address} name="address" onChange={(e) => handleChangeOrder(e)} value={order.address} class="form-control" placeholder="" id="floatingTextarea">

                </textarea>
                <small style={{ color: 'red' }}></small>
              </div>
            </div>

            <br />
            <div className="row">

              <h5>Nh?? cung c???p</h5>
              <div class="form-group">
                <select onChange={(e) => handleChoseNcc(e)} class="form-control" id="exampleFormControlSelect1">
                  <option>-Ch???n nh?? cung c???p--</option>
                  {
                    ncc.map((e) => {
                      return (
                        <option value={e.username}>{e.nccname}</option>
                      )
                    })
                  }

                </select>
              </div>
              <h5>Ch???n s???n ph???m</h5>
              <div class="form-group">
                <table class="table">
                  <thead>
                    <tr>

                      <th  >T??n s???n ph???m</th>


                      <th >Gi?? c???a nh?? cung c???p</th>
                      <th >Gi?? b??n cho kh??ch</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productsOfNcc.map((sp) => {
                        return (
                          <tr className="table-sp">
                            <td scope="row">
                              <img src={sp.products.image0} alt="" />
                              {sp.products.name}
                            </td>


                            <td>{sp.products.pricectv}</td>
                            <td>{sp.price}</td>
                            <td><i onClick={() => addToDetails(sp)} class="fas fa-plus add"></i></td>
                          </tr>
                        )
                      })
                    }


                  </tbody>
                </table>

              </div>
              <h3>Danh s??ch s???n ph???m ???????c th??m v??o</h3>
              <table class="table">
                <thead>
                  <tr>

                    <th  >T??n s???n ph???m</th>
                    <th >S??? l?????ng</th>

                    <th >Gi?? c???a nh?? cung c???p</th>
                    <th >Gi?? b??n cho kh??ch</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    details.map((sp) => {
                      return (
                        <tr className="table-sp">
                          <td scope="row">
                            <img src={sp.products.image0} alt="" />
                            {sp.products.name}
                          </td>

                          <td><input min={1} value={sp.sl} onChange={(e) => handleChangeSl(sp, e)} style={{ width: "100px" }} type="number" /></td>

                          <td>{sp.products.pricectv}</td>
                          <td>{sp.price}</td>
                          <td><i onClick={() => removeDetails(sp.idregi)} class="far fa-trash-alt del"></i></td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
            <br />
            {/* <div className="vanchuyen">
              <h5>????n v??? v???n chuy???n <span className="note">*</span></h5>
              <div class="form-group">
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>--Ch???n ????n v??? v???n chuy???n--</option>
                  <option>GHTK</option>
                  <option>Thi???t b??? ??i???n t???</option>
                  <option>V??n ph??ng ph???m</option>


                </select>

              </div>
            </div> */}
          </form>
          <div className="form-right">
          <div class="form-group">
                <label for="floatingTextarea">Ghi ch??</label> <br />
                
                <textarea  name="note" onChange={(e) => handleChangeOrder(e)} value={order.note} class="form-control" placeholder="" id="floatingTextarea">

                </textarea>
                <small style={{ color: 'red' }}></small>
              </div>
              <div className="not">
              
                <li>Cung c???p th??m c??c th??ng tin nh?? size, m??u s???c,... ????? nh?? cung c???p giao h??ng ????ng !</li>
                <li>Gi?? c???a nh?? cung c???p ch??a bao g???m VAT, xin l??u ?? .</li>
              
              </div>
              <hr />
            <h5>Th??ng tin thanh to??n</h5>
            <div className="row">
              <span className="col">Thu c???a kh??ch h??ng</span>

              <span className="col">{formatMoney(pay.customer)||0} </span>
            </div>
           
            
            <div className="row">
              <span className="col">Tr??? tr?????c cho nh?? cung c???p</span>
              
              <span className="col">{formatMoney(pay.forNcc)||0}</span>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default FormOrders;
