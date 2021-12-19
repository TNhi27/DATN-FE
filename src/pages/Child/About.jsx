import React,{useEffect} from 'react';


function About(props) {
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    return (
        <div>
            <header class="masthead">
                <div class="container">
                    <div class="masthead-subheading">Welcome To Ok200!</div>
                    <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                   
                </div>
            </header>

            <section class="page-section" id="about">
                    <div class="container">
                        <div class="text-center">
                            <h2 class="section-heading text-uppercase">Thông Tin</h2>
                            <h3 class="section-subheading text-muted">về chúng tôi..</h3>
                        </div>
                        <ul class="timeline">
                            <li>
                                <div class="timeline-image"><img class="rounded-circle img-fluid" src="../assets/img/1.jpg" alt="..." /></div>
                                <div class="timeline-panel">
                                    <div class="timeline-heading">
                                        <h4></h4>
                                        <h4 class="subheading">Chúng tôi là ai?</h4>
                                    </div>
                                    <div class="timeline-body"><p class="text-muted">Chúng tôi là sinh viên của cao đẳng FPT POLYTECHNIC!</p></div>
                                </div>
                            </li>
                            <li class="timeline-inverted">
                                <div class="timeline-image"><img class="rounded-circle img-fluid" src="../assets/img/2.jpg" alt="..." /></div>
                                <div class="timeline-panel">
                                    <div class="timeline-heading">
                                        <h4></h4>
                                        <h4 class="subheading">Đây là gì?</h4>
                                    </div>
                                    <div class="timeline-body"><p class="text-muted">Đây là dự án tốt nghiệp của nhóm,dự án là môt trang web dựa trên hình thức kinh doanh Drop shipping</p></div>
                                </div>
                            </li>
                            <li>
                                <div class="timeline-image"><img class="rounded-circle img-fluid" src="../assets/img/3.png" alt="..." /></div>
                                <div class="timeline-panel">
                                    <div class="timeline-heading">
                                        <h4></h4>
                                        <h4 class="subheading">Trang web này giúp ích gì cho mọi người?</h4>
                                    </div>
                                    <div class="timeline-body"><p class="text-muted">Như đã giới thiệu,Drop shipping là một hình thức kinh doanh bán lẻ, trong đó người bán chấp nhận đơn đặt hàng của khách hàng nhưng không giữ hàng hóa đã bán trong kho</p></div>
                                </div>
                            </li>
                            <li class="timeline-inverted">
                                <div class="timeline-image"><img class="rounded-circle img-fluid" src="../assets/img/4.jpg" alt="..." /></div>
                                <div class="timeline-panel">
                                    <div class="timeline-heading">
                                        <h4></h4>
                                        <h4 class="subheading">Trang web này có thể bán những gì?</h4>
                                    </div>
                                    <div class="timeline-body"><p class="text-muted">Tất cả mọi thứ! Nếu vật phẩm bạn bán chưa nằm trong bất kì danh mục nào của chúng tôi?Không sao,bạn có thể thêm cả danh mục bán hàng!</p></div>
                                </div>
                            </li>
                            <li class="timeline-inverted">
                                <div class="timeline-image">
                                    <h4>
                                        Đó là
                                        <br />
                                        vài điều cơ bản
                                        <br />
                                        về chúng tôi!
                                    </h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="page-section bg-light" id="team">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Các Thành Viên</h2>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src="" alt="..." />
                            <h4>Lưu Trường Tá</h4>
                            
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src="" alt="..." />
                            <h4>Lưu Thị Kim Thoa</h4>
                            
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src="" alt="..." />
                            <h4>Trần Phước Định</h4>
                            
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                
                <div  class="row">
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src="" alt="..." />
                            <h4>Phan Thế Nghĩa</h4>
                            
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="team-member">
                            <img class="mx-auto rounded-circle" src="" alt="..." />
                            <h4>Nguyễn Trần Tiến Trung</h4>
                            
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="page-section" id="contact">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Liên hệ với chúng tôi</h2>
                </div>
                
                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                    <div class="row align-items-stretch mb-5">
                        <div class="col-md-6">
                            <div class="form-group">
                               
                                <input class="form-control" id="name" type="text" placeholder="Your Name *" data-sb-validations="required" />
                                <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            <div class="form-group">
                               
                                <input class="form-control" id="email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
                                <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            <div class="form-group mb-md-0">
                              
                                <input class="form-control" id="phone" type="tel" placeholder="Your Phone *" data-sb-validations="required" />
                                <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group form-group-textarea mb-md-0">
                               
                                <textarea class="form-control" id="message" placeholder="Your Message *" data-sb-validations="required"></textarea>
                                <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                        </div>
                    </div>
                   
                    <div class="d-none" id="submitSuccessMessage">
                        
                    </div>

                    <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Có Lỗi!</div></div>
                   
                    <div class="text-center"><button class="btn btn-primary btn-xl text-uppercase disabled" id="submitButton" type="submit">Gửi Tin Nhắn</button></div>
                </form>
            </div>
        </section>


        </div>
    );
}

export default About;