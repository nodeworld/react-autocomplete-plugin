import React, { Ref } from "react";
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
    return (
        <React.Fragment>
            <li
                tabIndex={0}
                ref={listRef}
                className={`${assignClass('autocomplete-data-list', props?.dropdownListClass)}${((props.disableProperty && props.data[props.disableProperty]) || (props.disableListFn && props.disableListFn(props.index, props.data))) ? ' disable-list-element' : ''}`}
                style={props?.dropdownListStyle ? props.dropdownListStyle : {}}
                key={props.index}
                onMouseDown={() => props.onSelect(props.data)}
                aria-label={props.disableListFn ? (props.disableListFn(props.index, props.data) ? 'Autocomplete list disabled' : 'Autocomplete list') : (props.disableProperty) ? (props.data[props.disableProperty] === true ? 'Autocomplete list disabled' : 'Autocomplete list') : 'Autocomplete list'}>
                {props.objectProperty ? props.data[props.objectProperty] : props.data}
            </li>
        </React.Fragment>
    )
}

export default React.forwardRef(DropdownList);