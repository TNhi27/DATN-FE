import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { changePw } from '../../service/_password';

function Password(props) {
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const [obj,setObj] = useState({
        password:"",
        newP:"",
        confirmP:""
    });

    const [error,setError] = useState({
        password:"",
        newP:"",
        confirmP:""
    })
    const handleChangePassword =()=>{
      if (check()) {
        changePw(obj).then((res)=>{
            alert(res.data.message)
         })
      }
    }

    useEffect(()=>{
        if (obj.password==="") {
            setError({...error,password:"Không được để trống !"})
           
        }else{
            setError({...error,password:""})
        }

        if (obj.newP==="") {
            setError({...error,newP:"Không được để trống !"})
           
        }else{
            setError({...error,newP:""})
            
        }
        if (obj.confirmP==="") {
            setError({...error,confirmP:"Không được để trống !"})
           
        }else{
            setError({...error,confirmP:""})
           
        }

        if (obj.newP!==obj.confirmP) {
            setError({...error,confirmP:"Mat khau khong trung khop"})
           
        }else{
            setError({...error,confirmP:""})
        }
    },[obj])


    const check = ()=>{
        if (obj.password.length===0) {
            setError({...error,password:"Không được để trống !"})
           
        }else{
            setError({...error,password:""})
        }

        if (obj.newP.length===0) {
            setError({...error,newP:"Không được để trống !"})
            
        }else{
            setError({...error,newP:""})
            
        }
        if (obj.confirmP.length===0) {
            setError({...error,confirmP:"Không được để trống !"})
            
        }else{
            setError({...error,confirmP:""})
           
        }

        if (obj.newP!==obj.confirmP) {
            setError({...error,confirmP:"Mật khẩu không trùng khớp"})
           
        }else{
            setError({...error,confirmP:""})
        }


        return true;
    }
    return (
        <>
            <div className="form-tt">
                <div className="summary">
                    <div className="summary-header">
                        <h5>Thông tin tài khoản </h5>
                        <i class="fas fa-angle-right"></i>
                    </div>
                    <div className="summary-body">
                       
                        <div style={{ marginTop: '20px' }} className="row">
                            <div className="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Nhập mật khẩu</label>
                                    <input  value={obj.password} onChange={(e)=>setObj({...obj,password:e.target.value})} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {error.password===""?"": <small id="emailHelp" class="form-text text-muted">{error.password}</small>}
                                   
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Nhập mật khẩu mới</label>
                                    <input value={obj.newP} onChange={(e)=>setObj({...obj,newP:e.target.value})} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {error.newP.length===0?"": <small id="emailHelp" class="form-text text-muted">{error.newP}</small>}
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Nhập lại mật khẩu</label>
                                    <input value={obj.confirmP} onChange={(e)=>setObj({...obj,confirmP:e.target.value})} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {error.confirmP.length===0?"": <small id="emailHelp" class="form-text text-muted">{error.confirmP}</small>}
                                </div>
                            </div>

                        </div>
                      
                      
                    </div>
                    <div className="bot">
                        <div onClick={()=>handleChangePassword()} className="">
                            <button>Save</button>
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

export default Password;