import React, { useEffect, useRef, useState } from "react";
import 'react-slideshow-image/dist/styles.css'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import ListProductsOfNcc from "../../components/ListProductsOfNcc";
import MenuComponent from "../../components/Menu/MenuComponent";
import Product from "../../components/Product";
import { getAllCategory } from "../../service/_category";
import { getNewProducts, getTopRatingProducts } from "../../service/_products";
import { getListNcc, getProductsByNcc, getTopNcc } from "../../service/_supplier";
import NhaCungCap from "../../components/NhaCungCap";
import "./Home.scss";
import ModalRegiProduct from "../../components/Modal/ModalRegiProduct";

import { Slide } from 'react-slideshow-image';

import bn1 from "../../assets/img/bn1.jpg"
import bn2 from "../../assets/img/bn2.jpg"
import bn3 from "../../assets/img/bn3.jpg"
import Welcome from "../../components/Modal/Welcome";
import { doSearch } from "../../store/action";



function HomePage(props) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [top_rating, setTopRating] = useState([]);
  const [category, setCategory] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [ncc, setNcc] = useState([]);
  const [product, setProduct] = useState({
    idpro: "",
    pricectv: 0
  })

  const [show, setShow] = useState(true)
  const his = useHistory();
  const user = useSelector(state => state.login)
  const dispatch = useDispatch();
  const text = useSelector(state => state.search);
  const [modalShow, setModalShow] = useState({
    isShow: false,
    content: "",
    title: "Gia cua nha cung cap :"
  });

  const [ncclistrandom,setNccListRandom] = useState([])

  const danhmuc = useRef()
  const rating = useRef()
  const nccscroll = useRef()

  const handleBackMenu = (re) => {
    re.current.scrollLeft -= 200
  }

  const handleNextMenu = (re) => {
    re.current.scrollLeft += 200
  }
  const slideImages = [
    {
      url: bn1,
      caption: 'Slide 1'
    },
    {
      url: bn2,
      caption: 'Slide 2'
    },
    {
      url: bn3,
      caption: 'Slide 3'
    },
  ];


  useEffect(() => {
    getTopRatingProducts().then((res) => {
      setTopRating(res.data)
      console.log(res.data);
    });
    getAllCategory().then((res) => {
      setCategory(res.data.filter(e => e.parent === null))
    });
    getNewProducts(16).then((res) => {
      setNewProducts(res.data)

    })

    getTopNcc().then((res) => {
      setNcc(res.data)
    })

    getListNcc().then((res)=>{
      setNccListRandom(res.data.result)
    })
  }, [])

  const handleSearch = (category) => {
    dispatch(doSearch({
      name: text.name,
      category: category
    }))
    his.push("/products")
  }

  const renderstar = (star) => {
    let list = []
    for (let i = 0; i < star; i++) {
      list.push(<i class="fas fa-star"></i>)
    }
    return list;
  }
  const showModal = (p) => {
    setProduct({ ...product, idpro: p.idpro, pricectv: p.gia });
    setModalShow({ ...modalShow, isShow: true })
  }

  return (
    <div>
      <header class="masthead1">
        <div class="container">
          <div class="masthead-subheading">Welcome To BM</div>
          <div class="masthead-heading text-uppercase">Kinh doanh online <br /> <span style={{ fontSize: '28px' }}>theo cách riêng của bạn</span></div>
          <a class="mybtn btn-xl text-uppercase" href="#sanpham">Thử sức cùng BM !</a>
        </div>
      </header>
      <div className="wap">

        <div className="slide-box">


          <Slide
            duration={2000}
            arrows={false}
          >
            {slideImages.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <img width="80%" height="420px" className="item-slide" src={slideImage.url} alt="" />
              </div>
            ))}
          </Slide>


        </div>


        <div className="sanphambanchay">
          <div className="flag">
            <h2>
              <img src="./images/flame.png" alt="" />
              <span>Sản phẩm nổi bật </span>
            </h2>
          </div>
          <div style={{ marginTop: '20px' }} className="ds">
            <button onClick={() => handleBackMenu(rating)}><i class="fas fa-chevron-left"></i></button>
            <div ref={rating} style={{ display: "flex" }} id="body-ds" className="body">
              {
                top_rating.map((e, i) => {
                  return (
                    <div className="san-pham">
                      <img
                        width="30px"
                        className="hot"
                        src="./images/icon/flame.png"
                        alt=""
                      />
                      <img
                        src={e.image}
                        alt=""
                      />
                      <span className="sp-name">{e.name}</span>

                      <div className="star">
                        {renderstar(e.rating)}
                      </div>
                      <div className="sp-gia-container">
                        <div className="sp-gia">
                          <i className="fas fa-store-alt" /> {e.origin}
                        </div>

                        <div className="sp-gia">
                          {e.gia} <b>d</b>
                        </div>
                      </div>

                      <div className="bottom">
                        {
                          user.role === "[ROLE_CTV]" ? <a onClick={() => showModal(e)} >Đăng kí sản phẩm</a> : ""
                        }

                        <Link to={`/detail/${e.idpro}`} >Chi tiết</Link>
                      </div>
                    </div>
                  )
                })
              }


            </div>
            <button onClick={() => handleNextMenu(rating)}><i class="fas fa-chevron-right"></i></button>
          </div>

          <div className="bot">
            <Link to="/products" >Xem Thêm</Link>
          </div>
        </div>

        <section className="danh-muc">
          <div className="top">
            <i className="fas fa-th-large " />
            Danh mục sản phẩm
          </div>
          <div className="ds">
            <button onClick={() => handleBackMenu(danhmuc)}><i class="fas fa-chevron-left"></i></button>
            <div ref={danhmuc} style={{ display: "flex" }} id="body-ds" className="body">

              {
                category.map((e, i) => {
                  return (
                    // to={`/products_by_categoty/${e.idcate}`}
                    <a onClick={() => handleSearch(e.idcate)} className="item">

                      <img src={e.img} alt="" />
                      {e.typename}

                    </a>
                  )
                })
              }



            </div>
            <button onClick={() => handleNextMenu(danhmuc)}><i class="fas fa-chevron-right"></i></button>
          </div>

        </section>

        <section className="san-pham-moi" id="sanpham">
          <div className="top">
            <span>
              <i className="fas fa-bullhorn" />
              Sản phẩm mới
            </span>
            <span className="more">
              <span>Xem thêm</span> <i className="fas fa-angle-right icon" />
            </span>
          </div>
          <div className="list-sp">
            {
              newProducts.map((e, i) => {
                return (
                  <Product product={e} />
                )
              })
            }
          </div>

          <div className="bot">
            <Link to="/products" >Xem thêm</Link>
          </div>
        </section>

        <section className="ncc">
          <div className="ncc-top">
            <span>
              <i className="fas fa-store" />
              Nhà cung cấp nổi bật
            </span>
            <span className="more">
              <span>Xem thêm</span> <i className="fas fa-angle-right icon" />
            </span>
          </div>
         
          <div className="list-ncc">
            {
              ncc.map((e, i) => {
                return (

                  <NhaCungCap e={e} />
                )
              })
            }



          </div>

