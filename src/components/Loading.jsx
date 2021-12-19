import React from 'react';

function Loading(props) {
    return (
        <div style={{display:'flex',flexDirection:'column  ',justifyContent:'center',alignItems:'center',height:"100vh"}}>
            <img src="../logo.png" alt="" width="300px" />
            <h3>WELCOME TO OKTEAM</h3>
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Loading;