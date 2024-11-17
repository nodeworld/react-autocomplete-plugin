import React, { Ref, useCallback } from "react";
import { assignClass } from "../../util/helpers/classes";

type ListType = {
    index: number;
    data?: any;
    objectProperty?: string;
    disableProperty?: string;
    disableListFn?: Function;
    dropdownListClass?: string;
    dropdownListStyle?: React.CSSProperties;
    onSelect: Function;
}

function DropdownList(props: ListType, listRef: Ref<HTMLLIElement>) {

    const applyStyle = useCallback(() => {
        let style = {};
        if (props?.dropdownListStyle) {
            style = {...props.dropdownListStyle}
        }
        return style;
    }, [props.dropdownListStyle]);


    const applyClasses = useCallback(() => {
        let classes = '';
        if (props?.dropdownListClass) {
            classes = props.dropdownListClass;
        }
        if (classes && classes !== '') { return assignClass('autocomplete-data-list', classes); }
        return assignClass('autocomplete-data-list');
    }, [props.dropdownListClass]);

    return (
        <React.Fragment>
            <li
                tabIndex={0}
                ref={listRef}
                id={"autocomplete-li-element-"+props.index}
                className={`${applyClasses()}${((props.disableProperty && props.data[props.disableProperty]) || (props.disableListFn && props.disableListFn(props.index, props.data))) ? ' disable-list-element' : ''}`}
                style={applyStyle()}
                key={props.index}
                onMouseDown={() => props.onSelect(props.data)}
                aria-disabled={((props.disableProperty && props.data[props.disableProperty]) || (props.disableListFn && props.disableListFn(props.index, props.data))) ? true : false}
                aria-label={props.objectProperty ? props.data[props.objectProperty] : props.data}>
                {props.objectProperty ? props.data[props.objectProperty] : props.data}
            </li>
        </React.Fragment>
    )
}

export default React.forwardRef(DropdownList);