<br />

          <div className="ds">
            <button onClick={() => handleBackMenu(nccscroll)}><i class="fas fa-chevron-left"></i></button>
            <div ref={nccscroll} style={{ display: "flex",margin:"auto",overflow:'hidden',scrollBehavior:'smooth' }} id="body-ds2" className="body">

              {
                ncclistrandom.map((e) => {
                  return (
                    <div style={{minWidth:'500px'}} className="nha-cung-cap mt-100 m-2">
                      <img src="./images/bg-shop.jpg" alt="" />
                      <div className="top">
                        <div className="ncc-shop ">
                          <h5>
                            <Link style={{ color: 'white', textDecoration: 'none' }} to={`/detail_sell/${e.username}`} >{e.nccname}</Link>
                          </h5>
                          <div className="row w100">
                            <div className="col-sm-12 col-md-6 d-flex flex-column ">
                              <span className='ncc-span'>  Lượt Follows </span>
                              <i class="far fa-heart"></i>   {e.countFollow} follow

                            </div>
                            <div className="col-sm-12 col-md-6 d-flex flex-column ">
                              <span className='ncc-span'>  Địa chỉ  </span>
                              <span><i class="fas fa-map-marker-alt"></i>  {e.address}-{e.city}</span>

                            </div>
                          

                          </div>

                        
                        </div>

                        <a href>
                          {" "}
                          <img
                            src={e.ncclogo}
                            alt=""
                            width="70px"
                            height="70px"
                            className="avt"
                            style={{bottom:'-70px'}}
                          />
                        </a>
                      </div>
                    </div>
                  )
                })
              }


            </div>
            <button onClick={() => handleNextMenu(nccscroll)}><i class="fas fa-chevron-right"></i></button>
          </div>
        </section>

        <section className="about">
          <h2>Chính sách vận hành</h2>

          <div className="container">
            <div className="col-about">
              <img src="../images/truck-1.1s-200px.png" alt="" />
              <h3>Không giao hàng</h3>
              <p>
                Cộng tác viên chỉ cần chốt đơn, việc còn lại để chúng tôi lo
              </p>
            </div>
            <div className="col-about">
              <img src="./images/payment-1.1s-200px.png" alt="" />
              <h3>Không cọc</h3>
              <p>Không cọc tiền hàng, không thanh toán trước</p>
            </div>
            <div className="col-about">
              <img src="../images/sign-1.1s-200px.png" alt="" />
              <h3>Chính sách minh bạch</h3>
              <p>
                Chính sách bảo vệ quyền lợi Cộng tác viên luôn được ưu tiên hàng
                đầu
              </p>
            </div>
            <div className="col-about">
              <img src="./images/customer service-1.1s-200px.png" alt="" />
              <h3>Luôn lắng nghe và hỗ trợ 24/7</h3>
              <p>
                Đội ngũ hỗ trợ 1 kèm 1 tận tình, giúp bạn bắt đầu kinh doanh
                tiện lợi
              </p>
            </div>
          </div>
        </section>

      </div>
      <ModalRegiProduct
        show={modalShow.isShow}
        idpro={product.idpro}
        title={modalShow.title}
        content={modalShow.content}
        pricectv={product.pricectv}
        onHide={() => setModalShow({ ...modalShow, isShow: false })}
      />
      <Welcome
        show={show}
        onHide={() => setShow(false)}
      />

    </div>
  );
}

export default HomePage;
