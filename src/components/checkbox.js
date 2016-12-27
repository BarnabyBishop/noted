import React from 'react';

// https://webdesign.tutsplus.com/articles/quick-tip-easy-css3-checkboxes-and-radio-buttons--webdesign-8953

export default function Checkbox({ htmlId, checked, onChange}) {
    return (
        <div className="list-checkbox-wrapper">
            <input type="checkbox" id={htmlId} className="list-checkbox-input" checked={checked} onChange={onChange} />
            <label className="list-checkbox" htmlFor={htmlId}></label>
        </div>
    );
}