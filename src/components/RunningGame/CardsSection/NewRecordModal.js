import React, { Component } from 'react';

import './NewRecordModal.scss'

class NewRecordModal extends Component {

    componentDidMount(){
        const { closeRecoredModal } = this.props;
        setTimeout(() => {
            closeRecoredModal()
        }, 2000);
    }

    render(){
        const { totalSum } = this.props;

        return(
            <div className="newRecordModal">
                <h1>New High Score!!</h1>
                <h3>{`$${totalSum}`}</h3>
            </div>
        )
    }
}

export default NewRecordModal;