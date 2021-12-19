import React, { useEffect } from 'react';
import Account from './Account';
import Password from './Password';
import "./Setting.scss";
import ThanhToan from './ThanhToan';



function Setting(props) {

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    return (
        <div className='setting'>
            <div className="st-top">
                <h5>Setting</h5>
            </div>
            <div className="st-body">
                <div class="row">
                    <div class="col-sm-12 col-md-3">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fab fa-modx"></i>Tài khoản</a>
                            <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fab fa-cc-amazon-pay"></i> Hình thức thanh toán</a>
                            <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fas fa-user-alt"></i> Mật khẩu</a>
                          

                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9">
                    <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <Account />
                            </div>
                            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <ThanhToan />
                            </div>
                            <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">

                                <Password />
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;