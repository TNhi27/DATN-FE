import React,{ useEffect, useRef, useState} from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { getTransaction } from '../../service/_transaction';
import { formatMoney } from "../../lib/FormatMoney";
import "./Orders.scss"
import { timeStampToStringFormat } from '../../lib/TimeCover';

function GiaoDich(props) {

    const [tran,setTran] = useState([]);
    const [filter,setFilter] =useState({
        type:"%%",
        page:0,
        size:25
    })

    useEffect((res)=>{
        getTransaction(filter).then((res) => {
            setTran(res.data.content)
           
        })
    },[filter])

    const hanldFilter=(e)=>{
        setFilter({...filter,type:e.target.value})

    }
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const status = (input) => {
        switch (input) {
            case 0:
                return "Chờ xác nhận"
            case 1:
                return "Hoàn thành"

            case 2:
                return "Bị hủy"


            default:
                break;
        }
    }
   
    return (
        <div className="products-ncc">
            <div className="products-header">
                <h5>Lịch sử giao dịch</h5>

                {/* <select class="form-select" aria-label="Default select example">
                    <option selected>-Chọn nhà cung cấp-</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select> */}
              
                {/* <div className="btn-ncc">
                <a href="" className="havatool">
                    <i class="fas fa-plus"></i> Tạo
                    <div className="tooltip-tao">
                        Tạo giao dịch
                    </div>
                </a>
                <a href="" className="havatool">
                    <i class="fas fa-print"></i> In{" "}
                    <div className="tooltip-tao">
                        Xuất excel bảng này
                    </div>
                </a>
                </div> */}
             
            </div>
            <div className="orders-filter1">
                <div class="form-check">
                    <input onClick={(e)=>hanldFilter(e)} name='status'  class="form-check-input" type="radio" value="%%" id="all" />
                    <label class="form-check-label" for="all">
                        Tất cả
                    </label>
                </div>
                <div class="form-check">
                    <input onClick={(e)=>hanldFilter(e)} name='status' class="form-check-input" type="radio" value={0} id="cho" />
                    <label class="form-check-label" for="cho">
                        Nạp tiền
                    </label>
                </div>
                <div class="form-check">
                    <input onClick={(e)=>hanldFilter(e)} name='status'  class="form-check-input" type="radio" value={1} id="done" />
                    <label class="form-check-label" for="done">
                        Rút tiền
                    </label>
                </div>
               
                {/* <div class="form-check">
                    <input onClick={(e)=>hanldFilter(e)} name='status'  class="form-check-input" type="radio" value={2} id="cancel" />
                    <label class="form-check-label" for="cancel">
                        Bị hủy
                    </label>
                    
                </div> */}
            </div>
            <div className="products-body">
            <div className="table-responsive">
            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                STT
                            </th>
                            <th >Mã giao dịch</th>
                          
                            <th>Loại</th>
                            <th>Số tiền</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Note*</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tran.map((e,i)=>{
                                return(
                                    <tr>
                                    <td scope="row">
                                        {i+1}
                                    </td>
                                    <td >
                                       {e.idtran}
                                    </td>
                                    <td>{e.type===0?"Nạp tiền":"Rút tiền"}</td>
                                   
                                   
                                    <td>{formatMoney(e.value)}</td>
                                    <td>{timeStampToStringFormat(e.createdate)}</td>
                                    <td>{status(e.done)}</td>
                                    <td>{e.note}</td>
                                </tr>
                                )
                            })
                        }
                       
                    </tbody>
                </table>
            </div>
                
                
            </div>
            
        </div>
    );
}

export default GiaoDich;