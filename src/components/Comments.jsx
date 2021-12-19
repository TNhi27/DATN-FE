import React from 'react';

function Comments(props) {
    let star=[];
    for (let index = 0; index < props.cmt.star; index++) {
       star.push( <i style={{color:'yellow'}}  className="fas fa-star" />)
    }
    return (
        <div className="cmt">
            <div className="cmt-top">
                <img
                   src={props.cmt.ctv_cmt.image}
                    alt=""
                />
                <b>{props.cmt.ctv_cmt.username}</b>
                <p>{props.createdate}</p>
            </div>
            <div className="cmt-body">
                <div>
                   {star}
                </div>
                <p>{props.cmt.content}</p>
            </div>
        </div>

    );
}

export default Comments;