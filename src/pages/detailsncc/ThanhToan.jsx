import React,{useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import Validator from '../../lib/Validator';
import { createInfoBanks, getInfoBanks } from '../../service/_infobanks';

function ThanhToan(props) {
    const user = useSelector(s=>s.login)
    const [show,setshow] = useState(false)
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
   
    const [info,setInfo] =useState({
        name:"",
        bankname:"",
        banknumber:""

    })

    const name = useRef();
    const so = useRef();
    const bank = useRef();


    useEffect(()=>{
        getInfoBanks(user.username).then((res)=>{
            setInfo(res.data)
            
        })
        Validator({
            rules:[
                Validator.isRequired(name),
                Validator.isRequired(so),
                Validator.isRequired(bank),
            ]
        })
    },[])

    const handleChange = (e)=>{
        setInfo({...info,[e.target.name]:e.target.value})
    }

    const save = ()=>{
     if (checkform()) {
        createInfoBanks(info).then((res)=>{
            setInfo(res.data)
            alert("Lưu thành công")
        }).catch(()=>{
            alert("Lưu thất bại ")
        })
     }
    }

    const checkform =()=>{
        if (info.bankname.length===0||info.banknumber.length===0||info.name.length===0) {
            alert("Vui lòng điền đầy đủ thông tin")
            return false;
        }
        return true;
    }
    
    return (
        <>
            <div className="summary">
                <div className="summary-header">
                    <h5>Thong tin </h5>
                    <i class="fas fa-angle-right"></i>
                </div>
                <div className="summary-body">
                <div className="card">
                        <h5><i class="fas fa-university"></i> THONG TIN TAI KHOAN</h5>
                        <span>

                            {info.name.toUpperCase()||""}
                        </span>
                        <div className="bank">
                           NGAN HANG {info.bankname.toUpperCase()}
                        </div>
                        <div className="num">
                           {info.banknumber.replace(/\d(?=\d{4})/g, " * ")}
                        </div>
                        <div className="card-bot">
                          
                          
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-tt">
                <div className="summary">
                    <div className="summary-header">
                        <h5>Thông tin tài khoản </h5>
                        <i class="fas fa-angle-right"></i>
                    </div>
                    <div className="summary-body">
                        <div className="row">
                            <div className="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Tên tài khoản</label>
                                    <input ref={name} value={info.name} name="name" onChange={(e)=>handleChange(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small style={{color:'red'}} ></small>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Ngân hàng</label>
                                    <input ref={bank} value={info.bankname} name="bankname" onChange={(e)=>handleChange(e)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small style={{color:'red'}} ></small>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Số tài khoản</label>
                                    <input ref={so} style={{marginBottom:"10px"}} value={info.banknumber} name="banknumber" onChange={(e)=>handleChange(e)} type={show?"text":"password"} class="form-control" />
                                    <a style={{background:"#367bca",padding:'5px',borderRadius:'10px',marginTop:'10px',color:'white'}} onClick={()=>setshow(!show)} >{show?"Hide":"Show"}</a>
                                    <small style={{color:'red'}} ></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bot">
                        <div className="">
                            <button onClick={()=>save()} >Save</button>
                        </div>
                        <div className="">
                            <button>Thoát</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThanhToan;