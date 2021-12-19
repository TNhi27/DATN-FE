import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { getFollowNcc, unFollow } from '../../service/_follow';
import "./CongTacVien.scss"

function NhaCungCap(props) {

  const [nccList, setNccList] = useState([]);
  const [req, setReq] = useState({
    p: 0,
    size: 100
  })


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [c, setC] = useState(true);

  const user = useSelector(state => state.login)

  useEffect(async () => {
    const rs = await getFollowNcc(user.username, req);
    setNccList(rs.data.content)


  }, [c])



  const handleUnfollow = (id) => {
    unFollow(id).then((res) => {
      setC(!c)
    })
  }

  return (
    <div className="products-ncc">
      <div className="products-header">
        <h5>Nhà cung cấp đã follow</h5>

        {/* <select class="form-select" aria-label="Default select example">
          <option selected>Sản phẩm</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select> */}
        <div className="search">
          <input type="text" placeholder="Tìm kiếm"></input>
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

              <th  >Tên nhà cung cấp</th>
              <th >Địa chỉ </th>
              <th >Số điện thoại</th>
              <th>Email</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {
              nccList.map((e) => {
                return (
                  <tr>

                    <td className="tensp">
                      <Link to={`/detail_sell/${e.fl_ncc.username}`} style={{ color: 'white', backgroundColor: 'transparent' }} >
                        <img
                          src={e.fl_ncc.ncclogo}
                          alt=""
                        />
                      </Link>


                      {e.fl_ncc.nccname}
                    </td>
                    <td>{e.fl_ncc.city}</td>
                    <td>{e.fl_ncc.sdt}</td>
                    <td> {e.fl_ncc.email}</td>


                   
                    <td><a style={{ color: 'black', backgroundColor: 'transparent' }} onClick={() => handleUnfollow(e.followid)} >Bỏ theo dỗi</a>
                    </td>
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

export default NhaCungCap;