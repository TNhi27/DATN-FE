import React, { useState } from 'react';
import clsx from 'clsx';
//for me
import style from './OrdersSuccess.module.scss'
import CommentComponent from '../../components/CommentComponent';

function ListProductsCmt(props) {

    const { details,order } = props
  
    

    const handlCmt = async (e)=>{
        
    }
    return (
        <div class={clsx(style.cmt)}>
            <table class="table">
                <thead>

                </thead>
                <tbody>
                    {
                        details.map((sp) => {
                            return (
                                <>
                                    <CommentComponent idod={order.idorder} product={sp.products}/>
                                </>
                            )
                        })
                    }


                </tbody>
            </table>
          
        </div>
    );
}

export default ListProductsCmt;