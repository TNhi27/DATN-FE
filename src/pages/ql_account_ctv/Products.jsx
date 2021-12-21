import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import { timeStampToStringFormat } from "../../lib/TimeCover";
import { deleteRegiProduct, getRegiProduct, regiProduct } from "../../service/_regi_products";
import "./Products.scss";

function Products(props) {

  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);
  const user = useSelector(state => state.login);

  const [filter, setFilter] = useState({
    category: "%%",
    name: "%%"
  })

  useEffect(() => {
    getRegiProduct(user.username, filter).then((res) => {
      setProductList(res.data.content)
      let cate = [];
      res.data.content.map((e) => {
        cate.push(e.products.category)
      })
      const cates = Array.from(new Set(cate.map(JSON.stringify))).map(JSON.parse);

      setCategory(cates);

    })
  }, [])

  useEffect(() => {
    getRegiProduct(user.username, filter).then((res) => {
      setProductList(res.data.content)
    })
  }, [filter])


  const handlDelete = (id) => {
    deleteRegiProduct(id).then((res) => {
      alert(res.data)
    }).then(() => {
      getRegiProduct(user.username, filter).then((res) => {
        setProductList(res.data.content)

      })
    })
  }

  const handlFillterCate = (evt) => {
    setFilter({ ...filter, category: evt.target.value })

  }

  const handlSearch = (evt) => {
    setFilter({ ...filter, name: evt.target.value })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="products-ncc">
      <div className="products-header">
        <h5 style={{ textAlign: 'left' }}>Sản phẩm đăng kí bán</h5>

        <select onChange={(e) => handlFillterCate(e)} class="form-select" aria-label="Default select example">
          <option value="%%" >Chọn loại sản phẩm</option>
          {
            category.map((e) => {
              return (
                <option value={e.idcate} >{e.typename}</option>
              )
            })
          }
        </select>
        <div className="search">
          <input onChange={(e) => handlSearch(e)} type="text" placeholder="Tìm kiếm"></input>
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
                  <input type="checkbox" />
                </th>
                <th >Tên sản phẩm</th>
                <th >Giá Sản phẩm</th>
                <th >Gía đăng kí bán</th>

                <th>Ngày đăng kí</th>
                <th>#</th>

              </tr>
            </thead>
            <tbody>
              {
                productList.map((e, i) => {
                  return (
                    <tr >
                      <td scope="row">
                        {i + 1}
                      </td>
                      <td className="tensp" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={e.products.image0}
                          alt=""
                        />
                        <span>{e.products.name}</span>
                      </td>
                      <td>{e.products.pricectv}</td>
                      <td>{e.price}</td>


                      <td >{timeStampToStringFormat(e.regidate)}</td>

                      <td ><i onClick={() => handlDelete(e.idregi)} class="far fa-trash-alt del"></i></td>
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

export default Products;
