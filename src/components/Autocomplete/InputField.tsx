import React, { CSSProperties, FocusEventHandler, FormEventHandler, MouseEventHandler, Ref } from "react";
import { assignClass } from "../../util/helpers/classes";

type InputType = {
    handleOnFocusEvent: FocusEventHandler;
    handleOnBlurEvent: FocusEventHandler;
    onSearch: FormEventHandler;
    inputFieldClass?: string;
    inputFieldStyle?: CSSProperties;
    placeHolder?: string;
    isAutoCompleteDisabled?: boolean;
    ariaRole?: string;
    ariaRoleDescription?: string;
    ariaInputField?: string;
    showdropDownArrow?: boolean;
    showClearOption?: boolean;
    handleDropdownClick: MouseEventHandler;
    clearSearch: MouseEventHandler;
}
 
function Input(props: InputType, ref: Ref<HTMLInputElement>) {

    const showdropDownArrow = (props.showdropDownArrow !== undefined && props.showdropDownArrow !== null) ? props.showdropDownArrow : true;

    const showClearOption = (props.showClearOption !== undefined && props.showClearOption !== null) ? props.showClearOption : true;

    const placeholder = props.placeHolder ? props.placeHolder : 'Type or select..';

    return (
        <React.Fragment>
                <input
                onFocus={props.handleOnFocusEvent}
                onBlur={props.handleOnBlurEvent}
                onInput={props.onSearch}
                id="searchInput"
                className={assignClass('auto-complete-textfield', props.inputFieldClass)}
                style={props.inputFieldStyle}
                ref={ref}
                placeholder={placeholder}
                type="text" autoComplete="off"
                disabled={!props.isAutoCompleteDisabled ? false : true}
                role={props?.ariaRole ? props.ariaRole : 'textbox'}
                aria-roledescription={props?.ariaRoleDescription ? props.ariaRoleDescription : 'Autocomplete input field'}
                aria-label={props?.ariaInputField ? props.ariaInputField : 'Autocomplete input field'}
            />
            {
                showdropDownArrow && <span tabIndex={0} className="arrow down" onClick={props.handleDropdownClick}></span>
            }
            {
                showClearOption && <span className="auto-complete-remove-selection" onClick={props.clearSearch}>&times;</span>
            }
        </React.Fragment>
    )
}

export default React.forwardRef<HTMLInputElement, InputType>(Input);