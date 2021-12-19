import React, { useRef } from 'react';
import { Button,Modal } from 'react-bootstrap';
import img from "../../assets/img/wel.png"
import "./model.css"

function Welcome(props) {
    const wel = useRef();
    const closeWel =()=>{
        wel.current.style.display="none"
    }
    
    return (
        
        // <Modal
        //     {...props}
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
            
        // >
        //       <Modal.Header  closeButton>
               
        //     </Modal.Header>
        //    <img style={{transform:'translateY(-2px)'}} src={wel} alt="" />
        // </Modal>

        <div ref={wel} id="myModal" class="modalwel">
      
        <div class="modal-contentw">
        <span onClick={()=>closeWel()} class="close">&times;</span>
        <img style={{transform:'translateY(-2px)'}} src={img} alt="" />
        </div>
    </div>
    );
}

export default Welcome;