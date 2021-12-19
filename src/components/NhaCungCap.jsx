import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFollowNcc } from '../service/_follow';
import ListProductsOfNcc from './ListProductsOfNcc';

function NhaCungCap(props) {
    const {e} = props

    const [isFollow,setIsFollow] = useState(false);

    const user = useSelector(state=>state.login)
   

    useEffect(()=>{
        
       if (user.username.length>0 && user.role==="[ROLE_CTV]") {
        getFollowNcc(user.username,{p:0,size:1000}).then((res)=>{
            res.data.content.map((e)=>{
               
                if (e.fl_ncc.username===props.e.username) {
                    setIsFollow(true)
                }
            })
        })
       }
        
    },[user])
    
    return (
        <>
            <div className="nha-cung-cap mt-100 ">
                <img src="./images/bg-shop.jpg" alt="" />
                <div className="top">
                    <div className="ncc-shop ">
                        <h5>
                            <Link style={{color:'white',textDecoration:'none'}} to={`/detail_sell/${e.username}`} >{e.nccname}</Link>
                        </h5>
                        <div className="row w100">
                            <div className="col d-flex flex-column ">
                                <span className='ncc-span'>  Lượt Follows </span>
                                {isFollow?<><i style={{color:'red'}} class="fas fa-heart"></i> </>:<i class="far fa-heart"></i>}    {e.countFollow} follow
                               
                            </div>

                        </div>

                        <div className="row w100">
                            <div className="col d-flex flex-column ">
                                <span className='ncc-span'>  Địa chỉ nhà cung cấp </span>
                                <span><i class="fas fa-map-marker-alt"></i>  {e.address}-{e.city}</span>

                            </div>

                        </div>
                        <div className="row w100">
                            <div className="col d-flex flex-column ">
                                <span className='ncc-span'>Bán ở BigM </span>
                                <span><i class="far fa-calendar-alt"></i>  {e.createdate}</span>

                            </div>

                        </div>
                    </div>

                    <a href>
                        {" "}
                        <img
                            src={e.ncclogo}
                            alt=""
                            className="avt"
                        />
                    </a>
                </div>
            </div>
            <h3>
                {" "}
                <i className="fas fa-play" /> Sản phẩm nổi bật của nhà cung cấp
                này
            </h3>
            <div className="list-sp">
                <ListProductsOfNcc ncc={e} />

            </div>
        </>
    );
}

export default NhaCungCap;