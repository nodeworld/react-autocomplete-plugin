import React from "react"
import { assignClass } from "../../util/helpers/classes";

type InputLabelType = {
    inputLabelClass?: string;
    inputLabelStyle?: React.CSSProperties;
    ariaInputLabel?: string;
    inputLabel?: string;
}


function InputLabel(props: InputLabelType) {

    const ariaInputLabel = props.ariaInputLabel ? props.ariaInputLabel : 'Autocomplete input label';

    const inputLabelStyle = props.inputLabelStyle ? props.inputLabelStyle : {};

    const inputLabelClass = props.inputLabelClass ? props.inputLabelClass : '';

    const inputLabel = props.inputLabel ? props.inputLabel : 'Select or search item.';

    return (
        <React.Fragment>
            <label
                aria-label={ariaInputLabel}
                className={assignClass('label-value', inputLabelClass!)}
                htmlFor="searchInput"
                style={inputLabelStyle}>
                {inputLabel}
            </label>
        </React.Fragment>
    )
}
export default InputLabel;