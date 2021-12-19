import React from 'react';
import Product from './Product';

function ListProductsOfNcc(props) {
    let list = [];
    if (props.ncc.products.length >= 10) {
        for (let index = 0; index < 10; index++) {
            list.push(<Product product={props.ncc.products[index]} />)
        }
    }else{
        for (let index = 0; index <props.ncc.products.length ; index++) {
            list.push(<Product product={props.ncc.products[index]} />)
        }
    }
    return (
       
        list
    );
}

export default ListProductsOfNcc;