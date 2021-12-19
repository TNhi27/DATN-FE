import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { getFollowCtv } from '../../service/_follow';
import "./CongTacVien.scss"

function CongTacVien(props) {
  const user = useSelector(state => state.login);

  const [ctvList, setCtvList] = useState([]);
  const [products,setProducts] = useState([]);

  const [filter, setFilter] = useState({
    p: 0,
    size: 100,
    idpro:"%%",
    namectv:""
  })
  useEffect(() => {
    getFollowCtv(user.username, filter).then((res) => {
      setCtvList(res.data.content.map((e) => e.ctv));
      setProducts(res.data.content.map((e) => e.products));
      
    })
  }, [])

  useEffect(() => {
    
    getFollowCtv(user.username, filter).then((res) => {
      setCtvList(res.data.content.map((e) => e.ctv));  
    })
  }, [filter])

  const uniqueList = (list,attr) => {
      const uniqueArray = list
      .map(v => v[attr])
      .map((v, i, array) => array.indexOf(v) === i && i)
      .filter(v => list[v])
      .map(v => list[v]);

      return uniqueArray;

  }

  const handleSearch =(e)=>{
    setFilter({...filter,p:0,idpro:"%%",namectv:e.target.value})
  }
  useEffect(()=>{
    window.scrollTo(0, 0)
},[])
  return (
    <div className="products-ncc">
      <div className="products-header">
        <h5>Cộng tác viên</h5>

        <select onChange={(e)=>setFilter({...filter,idpro:e.target.value})} class="form-select" aria-label="Default select example">
          <option value="%%"> Tat ca Sản phẩm</option>
          {
            uniqueList(products,"idpro").map((e)=>{
              return(
                <option value={e.idpro}>{e.name}</option>
              )
            })
          }
         
       
        </select>
        <div className="search">
          <input value={filter.namectv} onChange={(e)=>handleSearch(e)} type="text" placeholder="Tìm kiếm"></input>
          <i class="fas fa-search"></i>
        </div>
        <div className="btn-ncc">
          {/* <a href="" className="havatool">
          <i class="fas fa-plus"></i> Tạo
         <div className="tooltip-tao">
             Tạo sản phẩm với form chi tiết
         </div>
        </a> */}
          <a href="" className="havatool">
            <i class="fas fa-print"></i> In{" "}
            <div className="tooltip-tao">
              Xuất excel bảng này
            </div>
          </a>
        </div>

      </div>
      <div className="products-body">
      <div className="table-responsive">
      <table class="table">
          <thead>
            <tr>
              <th scope="col">
                STT
              </th>
              <th  >Username</th>
              <th >Họ tên</th>
              <th >Giới tính</th>
              <th>Email</th>

              <th>SDT</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {
             uniqueList( ctvList,'username').map((e,i) => {
                return (
                  <tr>
                    <td scope="row">
                      {i+1}
                    </td>
                    <td className="tensp">
                      <img
                        src={e.image}
                        alt=""
                      />
                      {e.username}
                    </td>
                    <td>{e.fullname}</td>
                    <td>{e.sex}</td>
                    <td> {e.email}</td>

                    <td>{e.sdt}</td>
                    <td><Link to={`/supplier/infoctv/${e.username}`} >Chi tiết</Link></td>
                  </tr>
                )
              })
            }


          </tbody>
        </table>
      </div>
        

      </div>
      <Pagination />
    </div>
  );
}

export default CongTacVien;