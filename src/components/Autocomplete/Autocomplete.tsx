import { useRef } from "react";
import { CustomAriaType, CustomClassType, CustomNgStyleType } from "../../util/types/types";
import InputLabel from "./InputLabel";
import Core from "./Core";
import './Autocomplete.css';

export type AutoCompleteProps = {
    dropdownData: any[];
    objectProperty?: string;
    initialVisibleData?: number;
    scrollThreshold?: number;
    inspectAutoCompleteList?: boolean;
    placeHolder?: string;
    showdropDownArrow?: boolean;
    showClearOption?: boolean;
    defaultValue?: any;
    noSearchResultMessage?: string;
    totalRecords?: number;
    disableProperty?: string;
    disableListFn?: Function | undefined;
    customClass?: CustomClassType;
    isAutoCompleteDisabled?: boolean;
    customStyle?: CustomNgStyleType;
    triggerBlurEvent?: Function | undefined; // function will accept event, data as parameters.
    triggerOnFocusEvent?: Function | undefined;
    broadcastSelectedValue?: Function | undefined;
    triggerClearSelectionEvent?: Function | undefined;
    triggerApiLoadEvent?: Function | undefined;
    isScrollThresholdRequired?: boolean;
    showLoadingSpinner?: boolean;
    isCustomSpinner?: boolean;
    inputLabel?: string;
    showInputlabel?: boolean;
    aria?: CustomAriaType;
    isApiLoad?: boolean;
}

function Autocomplete(props: AutoCompleteProps) {


    const autoCompleteContainerRef = useRef<HTMLInputElement>(null)

    const customClass = props.customClass ? props.customClass : {};

    const customStyle = props.customStyle ? props.customStyle : {};

    const assignClass = (classTobeMandatory?: string, classes?: string) => {
        if (!classTobeMandatory && !classes) { return; }
        let templateClass = classTobeMandatory ? classTobeMandatory : '';
        const splitCustomClasses = classes?.split(' ');
        if (!splitCustomClasses) { return templateClass; }
        for (const customClass of splitCustomClasses) {
            templateClass = templateClass + ' ' + customClass;
        }
        return templateClass;
    };

    return (
        <div
            className={assignClass('auto-complete-textfield-container', customClass.parentContainerClass)} ref={autoCompleteContainerRef}
            style={customStyle.parentContainerStyle ? customStyle.parentContainerStyle : {}}>
            {
                props.showInputlabel && <div
                className={assignClass('label-container', customClass.inputLabelContainerClass)}
                style={customStyle.inputLabelContainerStyle ? customStyle.inputLabelContainerStyle : {}}>
                <InputLabel
                    inputLabel={props.inputLabel}
                    ariaInputLabel={props.aria?.ariaInputLabel}
                    key={'label-key'}
                    inputLabelClass={props.customClass?.inputLabelClass}
                    inputLabelStyle={props.customStyle?.inputLabelStyle} />
            </div>
            }
            {/* <div className={assignClass('field-container', customClass.inputFieldContainerClass)}> */}
                <Core
                    dropdownData={props.dropdownData}
                    objectProperty={props.objectProperty}
                    initialVisibleData={props.initialVisibleData}
                    key={'input-field'}
                    placeHolder={props.placeHolder}
                    inputFieldClass={props.customClass?.inputFieldClass}
                    inputFieldStyle={props.customStyle?.inputFieldStyle}
                    isAutoCompleteDisabled={props.isAutoCompleteDisabled}
                    ariaInputField={props.aria?.ariaInputField}
                    ariaRole={props.aria?.ariaRole}
                    ariaRoleDescription={props.aria?.ariaRoleDescription}
                    showClearOption={props.showClearOption}
                    showdropDownArrow={props.showdropDownArrow}
                    inspectAutoCompleteList={props.inspectAutoCompleteList}
                    broadcastSelectedValue={props.broadcastSelectedValue}
                    disableListFn={props.disableListFn}
                    disableProperty={props.disableProperty}
                    triggerClearSelectionEvent={props.triggerClearSelectionEvent}
                    customStyle={props.customStyle}
                    aria={props.aria}
                    customClass={props.customClass}
                    isCustomSpinner={props.isCustomSpinner}
                    noSearchResultMessage={props.noSearchResultMessage}
                    showLoadingSpinner={props.showLoadingSpinner}
                    defaultValue={props.defaultValue}
                    isScrollThresholdRequired={props.isScrollThresholdRequired}
                    triggerBlurEvent={props.triggerBlurEvent}
                    triggerApiLoadEvent={props.triggerApiLoadEvent}
                    isApiLoad={props.isApiLoad}
                    scrollThreshold={props.scrollThreshold}
                    triggerOnFocusEvent={props.triggerOnFocusEvent}
                    />
            {/* </div> */}
        </div>
    )
}

export default Autocomplete;