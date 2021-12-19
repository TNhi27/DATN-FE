import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { formatMoney } from "../../lib/FormatMoney";
import { getReportByDay } from "../../service/_ordersService";
import "./Dashboard_ctv.scss";

function Dashboard_ctv(props) {
  useEffect(()=>{
    window.scrollTo(0, 0)
},[])

  const [report, setReport] = useState({});

  const [tk, setTk] = useState([]);
  const [listOrder, setListOrder] = useState([])
  const [doanhthu,setDoanhthu] = useState(0);
  const [rp_year,setRp_Year] = useState([
    {m:1,value:0},{m:2,value:0},
    {m:3,value:0},{m:4,value:0},
    {m:5,value:0},{m:6,value:0},
    {m:7,value:0},{m:8,value:0},
    {m:8,value:0},{m:10,value:0},
    {m:11,value:0},{m:12,value:0},
  ])


  const user = useSelector(state => state.login);

  useEffect(() => {
    const date = new Date();

   
    getReportByDay(date.getDate(), date.getMonth() + 1, date.getFullYear()).then((res) => {
      setReport(res.data);
      setListOrder(res.data.list_orders)
    

      const dt= res.data.list_report.filter((e)=>e.id===date.getMonth()+1);
     
      setDoanhthu(dt[0]===undefined?0:dt[0].total)

     
     let l = []

      for (let i = 0; i < rp_year.length; i++) {
        res.data.list_report.map((rp)=>{
           if (rp.id===rp_year[i].m) {
             l.push({m:rp.id,value:rp.total})
           }else{
             l.push(rp_year[i])
           }
        })
        
      }

      setRp_Year(l)
    })

  }, [])

 


  

  return (
    <div className="dashboard">
      <div className="coldash">
        <div className="summary">

          <div className="summary-header">
            <h5>Tổng quan trong ngày</h5>
          </div>
          <div className="summary-body">
            <div className="sum-row">
              <img src="./images/icon/money-bag.png" alt="" />
              <div>
                <span>Doanh thu trong ngày</span> <br />
                <p className="note-das">*Tạm tính (bao gồm đơn chờ xác nhận)</p>
                <p>{formatMoney(report.total_d || 0)}</p>
              </div>
            </div>
            <div className="sum-row">
              <img src="./images/icon/shopping-cart.png" alt="" />
              <div>
                <span>Sản phẩm bán được</span>
                <p>{report.count_products_d || 0}</p>
              </div>
            </div>
            <div className="sum-row">
              <img src="./images/icon/box.png" alt="" />
              <div>
                <span>Đơn hàng đã tạo</span>
                <p>{report.count_order_d}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="summary-header">
            <h5>Đơn hàng</h5>
            <Link to="/congtacvien/orders"> <i class="fas fa-angle-right"></i></Link>
           
          </div>
          <div className="summary-body">
            <div className="sum-col">
              <div className="sum-box">
                <img src="./images/icon/choxac.png" alt="" />
                <span>Chờ xác nhận</span>

                <p>{report.count_order0 || 0}</p>
              </div>
              <div className="sum-box">
                <img src="./images/icon/motorbike.png" alt="" />
                <span>Đang giao</span>
                <p>{report.count_order2 || 0}</p>
              </div>
            </div>
            <div className="sum-col">
              <div className="sum-box">
                <img src="./images/icon/trave.png" alt="" />
                <span>Trả về</span>
                <p>{report.count_order3 || 0}</p>
              </div>
              <div className="sum-box">
                <img src="./images/icon/bihuy.png" alt="" />
                <span>Bị hủy</span>
                <p>{report.count_order4 || 0}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="summary-header">
            <h5>Số dư tài khoản </h5>
            <i class="fas fa-angle-right"></i>
          </div>
          <div className="summary-body">
            <div className="card">
              <h5><i class="fas fa-wallet text-warning"></i> Tài khoản chính</h5>
              <span>

                {formatMoney(report.money || 0)}
              </span>
              <div className="help">
                *Có thể rút tiền về tài khoản ngân hàng
              </div>
              <div className="card-bot">
                <Link to="/payment/n" >
                  Nạp tiền <i class="fas fa-angle-right"></i>
                </Link>
                <Link to="/payment/r">
                  Rút tiền <i class="fas fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="summary">
          <div className="summary-header">
            <h5>Thông tin liên quan</h5>
          </div>
          <div className="summary-body">
            <div className="row tong-row">

              <div className="col tong-col">
                <div className="tong-header">
                  <img src="./images/icon/box.png" alt="" />
                  <span>Đơn hàng</span>

                  <p>{report.count_orders}</p>
                </div>
                <div className="tong-body">
                  <span>Đơn hàng giá trị cao nhất</span>
                  <ul>
                    {
                      listOrder.map((e) => {
                        return (
                          <li>
                            {" "}
                            <img src="./images/icon/gold-medal.png" alt="" />
                            <b>[DH-{e.idorder}]</b> Tổng tiền :{formatMoney(e.total || 0)}
                          </li>
                        )
                      })
                    }
                    {/* <li>
                      {" "}
                      <img src="./images/icon/gold-medal.png" alt="" />
                      <b>[DH-{listOrder[0].idorder}]</b> Tổng tiền :{formatMoney(listOrder[0].total||0)}
                    </li>
                    <li>
                      {" "}
                      <img src="./images/icon/bac.png" alt="" />
                      <b>[DH-{listOrder[1].idorder}]</b> Tổng tiền :{formatMoney(listOrder[1].total)}
                    </li>
                    <li>
                      {" "}
                      <img src="./images/icon/dong.png" alt="" />
                      <b>[DH-{listOrder[2].idorder}]</b> Tổng tiền :{formatMoney(listOrder[2].total)}
                    </li> */}
                  </ul>
                  <div className="card-bot">
                    <Link to="/congtacvien/orders">
                      Xem thêm <i class="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col tong-col">
                <div className="tong-header">
                  <img src="./images/icon/pie-chart.png" alt="" />
                  <span>Doanh thu tháng này</span>
                  <p>
                    {formatMoney(doanhthu)}
                  </p>
                </div>
                <div className="chart">
                  <Bar
                    data={{
                      labels: rp_year.map((e)=>e.m),
                      
                      datasets: [
                        {
                          label: "Doanh thu thang",
                          backgroundColor: [
                            "#3e95cd"
                            // "#8e5ea2",
                            // "#3cba9f",
                            // "#e8c3b9",
                            // "#c45850"
                          ],
                          data: rp_year.map((e)=>e.value)
                        }
                      ]
                    }}
                    options={{
                      legend: { display: false },
                      title: {
                        display: true,
                        text: "Predicted world population (millions) in 2050"
                      }
                      
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard_ctv;
