import React from 'react';
import './style.scss';

const MyRadioLabelCard = ({ text, Icon }) => {
    return (
        <div className="card">
            <Icon/>
            <span>
                {text}
            </span>
        </div>
    );
};

export default MyRadioLabelCard;
