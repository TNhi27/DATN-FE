import React, { useEffect, useRef, useState } from "react";
import FooterComponent from "../../components/Footer/FooterComponent";
import "./style.scss";
import cmt from "../../assets/img/comment.png";
import { Redirect, useHistory, useParams } from "react-router";
import { getCommentsOfProducts, getProductsById, getProductsWithCategory } from "../../service/_products";
import { getNccByProduct } from "../../service/_supplier";
import Comments from "../../components/Comments";
import countStar from "../../lib/CountStar";
import Product from "../../components/Product"
import { Link } from "react-router-dom";
import { follow, getFollowNcc, unFollowWithNccAndCtv } from "../../service/_follow";
import { useSelector } from "react-redux";
import ModalRegiProduct from "../../components/Modal/ModalRegiProduct"
import { formatMoney } from "../../lib/FormatMoney";

const DetailsProduct = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  //state
  const [product, setProduct] = useState({});
  const [properties, setProperties] = useState([]);

  const [ncc, setNcc] = useState({});

  const [typename, setTypeName] = useState("");

  const [comments, setComments] = useState([]);
  const [sizeCmt, setSizeCmt] = useState(10);

  const [totalCmt, setTotalCmt] = useState(0);
  const [star, setStar] = useState(0);
  const [listImage, setListImage] = useState([]);
  const [productmatchcategory, setProductsMatchCategory] = useState([]);

  const [isFollow, setIsFollow] = useState(false);



  const [modalShow, setModalShow] = useState({
    isShow: false,
    content: "",
    title: "Gia cua nha cung cap :"
  });

  //ref
  const mainImage = useRef();
  const copyContent = useRef()

  const idpro = useParams();

  //local
  const user = useSelector(state => state.login)
  const [change, setChange] = useState(true);

  //history
  const his = useHistory();


  //Effect
  useEffect(() => {

    getProductsById(idpro.id).then((res) => {
      console.log(res.data);
      setProduct(res.data)
      setTypeName(res.data.category.typename)
      setProperties(res.data.properties || [])
      let list = [];
      list.push(res.data.image0)
      list.push(res.data.image1)
      list.push(res.data.image2)
      list.push(res.data.image3)
      setListImage(list);

      //set san pham cung loai
      getProductsWithCategory(res.data.category.idcate).then((res) => {
        setProductsMatchCategory(res.data.content)

      })

    }).catch((er) => his.push("/404"));
    getCommentsOfProducts(idpro.id, 0, sizeCmt).then((res) => {
      setComments(res.data.content)
      setTotalCmt(res.data.totalElements)
      setStar(countStar(res.data.content))
    })
    window.scrollTo(0, 0)


  }, [idpro, change])

  useEffect(() => {
    getNccByProduct(idpro.id).then((res) => {
      setNcc(res.data)

    })

  }, [product])

  useEffect(() => {
    getCommentsOfProducts(idpro.id, 0, sizeCmt).then((res) => {
      setComments(res.data.content)
      setTotalCmt(res.data.totalElements)
      setStar(countStar(res.data.content))
    })
  }, [sizeCmt])

  useEffect(() => {
    if (user.username.length > 0 && user.role === "[ROLE_CTV]") {
      getFollowNcc(user.username, { p: 0, size: 1000 }).then((res) => {

        res.data.content.map((e) => {
          if (e.fl_ncc.username === ncc.username) {
            setIsFollow(true)
          }
        })
      })
    }
  }, [])



  //handleFunction
  const change_image = (e) => {
    mainImage.current.src = e.target.src;

  };

  const handleFollow = () => {

  if (user.role==="[ROLE_CTV]") {
    follow(ncc.username).then((res) => {
      setChange(!change)
      setIsFollow(true)

    }).catch(()=>{
      setIsFollow(false)
    })
   
  }
  }

  const handleUnFollow = () => {
    if (user.role==="[ROLE_CTV]") {
    unFollowWithNccAndCtv(ncc.username, user.username).then((res) => {
      setChange(!change)
      setIsFollow(false)

    })
  }
  }

  const copy = () => {

    navigator.clipboard.writeText(product.description);
    alert("Đã sao chép !")
  }





  return (
    <aside>

      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light bg-white">
          <div className="container-fluid p-0">
            {" "}
            <a className="navbar-brand text-uppercase fw-800" href="#">
              <span className="border-red pe-2">Detail</span>Product
            </a>{" "}
          </div>
        </nav>
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4">
                      {" "}
                      <img
                        id="main-image"
                        src={listImage[0]}
                        width={250}
                        ref={mainImage}
                      />{" "}
                    </div>
                    <div className="thumbnail text-center">
                      {
                        listImage.map((img, i) => {
                          return (
                            <img
                              onClick={(e) => change_image(e)}
                              src={img || null}
                              width={70}
                              height={100}
                            />
                          )
                        })

                      }

                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        {" "}
                        <i className="fa fa-long-arrow-left" />{" "}
                        <span onClick={() => his.goBack()} className="ml-1">Back</span>{" "}
                      </div>{" "}
                    </div>

                    <div className="mt-4 mb-3">
                      {" "}
                      <span className="text-uppercase text-muted brand">
                        {typename}
                      </span>
                      <h5 className="ten">{product.name}</h5>
                      <div className="rarting">

                        <i className="fas fa-star" />
                        <span>{star===0?5:star}</span>
                      </div>
                      <div className="sizes mt-5">
                        <h6 className="gia">{product.pricectv !== undefined ? formatMoney(product.pricectv) : 0}</h6>{" "}
                      </div>
                     
                    </div>

                    <div className="cart mt-4 align-items-center share-fb">
                      {" "}
                      <button onClick={() => setModalShow({ ...modalShow, isShow: true })} className="btn btn-danger text-uppercase mr-2 px-4">
                        Đăng ký

                      </button>
                      <button className="btn btn-danger text-uppercase mr-2 px-4">
                        Đăng nhanh
                        <i class="fab fa-facebook-square "></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aboutsp">
                <div className="mota">
                  <h5>Chi tiết</h5>
                  <table class="table">
                    {/* <thead>
                      <tr>
                        <th scope="col">
                          Thuộc tính
                        </th>
                        <th  >Gía trị</th>

                      </tr>
                    </thead> */}
                    <tbody>
                      <tr>
                        <td>Xuất xứ</td>
                        <td>{product.origin}</td>
                      </tr>
                      <tr>
                        <td>Thương hiệu</td>
                        <td>{product.p_brand? product.p_brand.name :""}</td>
                      </tr>
                      <tr>
                        <td>Đơn vị tính</td>
                        <td>{product.dvt}</td>
                      </tr>
                    
                      {
                        properties.map((e, i) => {
                          return (
                            <tr>

                              <td scope="row">
                                {e.keyp}
                              </td>
                              <td className="tensp">

                                {e.valuep}
                              </td>

                            </tr>
                          )
                        })
                      }


                    </tbody>
                  </table>
                  <h5>
                    Mô tả sản phẩm <i onClick={(e) => copy(e)} class="fas fa-copy"></i>
                  </h5>
                  <div ref={copyContent} dangerouslySetInnerHTML={{ __html: product.description }}>

                  </div>


                  <br />
                  <br />
                </div>
                <div className="nhacungcap">
                  <div className="nha-cung-cap mt-100 ">
                    <img src="./images/bg-shop.jpg" alt="" />
                    <div className="top">
                      <h5>
                        <Link style={{ color: 'white' }} to={`/detail_sell/${ncc.username}`} >{ncc.nccname}</Link>
                      </h5>

                      <div>

                        {isFollow ? <><i onClick={() => handleUnFollow()} style={{ color: 'red' }} class="fas fa-heart"></i> </> : <i onClick={() => handleFollow()} class="far fa-heart"></i>}   {ncc.countFollow} follow
                      </div>
                      <span>
                        {" "}
                        <i class="fas fa-map-marker-alt"></i> {ncc.address} - {ncc.city}
                      </span>
                      <div className="row w100">
                        <div className="col d-flex flex-column ">
                          <span>
                            {" "}
                            <i class="far fa-calendar-alt"></i> {ncc.createdate}
                          </span>
                          Bán ở Big Market
                        </div>
                        <div className="col d-flex flex-column ">
                          <span>
                            {" "}
                            <i class="fas fa-boxes"></i> {ncc.countProducts}
                          </span>
                          Sản phẩm
                        </div>
                        <div className="col d-flex flex-column ">
                          <span>
                            <i class="fas fa-parachute-box"></i> {ncc.countOrders}
                          </span>
                          Đơn thành công
                        </div>
                      </div>

                      <Link style={{ color: 'white' }} to={`/detail_sell/${ncc.username}`} >
                        {" "}
                        <img
                          src={ncc.ncclogo}
                          alt=""
                          className="avt avt-ncc"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="comment">
                    <h5>
                      <i class="far fa-comments"></i> Đánh giá sản phẩm ({totalCmt} đánh
                      giá)
                    </h5>

                    <div className="list-cmt">
                      {
                        comments.map((e, i) => {
                          return (
                            <Comments cmt={e} />
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className="btn-more">
                    <a onClick={() => setSizeCmt(sizeCmt + 10)} >Xem thêm</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="title">
        <h5>Ở đây có sản phẩm bạn thích</h5>

      </div>

      <div className="list-products ">
        {
          productmatchcategory.map((e, i) => {
            return (
              <Product product={e} />
            )
          })
        }

      </div>
      <div className="bot mb-10">
        <Link to="/products">Xem thêm</Link>
      </div>

      <ModalRegiProduct
        show={modalShow.isShow}
        idpro={product.idpro}
        title={modalShow.title}
        content={modalShow.content}
        pricectv={product.pricectv}
        onHide={() => setModalShow({ ...modalShow, isShow: false })}
      />
    </aside>
  );
};

export default DetailsProduct;
