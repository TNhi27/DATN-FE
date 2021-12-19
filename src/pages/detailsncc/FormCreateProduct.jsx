import React, { useEffect, useRef, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./FormCreateProduct.scss";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getAllCategory, getCategoryList } from "../../service/_category";
import { v4 } from 'uuid';
import { timeToString } from "../../lib/TimeCover";
import { useSelector } from "react-redux";
import { WithContext } from 'react-tag-input';
import { uploadImageProducts } from "../../service/_uploadToCloud";
import { deleteProducts, getProductsById, saveProducts, updateProducts } from "../../service/_products";
import { useHistory, useParams } from "react-router";
import Validator from "../../lib/Validator";


function FormCreateProduct(props) {
  const user = useSelector(state => state.login)
  const his = useHistory()
  const [tags, setTags] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  //state
  const [product, setProduct] = useState({
    idpro: "",
    name: "",
    description: "",
    pricectv: 0,
    qty: 0,
    dvt: "",
    image0: "",
    image1: "",
    image2: "",
    image3: "",
    origin: "Việt Nam",
    tags: "",
    idcate: "",
    username: user.username,
    idbrand: "",
    properties: []
  });

  const [currentProperti, setCurrentProperti] = useState({
    keyp: "",
    valuep: ""
  })
  const [gr, setGr] = useState([]);
  const [child, setChild] = useState([]);
  const [brand, setBrand] = useState([]);

  //param of router-dom
  const param = useParams();

  const gr_cate = useRef();
  const childCate = useRef();

  const [images, setImages] = useState([])

  const [origin, setOrigin] = useState([
    "Việt Nam", "Hàn Quốc", "Quảng Châu-TQ", "Đài Loan", "Nhật Bản", "Khác..."
  ])
  const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  };

  const [cacheCategory, setCacheCategory] = useState({})

  const delimiters = [...KeyCodes.enter, KeyCodes.comma];

  //init
  useEffect(() => {
    getCategoryList().then((res) => {
      setGr(res.data)

      return res.data
    }).then((res) => {
      let list = res.filter((e) => e.category.idcate === cacheCategory.parent).map((e) => e.child)
      setChild(list[0])
      let brand = res.filter((e) => e.category.idcate === cacheCategory.parent).map((e) => e.brands)
      setBrand(brand[0])
    })

  }, [cacheCategory])

  useEffect(() => {
    gr_cate.current.value = cacheCategory.parent;

  }, [cacheCategory])

  const name = useRef();
  const gia = useRef();
  const sl = useRef();
  const dvt = useRef();
  const xx = useRef();
  const th = useRef();

  const check = () => {
    Validator({
      rules: [
        Validator.isRequired(name),
        Validator.isRequired(gia),
        Validator.isRequired(sl),
        Validator.isRequired(dvt),
        Validator.isRequired(xx),
        Validator.isRequired(gr_cate),
        Validator.isRequired(childCate),
        Validator.isRequired(th),

      ]
    })
  }



  useEffect(() => {

    if (param.idpro !== undefined) {
      getProductsById(param.idpro).then((res) => {
        console.log(res.data);
        setProduct({
          ...product,
          idpro: res.data.idpro || "",
          name: res.data.name || "",
          description: res.data.description || "",
          pricectv: res.data.pricectv || 0,
          qty: res.data.qty || 0,
          dvt: res.data.dvt || "",
          image0: res.data.image0 || "",
          image1: res.data.image1 || "",
          image2: res.data.image2 || "",
          image3: res.data.image3 || "",
          origin: res.data.origin || "",
          idcate: res.data.category.idcate || "",
          username: user.username,
          idbrand: res.data.p_brand.id || -1,
          properties: res.data.properties || []
        })

      // res.data.tags.split(",").map((e) => {
      //     console.log(e);
      //     setTags([...tags, { id: e, text: e }])
      //   })

      const t=  res.data.tags.split(",").map((e)=>{
        return {
          id:e,
          text:e
        }
      })
      console.log(t);
      setTags(t)
  
       
        setCacheCategory(res.data.category)

      })
    }


    check()

  }, [param.idpro])





  useEffect(() => {
    setProduct({ ...product, tags: tags.map((e) => e.text).toString() })

  }, [tags])

  useEffect(() => {
    setProduct({ ...product, idpro: v4() });
  }, [product.name])


  const checkform = () => {

    if (product.name.trim().length === 0 || product.dvt.trim().length === 0 || product.idbrand.length === 0 || product.idcate.trim().length === 0) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm !")
      return false;
    }

    if (product.image0 === "") {
      alert("Hình ảnh sản phẩm còn thiếu")
      return false;
    }
    if (product.pricectv < 1000) {
      alert("Giá phải lớn hơn 1000 VNĐ")
      return false;
    }

    return true;
  }

  const handleProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleChangeCategory = (e) => {
    const cate = e.target.value < 0 ? child[0].idcate : e.target.value;
    setProduct({ ...product, idcate: cate })
  }

  const addProperti = () => {
    setProduct({ ...product, properties: [...product.properties, currentProperti] })
    setCurrentProperti({
      valuep: "",
      keyp: ""
    })
  }
  const deleteProperti = (key) => {
    setProduct({ ...product, properties: product.properties.filter((e) => e.keyp !== key) })
  }


  const handleChangeGr = (parent) => {
    if (parent !== "none") {
      let list = gr.filter((e) => e.category.idcate === parent).map((e) => e.child)
      setChild(list[0]);
      let brand = gr.filter((e) => e.category.idcate === parent).map((e) => e.brands)
      setBrand(brand[0])

      setProduct({ ...product, idcate: -1, idbrand: -1 })
    }
  }

  const handleDelete = (i) => {

    setTags(tags.filter((tag, index) => index !== i))

  }

  const handleAddition = (tag) => {
    setTags([...tags, tag])

  }

  const handleDrag = (tag, currPos, newPos) => {
    const tags = [...tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags)


  }

  const handlSave = () => {

    if (checkform()) {
      saveProducts(product).then((res) => {
        alert("Thành công !")
      })
    }

  }

  const handleUpdate = () => {

    console.log(product.tags);
    if (checkform() === true) {
      updateProducts(param.idpro, product).then((res) => {
        alert("Thành công")
      })
    }

  }

  const deleteProduct = (id) => {
    deleteProducts(param.idpro).then((res) => {
      alert("Thành công")
    })
  }

  const handlChangeImage0 = (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);
    setProduct({ ...product, [e.target.name]: url })
    uploadImageProducts(e.target.files[0]).then((res) => {
      setImages([...images, res.data.url])
      setProduct({ ...product, [e.target.name]: res.data.url })
    })

  }


  return (
    <div className="form-create">
      <div className="products-header">
        <h5>Tạo sản phẩm</h5>
        <div className="link">
          {/* <a>
            <i class="fas fa-file-import havatool"></i> Import

          </a> */}
          {
            param.idpro === undefined ?
              <a onClick={() => handlSave()}>
                <i class="fas fa-save"></i> Save
              </a> : <>
                <a onClick={() => handleUpdate()}>
                  <i class="fas fa-save"></i> Update
                </a>
                <a onClick={() => deleteProduct()}>
                  <i class="fas fa-save"></i> Delete
                </a></>
          }

          <a onClick={() => his.goBack()}>
            <i class="fas fa-sign-out-alt"></i> Thoát
          </a>
        </div>
      </div>
      <div className="form-products">
        <h5>Thông tin sản phẩm</h5><span className="note">*Sử dụng máy tính để chỉnh sửa thông tin chi tiết sản phẩm</span>        <div className="form-pro">
          <form className="form-left" action="">
            <div className="row">
              <div class="form-group">
                <label for="exampleInputEmail1">Tên sản phẩm <span className="note">*</span></label>
                <input ref={name} name="name" value={product.name} onChange={(e) => handleProduct(e)} type="text" class="form-control" />
                <small style={{ color: 'red' }} ></small>
              </div>
            </div>
            <div className="row">
              <div class="form-group col-sm-12 col-md-6">

                <label for="exampleInputEmail1">Giá sản phẩm <span className="note">*</span></label>
                <input ref={gia} name="pricectv" value={product.pricectv} onChange={(e) => handleProduct(e)} type="number" class="form-control" />
                <small style={{ color: 'red' }} ></small>
              </div>
              <div class="form-group col-sm-12 col-md-6">
                <label for="exampleInputEmail1">Ngày tạo </label>
                <input value={timeToString(new Date())} type="text" class="form-control" />
                <small style={{ color: 'red' }} ></small>
              </div>

            </div>
            <div className="row">
              <div class="form-group col-sm-12 col-md-4">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Nhóm sản phẩm <span className="note">*</span></label>
                  <select ref={gr_cate} onChange={(e) => handleChangeGr(e.target.value)} class="form-control" id="exampleFormControlSelect1">
                    <option value="">Chọn nhóm sản phẩm</option>
                    {
                      gr.map((e) => {
                        return (
                          <option value={e.category.idcate}>{e.category.typename}</option>
                        )
                      })
                    }
                  </select>
                  <small style={{ color: 'red' }}></small>
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-4">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Loại sản phẩm <span className="note">*</span></label>
                  <select ref={childCate} value={product.idcate} name="idcate" onChange={(e) => handleChangeCategory(e)} class="form-control" id="exampleFormControlSelect1">
                    <option value="">Chọn loại sản phẩm</option>
                    {
                      child !== undefined ?
                        child.map((e) => {
                          return (
                            <option value={e.idcate}>{e.typename}</option>
                          )
                        }) : ""
                    }
                  </select>
                  <small style={{ color: 'red' }}></small>
                </div>
              </div>
              <div class="form-group col-sm-12 col-md-4">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Thương hiệu<span className="note">*</span></label>
                  <select ref={th} name='idbrand' value={product.idbrand} onChange={(e) => handleProduct(e)} class="form-control" id="exampleFormControlSelect1">
                    <option value="">Chọn thương hiệu</option>
                    {
                      brand === undefined || brand === null ? ""
                        : brand.map((e) => {
                          return (
                            <option value={e.id}>{e.name}</option>
                          )
                        })
                    }
                    <option value={18}>Không có thương hiệu</option>
                  </select>
                  <small style={{ color: 'red' }}></small>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Số lượng <span className="note">*</span></label>
                <input ref={sl} name="qty" value={product.qty} onChange={(e) => handleProduct(e)} type="number" class="form-control" />
                <small style={{ color: 'red' }} ></small>
              </div>
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Đơn vị tính <span className="note">*</span></label>
                <input ref={dvt} name="dvt" value={product.dvt} onChange={(e) => handleProduct(e)} type="text" class="form-control" />
                <small style={{ color: 'red' }}></small>
              </div>
              <div class="form-group col-sm-12 col-md-4">

                <div class="form-group">
                  <label for="exampleFormControlSelect1">Xuất xứ <span className="note">*</span></label>
                  <select ref={xx} value={product.origin} name="origin" onChange={(e) => handleProduct(e)} class="form-control" id="exampleFormControlSelect1">
                    {/* <option value={0}>Chon loai san pham</option> */}
                    {
                      origin.map((e) => {
                        return (
                          <option value={e}>{e}</option>
                        )
                      })
                    }
                  </select>
                  <small style={{ color: 'red' }}></small>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table class="table">
                <thead>
                  <tr>

                    <th >Thuộc tính</th>
                    <th >Giá trị</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    product.properties.map((e) => {
                      return (
                        <tr >
                          <td >{e.keyp}</td>
                          <td >{e.valuep}</td>
                          <td ><i onClick={() => deleteProperti(e.keyp)} class="far fa-trash-alt del"></i></td>
                        </tr>
                      )
                    })
                  }
                  <tr>
                    <td><input style={{ border: 'none', padding: '5px' }} value={currentProperti.keyp} onChange={(e) => setCurrentProperti({ ...currentProperti, keyp: e.target.value })} type="text" /></td>
                    <td><input style={{ border: 'none', padding: '5px' }} value={currentProperti.valuep} onChange={(e) => setCurrentProperti({ ...currentProperti, valuep: e.target.value })} type="text" /></td>
                    <td><i onClick={() => addProperti()} class="fas fa-plus add"></i></td>
                  </tr>

                </tbody>

              </table>



            </div>
            <div className="row">
              <div class="form-group col">
                <label for="exampleInputEmail1">Tags (Dùng để hỗ trợ tìm kiếm)</label>
                <WithContext tags={tags}
                  maxLength={60}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  delimiters={delimiters} />
              </div>


            </div>

            <div className="edit">
              <h5>Chi tiết sản phẩm <span className="note">*</span></h5>
              <CKEditor

                editor={ClassicEditor}
                data={product.description || ""}

                onChange={(event, editor) => {
                  setProduct({ ...product, description: editor.getData() })
                }}

              />
            </div>
          </form>
          <div className="form-right">
            <h5>Chọn hình ảnh cho sản phẩm</h5>
            <div className="row">
              <div class="form-group col">
                <label for="img0">
                  <img style={{ width: '70px' }} src={product.image0 || "../../images/add-image.png"} alt="" />
                </label>
                <input name="image0" onChange={(e) => handlChangeImage0(e)} hidden type="file" class="form-control-file" id="img0" />
              </div>
              <div class="form-group col">
                <label for="img1">
                  <img style={{ width: '70px' }} src={product.image1 || "../../images/add-image.png"} alt="" />
                </label>
                <input name="image1" onChange={(e) => handlChangeImage0(e)} hidden type="file" class="form-control-file" id="img1" />
              </div>
              <div class="form-group col">
                <label for="img2">
                  <img style={{ width: '70px' }} src={product.image2 || "../../images/add-image.png"} alt="" />
                </label>
                <input name="image2" onChange={(e) => handlChangeImage0(e)} hidden type="file" class="form-control-file" id="img2" />
              </div>
              <div class="form-group col">
                <label for="img3">
                  <img style={{ width: '70px' }} src={product.image3 === "" ? "../../images/add-image.png" : product.image3} alt="" />
                </label>
                <input name="image3" onChange={(e) => handlChangeImage0(e)} hidden type="file" class="form-control-file" id="img3" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCreateProduct;
