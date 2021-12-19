import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';
import { doComment } from '../service/_commentService';

const CommentComponent = (props) => {
    const { product,idod } = props;

    const user = useSelector(state => state.login);

    const [comment, setComment] = useState({

        star: 5,
        content: "",
        products: product.idpro,
        username: user.username,
        idorder:idod
    })

    const hanldComment =()=>{
        doComment(comment).then((res)=>{
            alert("Đã đánh giá sản phẩm :"+product.idpro)
        }).catch((r)=>{
            alert("Lỗi không xác định !")
        })

       
       
    }

    return (
        <div>


            <div className="form-group row" >

                <div className="star col">
                    <p>{product.name}</p>
                    <img src={product.image0} alt="" />
                </div>
                <div className="star col">
                    <Rating
                        value={comment.star}
                        onChange={(evt, newValue) => setComment({ ...comment, star: newValue })}

                    />
                    <textarea value={comment.content} onChange={(e) => setComment({ ...comment, content: e.target.value })} className="form-control col" rows="2"></textarea>
                    <a onClick={()=>hanldComment()} style={{display:'block',textAlign:'right',textDecoration:'none',color:'black'}}> Send</a>
                </div>

            </div>
           

        </div>
    );
};

export default CommentComponent;