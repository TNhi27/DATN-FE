import React, { useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { saveTokenToLocal } from "../../lib/LocalStore";
import { getCategoryList } from "../../service/_category";
import { doLogin, doLogout, doSearch } from "../../store/action";
import "./menu.style.css";

function MenuComponent(props) {
  const navMenu = useRef();
  const user = useSelector(state => state.login);

  const dispatch = useDispatch();
  const his = useHistory()

  const input_search = useRef();

  const [text, setText] = useState("");
  const [isText, setIsText] = useState(false);

  const [cateList,setCatelist] = useState([])
  const [cate,setCate] =useState("%%")


  useEffect(()=>{
    getCategoryList().then((res)=>{
      setCatelist(res.data)
      
    })
  },[])


  const show_menu = () => {
    navMenu.current.classList.toggle("menu-active");
  };

  const handlLogout = () => {
    dispatch(doLogout())
    his.push("/login")
    saveTokenToLocal("")
  }

  const handleSearch = (e) => {
   
    setText(e.target.value)
    if (e.key === "Enter") {
      dispatch(doSearch({
        name:input_search.current.value,
        category:cate
      }))
      his.push("/products")
    }
  }

  useEffect(() => {
    text === "" ? setIsText(false) : setIsText(true)
  }, [text])

  const clearText = () => {
    setText("")
    input_search.current.value = ""
  }


  return (
    <header>
      <div id="hero" className="hero">
        <div className="top-info">
          <div className="top-text">
            <i className="fas fa-phone" />
            0938648573
            <i className="fas fa-envelope" />
            contact.ok200@gmail.com
          </div>
          <div className="top-link">
            <div className="gr">
              <a href="#">
                {" "}
                <i className="fas fa-headset" /> Liên hệ
              </a>
              <a href="#">
                {" "}
                <i className="far fa-question-circle" /> Hỗ trợ
              </a>
            </div>
          </div>
        </div>
        {/* bat dau header */}
        <div className="item">
          <Link  to="/" className="logo">
            <img
              style={{ borderRadius: "50%" }}
              width="100px"
              height="60px"
              src={"../images/logo.png"}
              alt=""
            />
          </Link>
          <div className="search">
            <i onClick={(e) => handleSearch(e)} style={{ color: "black" }} class="fa fa-search"></i>
            <input onKeyDown={(e) => handleSearch(e)} ref={input_search} type="text" placeholder="Nhập tên sản phẩm" />
            {
              isText ? <i style={{ color: "black" }} onClick={() => clearText()} class="fas fa-times"></i> : ""
            }
            <select onChange={(e)=>setCate(e.target.value)} style={{width:"150px",border:'none',outline:'none'}} class="form-select">
              <option value="%%">Loại sản phẩm</option>
              {
                cateList.map((e)=>{
                  return(
                    <option value={e.category.idcate}>{e.category?.typename||""}</option>
                  )
                })
              }
            </select>
          </div>
          {/* <div className="gr">
            <a href>Đăng nhập</a> |<a href>Đăng kí</a>
          </div> */}
          <div className="account">
            <div className="acc-info" onclick="show_acc()">
              <img
                src={user.image || "../images/non_user.png"}
                alt=""
                className="avt"
              />
              <span style={{ marginLeft: "10px" }}>{user.username === "" ? <><Link to="/login">

                Đăng nhập
              </Link> |
                <Link to="/dangki">

                  Đăng kí
                </Link>
              </> : user.username}</span>
              <i className="fas fa-angle-down" />
            </div>
            {
              user.username === "" ? "" : <ul id="acc-menu" className="acc-menu">
                {
                  user.username === "" ? "" : (<>
                    <li>{
                      user.role === "[ROLE_CTV]" ? <Link to="/congtacvien/setting">
                        <i className="fas fa-user-alt" />
                        Cập nhật tài khoản
                      </Link> : <Link to="/supplier/setting">
                        <i className="fas fa-user-alt" />
                        Cập nhật tài khoản
                      </Link>
                    }

                    </li>
                    {/* <li>
                <a href>
                  <i className="fas fa-unlock" />
                  Đổi mật khẩu
                </a>
              </li> */}
                  </>)


                }

                {
                  user.username === "" ? "" : user.role === "[ROLE_CTV]" ? <li>

                    <Link to="/congtacvien" >
                      <i className="fab fa-trello" />
                      Bán hàng
                    </Link>
                  </li> : <li>

                    <Link to="/supplier" >
                      <i className="fab fa-trello" />
                      Gian hàng
                    </Link>
                  </li>
                }

                {
                  user.username !== "" ? <li>
                    <a onClick={() => handlLogout()}>
                      <i className="fas fa-sign-out-alt" />
                      Đăng xuất
                    </a>
                  </li> : <li>

                  </li>
                }

              </ul>
            }

          </div>
          {/* <i style="color: white;"
                class="fas fa-user-circle fa-2x peple"></i> */}
          <a id="btn-show" onClick={() => show_menu()} className="show-menu">
            <i className="fas fa-bars" />
          </a>
        </div>
        <nav ref={navMenu} id="nav-menu">
          <h3 className="wtf">DROP SHOP</h3>
          <ul>
            <li>
              <NavLink onClick={()=>show_menu()} exact to="/" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Trang chủ</NavLink>
            </li>
            <li>
              <NavLink onClick={()=>show_menu()} to="/products" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Sản phẩm</NavLink>
            </li>

            <li>
              <NavLink onClick={()=>show_menu()} to="/hdsd" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Hướng dẫn sử dụng</NavLink>
            </li>
            <li>
              <NavLink onClick={()=>show_menu()} to="/about" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Giới thiệu</NavLink>
            </li>
            <li>
              <NavLink onClick={()=>show_menu()} to="/news" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Tin tức</NavLink>
            </li>
            <li>
              <NavLink onClick={()=>show_menu()}  to="/policy" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Chính sách</NavLink>
            </li>
            {/* <li>
              <NavLink to="/contact" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Liên hệ</NavLink>
            </li>
            <li>
              <NavLink to="/policy" activeStyle={{
                color: '#d89216',
                fontWeight: '700'
              }} href>Chính sách</NavLink>
            </li> */}
          </ul>
          <div className="wtf">
            <i className="fab fa-facebook-f" />
            <i className="fab fa-twitter" />
            <i className="fab fa-instagram-square" />
          </div>
        </nav>
      </div>
    </header>
  );
}



export default MenuComponent;
