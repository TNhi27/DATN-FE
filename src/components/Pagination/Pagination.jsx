import React from 'react';
import "./style.scss"

function Pagination(props) {
  let {totalPage,onClick,currentPage} =props;

  const handlePage=(page)=>{
    onClick(page)
    
  }

  let row =[];
  for (let i = 0; i < totalPage; i++) {
   row.push(<li onClick={()=>handlePage(i)} class={`page-item ${currentPage===i? "active":""}`}><a class="page-link" href="#">{i+1}</a></li>)
    
  }
    return (
        <nav  aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          {/* <li class="page-item">
            <a class="page-link">Previous</a>
          </li> */}
         {
           row
         }
          {/* <li class="page-item">
            <a onClick={()=>handlePage(2)} class="page-link" href="#">Next</a>
          </li> */}
        </ul>
      </nav>
    );
}

export default Pagination;