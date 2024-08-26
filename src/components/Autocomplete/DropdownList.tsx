import React, { Ref, useCallback } from "react";
import { assignClass } from "../../util/helpers/classes";

type ListType = {
    index: number;
    data?: any;
    objectProperty?: string;
    disableProperty?: string;
    disableListFn?: Function;
    dropdownListClass?: string;
    disableListClass?: string;
    dropdownListStyle?: React.CSSProperties;
    disableListStyle?: React.CSSProperties;
    onSelect: Function;
}

function DropdownList(props: ListType, listRef: Ref<HTMLLIElement>) {

    const applyStyle = useCallback(() => {
        let style = {};
        if (props?.dropdownListStyle) {
            style = {...props.dropdownListStyle}
        }
        if (props?.disableListStyle) {
            style = {...style, ...props.disableListStyle}
        }
        return style;
    }, [props.disableListStyle, props.dropdownListStyle]);

    return (
        <React.Fragment>
            <li
                tabIndex={0}
                ref={listRef}
                className={`${assignClass('autocomplete-data-list', props?.dropdownListClass)}${assignClass('autocomplete-data-list', props?.disableListClass)}${((props.disableProperty && props.data[props.disableProperty]) || (props.disableListFn && props.disableListFn(props.index, props.data))) ? ' disable-list-element' : ''}`}
                style={applyStyle()}
                key={props.index}
                onMouseDown={() => props.onSelect(props.data)}
                aria-label={props.disableListFn ? (props.disableListFn(props.index, props.data) ? 'Autocomplete list disabled' : 'Autocomplete list') : (props.disableProperty) ? (props.data[props.disableProperty] === true ? 'Autocomplete list disabled' : 'Autocomplete list') : 'Autocomplete list'}>
                {props.objectProperty ? props.data[props.objectProperty] : props.data}
            </li>
        </React.Fragment>
    )
}

export default React.forwardRef(DropdownList);