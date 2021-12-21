import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import FooterComponent from "../../components/Footer/FooterComponent";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination/Pagination";
import Product from "../../components/Product";
import { getCategoryById, getCategoryList } from "../../service/_category";
import { getBrands, getCityNcc, getOrigins, getProductsList } from "../../service/_products";

import "./module.scss";

function Products() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  //state
  const [listProducts, setListProducts] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cites, setCities] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  const [countBrand, setCountBrand] = useState(5)




  const select = useSelector(state => state.search);

  const [onloading, setOnloading] = useState(false);

  const [fil, setFil] = useState({
    page: 0,
    size: 20,
    sort: 'createdate',
    category: "%%",
    city: [],
    origin: [],
    min: 0,
    max: 100000000,
    des: true,
    query: select.name || "",
    parent: select.category || "",
    brands: []
  })





  //init
  useEffect(() => {


    getCategoryList().then((res) => {
      setCategories(res.data)
    })
    getOrigins().then((res) => {
      setOrigins(res.data)
    })
    getCityNcc().then((res) => {
      setCities(res.data)
    })

  }, [])

  useEffect(() => {
    getBrands(countBrand, fil.parent).then((res) => {
      setBrands(res.data.content)
    })
  }, [countBrand, fil.parent])


  useEffect(() => {

    setFil({ ...fil, query: select.name, page: 0, parent: select.category })

  }, [select])





  useEffect(() => {

    setOnloading(true);
    
    getProductsList(fil).then((res) => {


      setListProducts(res.data.content)
      setTotalResult(res.data.totalElements)
      setTotalPage(res.data.totalPages)

      getCategoryById(fil.parent).then((res) => {
        setCurrentCategory(res.data)

      })
      setOnloading(false);
    })
  }, [fil])


  //ref
  const more_ncc = useRef();
  const more_xs = useRef();
  const filter = useRef();
  const min = useRef();
  const max = useRef();
  const search = useRef();


  //handleFunction
  const gotoPage = (page) => {
    setFil({ ...fil, page: page })
  }

  const handleFillter = (e, des = true) => {
    setFil({ ...fil, [e.target.name]: e.target.id, des: des })
    if (des === false) {
      setCurrentCategory("")
    }
  }

  const handleShowBrand = () => {
    setCountBrand(countBrand + 5)
  }

  const handldShowAll = (e, des = true) => {
    setFil({ ...fil, category: "%%", des: des, parent: "" })

    if (des === false) {
      setCurrentCategory("")
    }
  }
  const handleFillterSort = (e, des = true) => {
    setFil({ ...fil, page: 0, [e.target.name]: e.target.value, des: des })

  }


  const handleOriginCheck = (e) => {
    if (fil.origin.includes(e)) {
      setFil({ ...fil, origin: fil.origin.filter(el => el !== e) })
    } else {
      setFil({ ...fil, origin: [...fil.origin, e] })
    }


  }

  const handleBrandCheck = (e) => {
    if (fil.brands.includes(e)) {
      setFil({ ...fil, brands: fil.brands.filter(el => el !== e) })
    } else {
      setFil({ ...fil, brands: [...fil.brands, e] })
    }


  }

  const handleCityCheck = (e) => {
    if (fil.city.includes(e)) {
      setFil({ ...fil, city: fil.city.filter(el => el !== e) })
    } else {
      setFil({ ...fil, city: [...fil.city, e] })
    }
  }

  const handleFillterPrice = () => {
    let min_price = min.current.value;
    let max_price = max.current.value;

    setFil({ ...fil, min: min_price, max: max_price })
  }
  const handleParent = (e) => {

    setFil({ ...fil, parent: e.category.idcate })

    setCurrentCategory(e.category)


  }
  const handleChild = (cate) => {

    setFil({ ...fil, parent: "", category: cate.idcate });
  }

  const handleResetFiller = () => {
    setFil(
      {
        page: 0,
        size: 20,
        sort: 'createdate',
        category: "%%",
        city: [],
        origin: [],
        min: 0,
        max: 100000000,
        des: true,
        query: "",
        parent: "",
        brands:[]
      }
    )
    let ck = document.getElementsByName("origin");
    ck.forEach((e) => {
      e.checked = false;
    })
    let city = document.getElementsByName("city");
    city.forEach((e) => {
      e.checked = false;
    })

    let brand = document.getElementsByName("brand");
    brand.forEach((e)=>{
      e.checked=false;
    })
    min.current.value = 0
    max.current.value = 0;

  }

  const show_more = () => {
    more_ncc.current.classList.toggle("show-box-hide");
  };
  const show_xs = () => {
    more_xs.current.classList.toggle("show-box-hide");
  };
  const show_list = () => {
    filter.current.classList.toggle("active_list");
  };
  const close = () => {
    filter.current.classList.toggle("active_list");
  };





  return (
    <>


      <div className="products row">
        <a onClick={() => show_list()} className="showdm">
          <span>Lọc kết quả</span>
          <i class="fas fa-filter"></i>
        </a>
        <div ref={filter} className="container-filter col-sm-12 col-md-3">
          <div className="box">
            <h5 className="box-header">
              <i class="fas fa-bars"></i> Danh Mục Sản Phẩm{" "}
              <i onClick={() => close()} class="fas fa-times close fa-2x"></i>
            </h5>
            <div className="box-body">

              <ul>
                <li>
                  <a name="category" id="%%" onClick={(e) => handldShowAll(e, false)} >Tất cả sản phẩm</a>
                </li>
                {
                  categories.map((e, i) => {
                    return (
                      <li className="drop-menu">
                        <a onClick={() => handleParent(e)} >
                          {e.category.typename}
                        </a>
                        <ul className="child-menu">
                          {
                            e.child.map((cate, i) => {
                              return (
                                <li>
                                  <a name="category" id={cate.idcate} onClick={() => handleChild(cate)} >{cate.typename}</a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </li>
                    )
                  })
                }


              </ul>
            </div>

          </div>

          <div className="box">
            <h5 className="box-header item2">
              <i class="fas fa-filter"></i> BỘ LỌC TÌM KIẾM
            </h5>
            <div className="box-body">
              {/* <div className="gr-filter">
                <label className="title-filter">Theo sản phẩm</label>
                <div className="check">
                  <input type="checkbox" id="0" />
                  <label htmlFor="0">Sản phẩm mới</label>
                </div>
                <div className="check">
                  <input type="checkbox" id="1" />
                  <label htmlFor="1">Sản phẩm nổi bật</label>
                </div>
              </div> */}
              <div className="line-one"></div>
              <div className="gr-filter">
                <label className="title-filter">Xuất xứ</label>
                {
                  origins.map((e, i) => {
                    return (
                      <div className="check">
                        <input
                          type="checkbox"
                          id={e}
                          name="origin"
                          value={e}
                          onChange={() => handleOriginCheck(e)}
                        />
                        <label htmlFor={e}>{e}</label>
                      </div>
                    )
                  })
                }



              </div>
              <div className="gr-filter">
                <label className="title-filter">Thương hiệu</label>
                {
                  brands.map((e, i) => {
                    return (
                      <div className="check">
                        <input
                          type="checkbox"
                          id={e.id + "br"}
                          name="brand"
                          value={e.id}
                          onChange={() => handleBrandCheck(e.id)}
                        />
                        <label htmlFor={e.id + "br"}>{e.name}</label>
                      </div>
                    )
                  })
                }
                 {/* <div className="check">
                        <input
                          type="checkbox"
                          id={"none" + "br"}
                          name="brand"
                          value={}
                          onChange={() => handleBrandCheck()}
                        />
                        <label htmlFor={"none" + "br"}>Không có thương hiệu</label>
                      </div> */}


                <div className="box-bottom">
                  <button onClick={() => handleShowBrand()} className="btn apdung">
                    Thêm
                  </button>
                </div>
              </div>

              <div className="line-one"></div>

              <div className="gr-filter">
                <label className="title-filter">Khoảng Giá</label>

                <div className="in">
                  <input ref={min} type="text" placeholder="Từ" />
                  <input ref={max} type="text" placeholder="Đến" />
                </div>
                <div className="box-bottom">
                  <button onClick={() => handleFillterPrice()} className="btn apdung">
                    Áp dụng
                  </button>
                </div>
              </div>

              <div className="line-one"></div>

              <div className="gr-filter">
                <label className="title-filter">Vị trí nhà cung cấp</label>
                {
                  cites.map((e, i) => {
                    return (
                      <div className="check">
                        <input
                          type="checkbox"
                          id={e + i}
                          name="city"
                          value={e}
                          onChange={() => handleCityCheck(e)}
                        />
                        <label htmlFor={e + i}>{e}</label>
                      </div>
                    )
                  })
                }


              </div>
              <div className="line-one"></div>
              <div className="gr-filter">
                <div className="box-bottom">
                  <button onClick={() => handleResetFiller()} className="btn clear">
                    Xóa tất cả
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-products col-sm-12 col-md-9">
          <h5>Tất cả sản phẩm/ {currentCategory.typename}</h5>
          <div className="sort">

            <div className="sort-edit">
              <h5>Sắp xếp theo </h5>
              <div class="form-check">
                <input class="form-check-input" value="createdate" type="radio" name="sort" id="createdate" onClick={(e) => handleFillterSort(e)} />
                <label class="form-check-label" for="createdate">
                  Mới nhất
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" value="name" type="radio" name="sort" id="name" onClick={(e) => handleFillterSort(e, false)} />
                <label class="form-check-label" for="name">
                  Tên : A - Z
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" value="name" type="radio" name="sort" id="name1" onClick={(e) => handleFillterSort(e)} />
                <label class="form-check-label" for="name1">
                  Tên : Z - A
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" value="pricectv" type="radio" name="sort" id="pricectv" onClick={(e) => handleFillterSort(e)} />
                <label class="form-check-label" for="pricectv">
                  Giá : Cao - thấp
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" value="pricectv" type="radio" name="sort" id="pricectv1" onClick={(e) => handleFillterSort(e, false)} />
                <label class="form-check-label" for="pricectv1">
                  Giá : Thấp - cao
                </label>
              </div>
            </div>
            <div className="search-info">Tìm thấy <b>{totalResult}</b> kết quả</div>
          </div>
          <div className="row">
            {
              listProducts.map((e, i) => {
                return (
                  <Product product={e} />
                )
              })
            }
          </div>


          <Pagination totalPage={totalPage} onClick={gotoPage} currentPage={fil.page} />
        </div>
      </div>


    </>
  );
}

export default Products;
