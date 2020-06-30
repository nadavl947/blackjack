import React from 'react';

import './SelectedCards.scss'

const selectedCards = props => {
    const { card } = props;
    const { image } = card;

    return(
        <img src={image} alt="/" />
    )
}

export default selectedCards;