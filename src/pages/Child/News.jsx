import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { getThongBao } from '../../firebase/service';
import { timeStampToStringFormat, timeToString } from '../../lib/TimeCover';
import { getPostList } from '../../service/_postservice';
import "./news.scss";


function News(props) {
    const [totalPage,setTotalPage] =useState(0);
    const [filter,setFilter] = useState({
        page:0,
        size:8,
        title:""
    })
    const gotoPage=(page)=>{
        setFilter({...filter,page:page})
       }

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const [post, setPost] = useState([])

    const handleSearch =(e)=>{
       
        if (e.key === "Enter") {
            setFilter({...filter,title:e.target.value,page:0})
        }
    }

    useEffect(() => {
        getPostList(filter).then((res) => {
           
            setPost(res.data.content);
            setTotalPage(res.data.totalPages)
        })
      
    }, [filter])
    return (
        <div className="news">
             
            <header className="masthead3">
                <div className="container">
                    <div class="masthead-subheading">Welcome To Ok200!</div>
                    <div class="masthead-heading text-uppercase">Tin tức</div> <br />

                </div>
            </header>

            <div className="container">
                 <div className="row">
                 <div className="search col-4">
                       <input onKeyDown={(e)=>handleSearch(e)} type="text" placeholder='Tìm kiếm' />
                   </div>
                 </div>

                <div className="row">
                    {
                        post.map((e) => {
                            return (
                                <div className="col-sm-6 col-md-3 new">
                                    <Link to={`/news/${e.idpost}`} className="child">
                                       <div className="hinh">
                                       <img src={e.image} alt="" />
                                       </div>
                                        <div className="info">
                                            <span>{e.title}</span>
                                            <span className='sub'>{timeToString(e.createdate)} | {e.acc_post.fullname}</span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }

                </div>
               
            </div>
           <Pagination totalPage={totalPage} onClick={gotoPage} currentPage={filter.page} />
          

        </div>
    );
}

export default News;