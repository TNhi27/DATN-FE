import React, { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import Pagination from "../../components/Pagination/Pagination";
import { deleteProducts } from "../../service/_products";
import { getProductsByNcc, selectProductsWithNcc } from "../../service/_supplier";
import "./Products.scss";

function Products(props) {
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);
  const user = useSelector(state => state.login);

  const [change,setChange] = useState(true);

  const search = useRef();

  useEffect(()=>{
    window.scrollTo(0, 0)
},[])

  const [filter, setFilter] = useState({
    category: "%%",
    name: "",
    page: 0,
    size: 20
  })


  useEffect(() => {
    selectProductsWithNcc(user.username, filter).then((res) => {
      setProductList(res.data.content);

      let list = [];
      res.data.content.map((e) => {

        list.push(e.category)


      })
      setCategory(list)

    })
  }, [])
  useEffect(() => {
    selectProductsWithNcc(user.username, filter).then((res) => {
      setProductList(res.data.content); 

    })
  }, [filter,change])

  const handlFillter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const handlDelete=(id)=>{
    deleteProducts(id).then((res)=>{
      alert("Xóa thành công")
      setChange(!change)
    })
  }

  const handSearch = (e)=>{
    if (e.key==="Enter") {
      setFilter({...filter,name:search.current.value.length===0?"%%":search.current.value})
      
    }
   
   
  }

  const getUnique = () => {
    let list = [];
    category.map((e) => {
      let ck = false;
      list.map((e1) => e1.idcate === e.idcate ? ck = true : ck = false);
      if (ck === false) {
        list.push(e)
      }
    })
    return list;
  }
  return (
    <div className="products-ncc">  
      <div className="products-header">
        <h5>Sản phẩm</h5>

        <select name="category" onChange={(e)=>handlFillter(e)} class="form-select" aria-label="Default select example">
          <option value="%%" >Chọn loại sản phẩm</option>
          {
            getUnique().map((e) => {
              return (
                <option value={e.idcate}>{e.typename}</option>
              )
            })
          }


        </select>
        <div className="search">
          <input onKeyDown={(e)=>handSearch(e)} ref={search} type="text" placeholder="Tìm kiếm"></input>
          <i class="fas fa-search"></i>
        </div>
        <div className="btn-ncc">
          <Link to="/supplier/form_products" className="havatool">
            <i class="fas fa-plus"></i> Tạo
            <div className="tooltip-tao">
              Tạo sản phẩm với form chi tiết
            </div>
          </Link>
          <a onClick={() => getUnique()} className="havatool">
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
              <th >Tên sản phẩm</th>
              <th >Giá Sản phẩm</th>
              <th >Số lượng</th>
              <th>Xuất xứ</th>

              <th>Ngày tạo</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {
              productList.length===0? <div style={{display:'flex',justifyContent:'center',width:'100%',alignItems:'center'}}><i style={{fontSize:'30px'}} class="fas fa-meh-rolling-eyes"></i></div>:
              productList.map((e,i) => {
                return (
                  <tr>
                    <td scope="row">
                      {i+1}
                    </td>
                    <td className="tensp">
                      <img
                        src={e.image0}
                        alt=""
                      />
                      {e.name}
                    </td>
                    <td>{e.pricectv}</td>
                    <td>{e.qty}</td>
                    <td>{e.origin}</td>

                    <td>{e.createdate}</td>
                    <td><Link style={{background:'none'}} to={`/supplier/form_products/${e.idpro}`}><i class="fas fa-pencil-alt add"></i></Link></td>
                    <td ><i onClick={() => handlDelete(e.idpro)} class="far fa-trash-alt del"></i></td>
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
