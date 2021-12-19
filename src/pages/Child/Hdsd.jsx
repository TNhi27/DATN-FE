import clsx from 'clsx';
import React, { useEffect } from 'react';
import style from './hdsd.module.scss'

function Hdsd(props) {

  useEffect(()=>{
    window.scrollTo(0, 0)
},[])
  return (


    <>

      <header class="masthead2">
        <div class="container">
          <div class="masthead-subheading">Welcome To Ok200!</div>
          <div class="masthead-heading text-uppercase">Hướng dẫn sử dụng</div>
         
        </div>
      </header>
      <div className="container">


        <div class="row">

          <div class="col-3">
            <h3><strong>DANH MỤC</strong></h3>
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Tài khoản và mục khác </a>
              <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Đơn hàng và thanh toán</a>
              <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Hình thức vận chuyển</a>
              <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Trả hàng và hoàn tiền</a>
            </div>
          </div>

          <div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <div class="accordion" id="accordionExample">
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <strong>BẢO MẬT TÀI KHOẢN</strong>
                        </button>
                      </h2>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="accordion-body">
                        Trong trường hợp tài khoản ứng dụng của bạn đã được thay đổi một số thông tin quan trọng,
                        bao gồm: Mật khẩu đăng nhập, Số điện thoại liên kết, Địa chỉ email liên kết...<br />
                        Nếu <code>không phải là người thực hiện những thay đổi này</code> , bạn cần:
                        <li>Lập tức đặt lại <span><a href="" class="text-primary">mật khẩu đăng nhập</a></span> </li>
                        <li>Liên hệ ngay với Bộ phận CSKH để được hỗ trợ</li>
                        <span class="text-white bg-warning">Số điện thoại</span>: 0911 861 538
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          <strong>CẬP NHẬT TÀI KHOẢN?</strong>
                        </button>
                      </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong class="text-danger">Để update lại tài khoản bạn vào chỉnh sửa tài khoản: </strong>

                        Chỉnh sửa lại các thông tin bạn muốn chỉnh sửa và nhấn <span class="text-primary">Save</span>

                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          <strong>LÀM SAO ĐỂ CÓ THỂ LIÊN HỆ VỚI NHÀ CUNG CẤP</strong>
                        </button>
                      </h2>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>Nhà cung cấp của chúng tôi có đầy đủ thông tin cần thiết để hỗ trợ khách hàng</strong><br />
                        <strong class="text-danger">Cách 1:</strong> Inbox trực tiếp trên app <br />
                        <strong class="text-danger">Cách 2:</strong> Gọi qua số điện thoại hoặc đường dây nóng <br />
                        <strong class="text-danger">Cách 3:</strong> Liên hệ đến trang web, Facebook, Skype... <br />
                        <strong class="text-danger">Cách 4:</strong> Đến tận nơi để kiểm tra hàng và thỏa thuận kĩ càng hơn với
                        nhà cung cấp
                        <br />
                        <strong class="text-warning bg-dark">Lưu ý:</strong> Trong trường hợp bạn không thể nào liên lạc với nhà cung cấp bạn hãy gọi cho chúng
                        tôi qua đường dây nóng 1900 9080
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#help" aria-expanded="false" aria-controls="collapseThree">
                          <strong>LÀM SAO ĐỂ CÓ THỂ LIÊN HỆ VỚI NHÂN VIÊN HỖ TRỢ 200OK</strong>
                        </button>
                      </h2>
                    </div>
                    <div id="help" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>Đội ngũ 200OK luôn luôn sẵn sàng hỗ trợ khách hàng</strong><br />
                        <strong class="text-danger">Cách 1:</strong> Inbox trực tiếp trên web cho chúng tôi <br />
                        <strong class="text-danger">Cách 2:</strong> Viết phản hồi gửi cho chúng tôi <br />
                        <strong class="text-danger">Cách 3:</strong> Số điện thoại của chúng tôi: <br />
                        <ul>
                          <li>Lưu Trường Tá: 0909 567 890</li>
                          <li>Nguyễn Trần Tiến Trung: 0912 555 777</li>
                          <li>Trần Phước Định: 0945 611 166</li>
                          <li>Phan Thế Nghĩa: 0988 898 000</li>
                          <li>Lưu Thị Kim Thoa: 0911861538</li>
                        </ul>
                        <strong class="text-warning bg-dark">Lưu ý:</strong> Trong trường hợp bạn không thể nào liên lạc với đội ngũ của chúng tôi hoặc
                        nhân viên chúng tôi có những biểu hiện không tôt, bạn hãy gọi cho chúng tôi qua đường dây nóng 1900 9080
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#khonglogin" aria-expanded="false" aria-controls="collapseThree">
                            <strong>KHÔNG THỂ ĐĂNG NHẬP VÀO TÀI KHOẢN?</strong>
                          </button>
                        </h2>
                      </div>
                      <div id="khonglogin" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="accordion-body">
                          <strong class="text-danger">1.Đăng nhập không đúng thông tin</strong>
                          <ul>
                            Kiểm tra xem bạn đã nhập đúng thông tin với lúc bạn <span class="text-primary">đăng ký</span> chưa?
                            <ul>
                              <li>Tên tài khoản</li>
                              <li>Mật khẩu</li>
                            </ul>
                          </ul>
                          <strong class="text-danger">2.Tài khoản của bạn đã bị xóa bởi admin của chúng tôi?</strong>
                          <ul>
                            <li>Bạn vi phạm với những nguyên tắc của chúng tôi</li>
                            <li>Chúng tôi phát hiện bạn lừa đảo chiếm đoạt tài sản</li>
                            <li>Tài khoản của bạn không hoạt động trong một thời gian dài</li>
                            <li><strong>Trường hợp bạn là nhà cung cấp:</strong> Có lẽ đã lâu bạn không nhớ đến khoản thanh toán dành cho nhà cung cấp và thanh toán nó
                              chúng tôi rất lấy làm tiếc và đành khóa account của bạn bởi vì ai cũng phải sống bạn à</li>
                          </ul>
                          <strong class="text-danger">3.Hệ thống của chúng tôi bị lỗi hoặc trong quá trình bảo trì, sửa chữa?</strong> <br />
                          Việc xuất hiện lỗi khi đăng nhập vào tài khoản đôi khi có thể là do xảy ra một số sự cố hệ thống.
                          Nhằm hạn chế tối đa trường hợp này, bạn cần đảm bảo đường truyền mạng ổn định khi đăng nhập
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#quenmk" aria-expanded="false" aria-controls="collapseThree">
                            <strong>QUÊN MẬT KHẨU </strong>
                          </button>
                        </h2>
                      </div>
                      <div id="quenmk" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="accordion-body">
                          <strong class="text-danger">1. Gửi mã code xác nhận qua email</strong>
                          <ul>
                            <li><strong>Bước 1:</strong> Gõ email mà bạn đã đăng ký tài khoản bạn quên mật khẩu</li>
                            <li><strong>Bước 2:</strong> Nhấn <span class="text-primary">Gửi</span></li>
                            <li><strong>Bước 3:</strong> Kiểm tra trong hộp thư được gửi đến với mã code gồm 4 số</li>
                            <li><strong>Bước 4:</strong> Nhập mã code vào form, sau đó <span class="text-primary">Submit</span></li>
                            <li><strong>Bước 5:</strong> Sau khi lấy được tài khoản, bạn nên đổi lại mật khẩu và ghi chú lại cẩn thận nhé</li>
                          </ul>
                          <strong class="text-danger">2. Mất email đăng nhập trong khi quên mật khẩu</strong> <br />
                          <p>Chúng tôi thành thật khuyên bạn nên tạo một tài khoản mới vì chúng tôi cũng không biết
                            làm như thế nào</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#updatesp" aria-expanded="false" aria-controls="collapseThree">
                            <strong>[NHÀ CUNG CẤP] CẬP NHẬT SẢN PHẨM NHƯ THẾ NÀO? </strong>
                          </button>
                        </h2>
                      </div>
                      <div id="updatesp" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="accordion-body">
                          <strong>Cập nhật sản phẩm như sau: </strong><br />
                          <strong class="text-danger">Đầu tiên:</strong> Vào phần quản lý sản phẩm của bạn, sửa đổi các thông tin bạn muốn:<br />
                          <ul>
                            <li>Tên sản phẩm</li>
                            <li>Ảnh</li>
                            <li>Mô tả</li>
                            <li>Số lượng</li>
                            <li>Xuất xứ</li>
                            <li>Các thông tin khác</li>
                          </ul>
                          <strong class="text-danger">Sau đó:</strong> Nhấn cập nhật và kiểm tra lại thông tin đã được cập nhật chưa

                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#cungcap" aria-expanded="false" aria-controls="collapseThree">
                            <strong>[NHÀ CUNG CẤP] TÔI LÀM THẾ NÀO ĐỂ CÓ THỂ CUNG CẤP SẢN PHẨM? </strong>
                          </button>
                        </h2>
                      </div>
                      <div id="cungcap" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="accordion-body">
                          <strong>200OK chúng tôi chỉ hỗ trợ cho nhà cung cấp có địa chỉ tại Việt Nam. </strong><br />
                          <strong class="text-danger">Bước 1:</strong> Đăng ký tài khoản dành cho nhà cung cấp và đăng nhập:<br />
                          <ul>
                            <li>Họ và tên nhà cung cấp</li>
                            <li>Tên công ty hoặc cơ sở sản xuất</li>
                            <li>Số điện thoại</li>
                            <li>Facebook, Instagram, Website....</li>
                            <li>Số điện thoại</li>
                            <li>Địa chỉ</li>
                            <li>Các thông tin khác</li>
                          </ul>
                          <strong class="text-danger">Bước 2:</strong> Đăng bán các sản phẩm<br />
                          <ul>
                            <li>Tải lên hình ảnh sản phẩm (tối thiểu: 4 ảnh)</li>
                            <li>ID của sản phẩm</li>
                            <li>Tên sản phẩm</li>
                            <li>Mô tả sản phẩm</li>
                            <li>Tag</li>
                            <li>Số lượng</li>
                            <li>Giá sản phẩm</li>
                            <li>Xuất xứ</li>
                            <li>Nhãn hàng</li>
                            <li>Các thông tin khác...</li>
                          </ul>
                          <strong class="text-danger">Bước 3:</strong> Kiểm tra khi có đơn, xác nhận giao dịch
                          Sau khi xác nhận đơn hàng, nhà cung cấp sẽ không được hủy đơn
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div class="accordion" id="accordionExample">
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <strong>[CTV] LÝ DO BẠN NÊN ĐĂNG KÝ THÀNH CTV VỚI CHÚNG TÔI!!!</strong>
                        </button>
                      </h2>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>Nhà cung cấp của chúng tôi thường có những ưu đãi đặc biệt dành cho cộng tác viên</strong>
                        <ol>
                          <li>Giá rẻ hơn</li>
                          <li>Freeshipping</li>
                          <li>Quà tặng kèm</li>
                          <li>Không cần cọc tiền trước</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#lido" aria-expanded="true" aria-controls="collapseOne">
                          <strong>[CTV] LÝ DO BẠN NÊN ĐĂNG KÝ THÀNH CTV VỚI CHÚNG TÔI!!!</strong>
                        </button>
                      </h2>
                    </div>

                    <div id="lido" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>Nhà cung cấp của chúng tôi thường có những ưu đãi đặc biệt dành cho cộng tác viên</strong>
                        <ol>
                          <li>Giá rẻ hơn</li>
                          <li>Freeshipping</li>
                          <li>Quà tặng kèm</li>
                          <li>Không cần cọc tiền trước</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#dh" aria-expanded="true" aria-controls="collapseOne">
                          <strong>LÀM SAO ĐỂ CÓ THỂ MUA HÀNG/ĐẶT HÀNG</strong>
                        </button>
                      </h2>
                    </div>

                    <div id="dh" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>200OK chúng tôi chỉ hỗ trợ đặt và giao hàng cho những người mua có địa chỉ tại Việt Nam. </strong><br />
                        <strong class="text-danger">Bước 1:</strong>Tìm kiếm sản phẩm bạn cần bằng cách rõ vào thanh công cụ tìm kiếm hoặc
                        bạn có thể xem những món hàng bạn cảm thấy thích trên trang web của chúng tôi: <br />
                        <ul>
                          <li>Người bán</li>
                          <li>Tên sản phẩm</li>
                          <li>Mức giá</li>
                          <li>Đánh giá sản phẩm</li>
                          <li>Các thông tin khác của sản phẩm</li>
                        </ul>
                        <strong class="text-danger">Bước 2:</strong>Chọn sản phẩm, bạn có thể: <br />
                        <ul>
                          <li><span class="text-primary"> Thêm vào giỏ hàng</span> nếu bạn chưa muốn mua ngay để tìm thêm một số sản phẩm khác</li>
                          <li><span class="text-primary"> Mua hàng</span> nếu bạn muốn thanh toán nhanh chóng</li>
                        </ul>
                        <strong class="text-danger">Bước 3:</strong>Thêm thông tin người nhận và đặt hàng
                        <ul>
                          <li>Thêm tên người nhận</li>
                          <li>Địa chỉ</li>
                          <li>Số điện thoại</li>
                          <li>Ghi chú cho shipper</li>
                        </ul>
                        Sau khi hoàn thành nhấn <span class="text-primary">ĐẶT HÀNG</span>
                      </div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huy" aria-expanded="true" aria-controls="collapseOne">
                          <strong>CÓ THỂ HỦY SAU KHI ĐẶT HÀNG KHÔNG?</strong>
                        </button>
                      </h2>
                    </div>

                    <div id="huy" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong class="text-danger">1.Trước khi nhà cung cấp xác nhận đơn hàng</strong>
                        <ul>
                          Có thể hủy và bạn hãy nêu <span class="text-primary">lý do</span> hủy hàng:
                          <ul>
                            <li>Đổi địa chỉ giao </li>
                            <li>Đổi cách thức thanh toán</li>
                            <li>Tìm được nguồn hàng tốt hơn</li>
                            <li>Và những lý do khác...</li>
                          </ul>
                        </ul>
                        <strong class="text-danger">2.Sau khi nhà cung cấp xác nhận?</strong>
                        <ul>
                          Sau khi nhà cung cấp xác nhận bạn sẽ không thể hủy hàng
                        </ul>
                        <strong class="text-danger">3.Vậy còn cách khác để hủy hay không?</strong> <br />
                        <ul>
                          <strong>Câu trả lời là:</strong> có. Bạn có thể nhắn tin trực tiếp cho nhà cung cấp hoặc gọi cho họ,
                          yêu cầu dừng việc gửi hàng
                        </ul>
                      </div>
                    </div>
                  </div>


                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huy" aria-expanded="true" aria-controls="collapseOne">
                          <strong>TRẠNG THÁI ĐƠN HÀNG</strong>
                        </button>
                      </h2>
                    </div>

                    <div id="huy" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>Bạn có thể kiểm tra trạng thái đơn hàng trên ứng dụng tại mục Đơn hàng. Các trạng thái của đơn hàng gồm: </strong>
                        <ul>
                          <li><strong>Chờ xác nhận:</strong> đơn hàng đang trong giai đoạn xác nhận tính hợp lệ bởi hệ thống</li>
                          <li><strong>Chờ lấy hàng:</strong> đơn hàng đã được chuyển thông tin tới Người bán để giao cho đơn vị vận chuyển</li>
                          <li><strong>Đang giao: </strong>đơn hàng đang được giao tới Người mua</li>
                          <li><strong>Đánh giá:</strong> đơn hàng đang chờ được đánh giá sản phẩm</li>
                          <li><strong>Đã giao:</strong> đơn hàng đã được giao thành công tới Người mua</li>
                          <li><strong>Đã hủy:</strong> đơn hàng đã được hủy thành công</li>
                          <li><strong>Trả hàng:</strong> đơn hàng đã được trả hàng thành công</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huyd" aria-expanded="true" aria-controls="collapseOne">
                          <strong>[NHÀ CUNG CẤP] NHÀ CUNG CẤP CÓ HỦY ĐƯỢC ĐƠN HÀNG KHÔNG?</strong>
                        </button>
                      </h2>
                    </div>

                    <div id="huyd" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>Nhà cung cấp sẽ có quyền hủy đơn hàng trong 2 trường hợp sau:</strong><br />
                        <ul>
                          <strong><span class="text-danger">-Trường hợp 1:</span>  Không nhận được tiền cọc</strong><br />
                          <p>
                            Trong trường hợp này, nhà cung cấp lỡ xác nhận trước mà chưa thanh toán tiền cọc
                            thì nhà cung cấp có quyền hủy đơn
                          </p>
                          <strong> <span class="text-danger">-Trường hợp 2:</span> Sau khi xác nhận</strong><br />
                          <p>
                            Trong trường hợp này khách hàng muốn hủy nhưng bên nhà cung cấp đã xác nhận, khách hàng
                            nhắn tin cho bên nhà cung cấp ngỏ ý muốn hủy hàng, lúc này nhà cung cấp có thể hủy.
                          </p>
                        </ul>
                      </div>
                    </div>
                  </div>





                </div>
              </div>
              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huyd" aria-expanded="true" aria-controls="collapseOne">
                        <strong>LIÊN HỆ VỚI GIAO HÀNG ĐỂ KIỂM TRA TÌNH HÌNH ĐƠN HÀNG</strong>
                      </button>
                    </h2>
                  </div>

                  <div id="huyd" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="accordion-body">
                      <strong>Trường hợp này có hai cách giải quyết: </strong><br />
                      <ul>
                        <li> <strong class="text-danger">Cách 1:</strong> Liên lạc với bên nhà cung cấp để họ liên lạc cho bên
                          giao hàng</li>
                        <li> <strong class="text-danger">Cách 2:</strong> Liên lạc trực tiếp với bên giao hàng <br /></li>

                      </ul>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huyds" aria-expanded="true" aria-controls="collapseOne">
                        <strong>CÓ THỂ KIỂM TRA HÀNG TRƯỚC KHI NHẬN HAY KHÔNG</strong>
                      </button>
                    </h2>
                  </div>

                  <div id="huyds" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="accordion-body">

                      <strong class="text-danger">1.Hỏi nhà cung cấp trước nếu họ đồng ý thì họ sẽ báo với
                        đơn vị vận chuyển và bạn sẽ được kiểm tra trước khi nhận hàng
                      </strong><br />
                      <ul>
                        <li>Bên shipper sẽ bóc hàng cho bạn kiểm tra trước khi thanh toán</li>
                        <li>Nếu bạn hài lòng với sản phẩm thì bạn hãy nhận, còn nếu bạn không hài lòng có thể
                          trực tiếp hoàn trả hàng với điều kiện bạn phải thanh toán phí ship
                        </li>
                      </ul>

                      <strong class="text-danger">2.Bạn chưa hỏi nhà cung cấp trước khi vận chuyển </strong>
                      <ul>
                        <li>Người mua chỉ có thể kiểm tra các yếu tố bên ngoài của gói hàng như Thông tin mua hàng và tình
                          trạng gói bọc sản phẩm</li>
                        <li>Nếu phát hiện gói hàng có dấu hiệu bị móp méo, dập nát hoặc sai thông tin người nhận, Người
                          mua nên từ chối nhận hàng và thông báo ngay cho Nhà cung cấp</li>
                        <li>Người mua chỉ có thể mở gói hàng sau khi thanh toán đầy đủ cho nhân viên vận chuyển.</li>
                        <li>Khuyến khích Người mua chụp ảnh/quay phim rõ 6 mặt của gói hàng bên ngoài và bên trong, trước
                          và sau khi mở hàng để làm bằng chứng nếu có tranh chấp về sau.</li>
                        <li>Người mua chỉ có thể mở gói hàng sau khi thanh toán đầy đủ cho nhân viên vận chuyển. Trường
                          hợp hàng hóa có bất cứ vấn đề gì, vui lòng Bấm Trả hàng/Hoàn tiền trên ứng dụng hoặc Liên hệ
                          hotline để được hỗ trợ.</li>
                      </ul>
                    </div>
                  </div>
                </div>


                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huyda" aria-expanded="true" aria-controls="collapseOne">
                        <strong>TỔNG HỢP NHỮNG ĐƠN VỊ VẬN CHUYỂN</strong>
                      </button>
                    </h2>
                  </div>

                  <div id="huyda" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="accordion-body">
                      <strong>Đội ngũ vận chuyển chúng tôi hợp tác có mặt trên khắp Việt Nam </strong>
                      <ol>
                        <li><strong class="text-success">Giao hàng nhanh</strong></li>
                        <li><strong class="text-warning">Giao hàng tiết kiệm</strong> </li>
                        <li><strong class="text-danger">J&T Express</strong></li>
                        <li><strong class="text-primary">Viettel Post</strong></li>
                      </ol>
                    </div>
                  </div>
                </div>

              </div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">

                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huyd2" aria-expanded="true" aria-controls="collapseOne">
                        <strong>ĐIỀU KIỆN HOÀN TRẢ TIỀN VÀ HÀNG!</strong>
                      </button>
                    </h2>
                  </div>

                  <div id="huyd2" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="accordion-body">
                      <strong class="text-danger">1. Thời gian yêu cầu trả hàng/hoàn tiền </strong><br />
                      <ul>
                        Bạn có thể gửi yêu cầu Trả hàng/Hoàn tiền trong vòng 7 ngày kể từ lúc đơn hàng được cập nhật giao
                        hàng thành công
                      </ul>
                      <strong class="text-danger">2. Lý do trả hàng/hoàn tiền</strong><br />
                      <ul>
                        <strong>Bạn có thể yêu cầu Trả hàng/Hoàn tiền trong các trường hợp sau:</strong>
                        <li>Hàng nhận được bị thiếu/sai/bể vỡ/không hoạt động/khác mô tả/đã qua sử dụng/giả nhái</li>
                        <li>Chưa nhận được hàng nhưng Shipper đã cập nhập giao hàng thành công</li>
                        <li>Chưa nhận được hàng sau thời gian giao hàng dự kiến</li>
                      </ul>
                      <strong class="text-danger">3. Bằng chứng cần cung cấp</strong><br />
                      <ul>
                        <strong>Bạn cần cung cấp hình ảnh và/hoặc video thể hiện rõ tình trạng sản phẩm nhận được </strong>
                        <br />
                        <strong>Nhà cung cấp có thể yêu cầu bổ sung bằng chứng nếu:</strong>
                        <ul>
                          <li>Bằng chứng bạn cung cấp bị mờ, nhòe, không thể hiện được tình trạng sản phẩm nhận được,...)
                          </li>
                          <li>Người bán khiếu nại yêu cầu của bạn và Shopee cần thêm bằng chứng để xem xét</li>
                        </ul>
                      </ul>
                      <strong class="text-danger">4. Tình trạng của hàng trả lại</strong><br />
                      <strong>Sau khi đã gửi yêu cầu Trả hàng/Hoàn tiền, nếu Nhà cung cấp đồng ý cho bạn trả hàng, bạn cần
                        gửi trả hàng
                        về cho Nhà cung cấp theo hướng dẫn qua email hoặc thông tin trên ứng dụng</strong>
                      <strong>Lưu ý:</strong>
                      <ul>
                        <li>Đóng gói lại như lúc giao hàng</li>
                        <li>Gửi trả toàn bộ sản phẩm (bao gồm tất cả phụ kiện đi kèm, hóa đơn VAT, tem phiếu bảo hành... nếu
                          có) </li>
                        <li>Sản phẩm gửi trả phải trong tình trạng như khi nhận hàng</li>
                      </ul>
                      <strong>Khuyến khích bạn chuẩn bị thêm các bằng chứng sau để làm bằng chứng đối chiếu/khiếu nại về sau
                        nếu cần:</strong>
                      <ul>
                        <li>Bằng chứng giao/nhận hàng với đầy đủ các thông tin: đơn vị vận chuyển, mã vận đơn, tên Người
                          gửi/Người nhận,
                          số điện thoại liên hệ và địa chỉ giao hàng.</li>
                        <li>Video clip quay lại quá trình đóng gói hàng gửi trả</li>
                        <li>Các bằng chứng khác thể hiện thỏa thuận gửi trả hàng giữa bạn và Nhà cung cấp.</li>
                      </ul>
                      <strong class="text-danger">5. Phí trả hàng</strong><br />
                      <ul>
                        <li>Nếu bạn chọn lấy hàng hoàn trả tại nhà/trả hàng tại bưu cục với J&T Express ngay trên ứng dụng
                          Shopee: bạn được miễn phí trả hàng</li>
                        <li>
                          Nếu bạn chọn Tự sắp xếp trả hàng: Bạn cần trả trước phí trả hàng cho đơn vị vận chuyển, sau đó
                          điền thông tin trả hàng lên ứng dụng, bao gồm: tên đơn vị vận chuyển,
                          mã vận đơn, hình ảnh biên nhận đã gửi trả hàng
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>



              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#huyd2" aria-expanded="true" aria-controls="collapseOne">
                      <strong>[NHÀ CUNG CẤP] BAO LÂU THÌ HÀNG HOÀN TRẺ SẼ VỀ?</strong>
                    </button>
                  </h2>
                </div>

                <div id="huyd2" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class="accordion-body">
                    <ul>
                      <li>Hàng sẽ được chuyển hoàn về trong vòng từ 07 đến 10 ngày làm việc kể từ khi Đơn vị vận chuyển
                        ghi nhận hàng hoàn về cho Nhà cung cấp.
                        Sau 10 ngày làm việc vẫn chưa nhận được hàng hoàn, Nhà cung cấp vui lòng liên hệ Nhân viên CSKH để
                        được hỗ trợ. </li>
                      <li>Trong trường hợp hàng hoàn trả về không còn nguyên vẹn. Người bán vui lòng điền yêu cầu Khiếu
                        nại vận chuyển về tình
                        trạng hàng hoàn bị hư hỏng/bể vỡ trong vòng 3 ngày kể từ khi nhận lại hàng hoàn, sẽ tiếp nhận và
                        tiến hành xử lý trong vòng 3-5 ngày làm việc.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>

    </>
  );
}

export default Hdsd;