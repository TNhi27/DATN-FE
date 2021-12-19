import React, { useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import "./FormOrders.scss";




function FormCreateProduct(props) {

  useEffect(()=>{
    window.scrollTo(0, 0)
},[])
  return (
    <div className="form-create">
      <div className="products-header">
        <h5>Chi tiết đơn hàng</h5>
        <div className="link">
         
          <a href="">
          <i class="fas fa-print"></i> In Hóa Đơn
          </a>
          <a href="">
            <i class="fas fa-sign-out-alt"></i> Thoát
          </a>
        </div>
      </div>
      <div className="form-products">
        <h5>Thông tin đơn hàng</h5><span className="note">*Sử dụng máy tính để chỉnh sửa thông tin chi tiết sản phẩm</span>        <div className="form-pro">
          <form className="form-left" action="">
            <div className="row">
              <div class="form-group">
                <label for="exampleInputEmail1">Mã đơn hàng <span className="note">*</span></label>
                <input type="text" class="form-control" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
            <div className="row">
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Tổng tiền<span className="note">*</span></label>
                <input type="number" class="form-control" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Ngày tạo </label>
                <input type="date" class="form-control" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group col-sm-12 col-md-4">
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Trạng thái <span className="note">*</span></label>
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>--Trạng thái--</option>
                    <option>Phụ kiện thời trang</option>
                    <option>Thiết bị điện tử</option>
                    <option>Văn phòng phẩm</option>


                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Khách hàng <span className="note">*</span></label>
                <input type="number" class="form-control" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Số điện thoại <span className="note">*</span></label>
                <input type="text" class="form-control" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group col-sm-12 col-md-4">
                <label for="exampleInputEmail1">Nhà cung cấp<span className="note">*</span></label>
                <input type="text" class="form-control" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
            </div>
            <div className="row">
              <div class="form-group">
                <label for="floatingTextarea">Địa chỉ</label>
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>

              </div>
            </div>


          </form>
          <div className="form-right">
            <h5>Chi tiết đơn hàng</h5>
            <div className="row">
              <table class="table">
                <thead>
                  <tr>
                    
                    <th  >Tên sản phẩm</th>
                    <th >Số lượng</th>
                    <th >Đơn giá</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">
                      Tai nghe
                    </td>
                   
                    <td>2</td>
                    <td>405.000</td>
                   
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCreateProduct;
