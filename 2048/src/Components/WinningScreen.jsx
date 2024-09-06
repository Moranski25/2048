import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import 'reactjs-popup/dist/index.css'

const WinningScreen = ({open, result}) =>{
    return(
        <Popup open={open}>
            <div>
            {result? <a>You won</a>: <a>You lost</a>}
            </div>
        </Popup>
    )
}

WinningScreen.propTypes = {
    open: PropTypes.bool.isRequired, 
    result: PropTypes.bool.isRequired,
}
export default WinningScreen; 