import React from "react";
import "./Spinner.scss";

const Spinner = ({ initial }) => {
    return (
        <div className={`loadingSpinner ${initial ? "initial" : ""}`}>
            <span className="loader"></span>
        </div>
    );
};

export default Spinner;