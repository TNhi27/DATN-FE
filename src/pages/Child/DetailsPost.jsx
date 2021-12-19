import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { timeToString } from '../../lib/TimeCover';
import { getPostById } from '../../service/_postservice';
import "./news.scss";

function DetailsPost(props) {
    const id = useParams().id;
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    const [post,setPost ]= useState({
        title:'',
        content:"",
        createdate:"",
        acc_post:{
            username:""
        }
    })

    useEffect(()=>{
        getPostById(id).then((res)=>{
            setPost(res.data)
        })
    },[])
    return (
        <div className="detail-new">
            <img width="100%" height="400px" src={post.image} alt="" />
            <br /> <br />
            <h3 style={{color:"#6E3CBC",fontSize:'30px',fontWeight:'bold'}}>{post.title}</h3>
            <p><i>Ngày đăng: {timeToString(post.createdate)} | {post.acc_post.username}</i></p>
            <br />
            <div className="content"  dangerouslySetInnerHTML={{ __html: post.content }}>
               
            </div>
        </div>
    );
}

export default DetailsPost;