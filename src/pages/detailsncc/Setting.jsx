import React, { useEffect } from 'react';
import DangKiGhn from '../ghn/DangKiGhn';
import Account from './Account';
import "./Setting.scss";
import ThanhToan from './ThanhToan';
import ThuongHieu from './ThuongHieu';


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
                            <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fab fa-modx"></i> Thương Hiệu</a>
                            <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fab fa-cc-amazon-pay"></i> Hình thức thanh toán</a>
                            <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fas fa-user-alt"></i> Tài khoản cá nhân</a>
                            <a class="nav-link" id="v-pills-ghn-tab" data-toggle="pill" href="#v-pills-ghn" role="tab" aria-controls="v-pills-ghn" aria-selected="false"><i class="fas fa-user-alt"></i> Don Vi giao hang</a>

                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                <ThuongHieu />
                            </div>
                            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <ThanhToan />
                            </div>
                            <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">

                                <Account />
                            </div>
                            <div class="tab-pane fade" id="v-pills-ghn" role="tabpanel" aria-labelledby="v-pills-ghn-tab">

                                <DangKiGhn />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;