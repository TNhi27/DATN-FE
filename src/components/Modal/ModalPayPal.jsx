import React from 'react';
import { Button,Modal } from 'react-bootstrap';

function ModalPayPal(props) {
    
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Nạp tiền
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
            <div className="row">
                    <div class="form-group col">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    <div class="form-group col">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                   
                  
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPayPal;