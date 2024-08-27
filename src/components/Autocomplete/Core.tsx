import React, { BaseSyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { assignClass } from "../../util/helpers/classes";
import { CustomAriaType, CustomClassType, CustomStyleType } from "../../util/types/types";
import InputField from "./InputField";
import DropdownList from "./DropdownList";

type InputFieldType = {
    dropdownData: any[];
    initialVisibleData?: number;
    scrollThreshold?: number;
    objectProperty?: string;
    inputFieldClass?: string;
    inputFieldStyle?: React.CSSProperties;
    placeHolder?: string;
    showdropDownArrow?: boolean;
    showClearOption?: boolean;
    isAutoCompleteDisabled?: boolean;
    totalRecords?: number;
    ariaRole?: string;
    ariaRoleDescription?: string;
    ariaInputField?: string;
    inspectAutoCompleteList?: boolean;
    defaultValue?: any;
    broadcastSelectedValue?: Function;
    disableProperty?: string;
    disableListFn?: Function | undefined;
    triggerClearSelectionEvent: Function | undefined;
    customClass?: CustomClassType;
    customStyle?: CustomStyleType;
    aria?: CustomAriaType;
    showLoadingSpinner?: boolean;
    isCustomSpinner?: boolean;
    noSearchResultMessage?: string;
    triggerApiLoadEvent?: Function | undefined;
    isApiLoad?: boolean;
    isScrollThresholdRequired?: boolean;
    triggerBlurEvent?: Function | undefined;
    triggerOnFocusEvent?: Function | undefined;
    searchFn?: any | undefined;
}

function Core(props: InputFieldType) {

    // TODO: _setInitRenderInProgress not being used anywhere
    const [initRenderInProgress, _setInitRenderInProgress] = useState<boolean>(true);

    const searchValue = useRef<HTMLInputElement>(null);

    const scrollDownIndex = useRef(0);

    const scrollThreshold = props.scrollThreshold ? props.scrollThreshold : 3;

    const [isOnFocus, setisOnFocus] = useState<boolean>(false);

    const unOrderedList = useRef<HTMLUListElement>(null);

    const listRef = useRef<HTMLLIElement>(null);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<any[]>([]);

    const noSearchResultMessage = props.noSearchResultMessage ? props.noSearchResultMessage : 'No results found.';

    const initialVisibleData = props.initialVisibleData ? props.initialVisibleData : 1000;

    const isScrollThresholdRequired = (props.isScrollThresholdRequired !== undefined && props.isScrollThresholdRequired !== null) ? props.isScrollThresholdRequired : true;

    const [isEventEmitted, setIsEventEmitted] = useState<boolean>(false);

    const [dataLength, setDataLength] = useState<number>(0); 

    const handleOnFocusEvent = (event: any) => {
        setisOnFocus(true);
        if (props.triggerOnFocusEvent && typeof props.triggerOnFocusEvent === 'function') {
            props.triggerOnFocusEvent(event)
        }
    }

    const onSelect = (selectedValue: any) => {
        if (!selectedValue) { return; }
        if (props.objectProperty) {
            searchValue.current!.value = selectedValue[props.objectProperty];
        } else {
            searchValue.current!.value = selectedValue;
        }
        setisOnFocus(false);
        if (props.broadcastSelectedValue) {
            props.broadcastSelectedValue(selectedValue);
        }
    }

    // TODO: customSearch not being used anywhere. Check if it should be used.

    /* const customSearch = async (event: any) => {
        try {
          if (!props.searchFn || props.searchFn.constructor !== Function) { throw new Error("Custom search should be a function."); }
          const getData = await props.searchFn(event);
          setFilteredData(getData);
        } catch (err) {
          console.log(err);
        }
      } */

    const handleOnBlurEvent = (event: any) => {
        if (props.inspectAutoCompleteList) { return; }
        if ((event?.relatedTarget as HTMLElement)?.classList?.contains('arrow')) {
            return;
        }
        if ((event?.relatedTarget as HTMLElement)?.classList?.contains('unorder-list')) {
            if(!searchValue.current?.value) {
                searchValue.current?.focus();
            }
            return;
        }
        if ((event?.relatedTarget as HTMLElement)?.classList?.contains('autocomplete-data-list')) {
            return;
        }
        if (props.inspectAutoCompleteList) {
            console.warn(`You have turned off blur event in autocomplete module which will not close autocomplete list. Hope you know what you are doing. Update to false after inspect is complete.`)
            return;
        }
        setisOnFocus(false);
        if (props.triggerBlurEvent && typeof props.triggerBlurEvent === 'function') {
            props.triggerBlurEvent(event)
        }
    }

    const handleDropdownClick = (_event: any) => {
        if(!isOnFocus) {
            searchValue.current?.focus();
        } else {
            setisOnFocus(false);
        }
        // setisOnFocus((prev) => !prev);
    }

    const clearSearch = (event: any) => {
        searchValue.current!.value = '';
        if (props.triggerClearSelectionEvent && typeof props.triggerClearSelectionEvent === 'function') {
            props.triggerClearSelectionEvent(event);
        }
    }

    const onSearch = (_event: any) => {
        if (!searchValue.current?.value || searchValue.current?.value.trim() === '') {
            setFilteredData(props.dropdownData)
            return;
        }
        if (props.objectProperty) {
            const getSearchData = props.dropdownData.filter(dt => dt[props.objectProperty!]?.toString().toLowerCase().includes(searchValue.current!.value.toLowerCase().trim()));
            if (getSearchData.length > 0) {
                setFilteredData(getSearchData);
                return;
            }
            setFilteredData([]);
            return;
        }
        const getSearchData = props.dropdownData.filter(dt => dt?.toString().toLowerCase().includes(searchValue.current!.value.toLowerCase().trim()));
        if (getSearchData.length > 0) {
            setFilteredData(getSearchData);
            return;
        }
        setFilteredData([]);
        return;
    }

    const listScrollEvent = (event: BaseSyntheticEvent) => {
        if (filteredData.length <= 0) { return; }
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
            if (props.totalRecords && scrollDownIndex.current >= props.totalRecords) {
                return;
            }
            loadNextSetData();
        } else if (event.target.scrollTop < 10 && filteredData.length > initialVisibleData) {
            initData();
        }
    }

    const initData = () => {
        const data = searchValue.current?.value && filteredData.length > 0 ? filteredData : props.dropdownData;
        if (data.length <= 0) { return; }
        const dt = data.slice(0, initialVisibleData);
        setFilteredData(dt);
        scrollDownIndex.current = initialVisibleData;
    }

    const loadNextSetData = () => {
        try {
            if (!isOnFocus) { return; }
            // if (props.dropdownData.length <= initialVisibleData) {
            //     if (props.triggerApiLoadEvent) {
            //         setShowSpinner(true);
            //         props.triggerApiLoadEvent({ dataIndex: props.dropdownData.length });
            //     }
            //     return;
            // }
            setTimeout(() => {
                nextSet();
            }, 150)
        } catch (err) {
            console.log(err);
        }
    }

    const nextSet = () => {
        if(props.dropdownData.length === scrollDownIndex.current) {
            if (!isEventEmitted && props.isApiLoad && props.triggerApiLoadEvent && typeof props.triggerApiLoadEvent === 'function') {
                props.triggerApiLoadEvent({ dataIndex: props.dropdownData.length });
                setIsEventEmitted(true);
                if (props.showLoadingSpinner) {
                    setShowSpinner(true);
                    setTimeout(() => {
                        unOrderedList.current?.scrollTo(0, unOrderedList.current.scrollHeight + 10);
                    }, 150)
                    
                }
            }
            return;
        }
        if(props.dropdownData.length > filteredData.length) {
            const getThresholdData = Math.ceil(filteredData.length / scrollThreshold);
            let getNextDataSet: any;
            if (isScrollThresholdRequired && getThresholdData >= initialVisibleData) {
                const temp = [...filteredData];
                temp.splice(0, initialVisibleData);
                getNextDataSet = props.dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    setFilteredData([...temp, ...getNextDataSet]);
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                }
            } else {
                getNextDataSet = props.dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    setFilteredData((prevData) => [...prevData, ...getNextDataSet]);
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                }
            }
            setTimeout(() => {
                unOrderedList.current?.scrollTo(0, Math.ceil((unOrderedList.current!.scrollHeight * 50) / 100));
            }, 100)
        }
    }

    const setData = useCallback((dropDownData: any[]) => {
        const data = [...dropDownData];
        if (data.length <= initialVisibleData) {
            setFilteredData(data);
            scrollDownIndex.current = data.length;
            return;
        }
        const getFirstSetData = data.slice(0, initialVisibleData);
        setFilteredData(getFirstSetData);
        setDataLength(data.length);
        scrollDownIndex.current = getFirstSetData.length;
        return;
    }, [initialVisibleData]);

    const loadNextApiSet = useCallback((dropdownData: any) => {
        if (!isEventEmitted) { return; }
        if(dropdownData.length > filteredData.length) {
            const getThresholdData = Math.ceil(filteredData.length / scrollThreshold);
            let getNextDataSet: any;
            if (isScrollThresholdRequired && getThresholdData >= initialVisibleData) {
                const temp = [...filteredData];
                temp.splice(0, initialVisibleData);
                getNextDataSet = dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    setFilteredData([...temp, ...getNextDataSet]);
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                }
            } else {
                getNextDataSet = dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    setFilteredData((prevData) => [...prevData, ...getNextDataSet]);
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                }
            }
            setTimeout(() => {
                unOrderedList.current?.scrollTo(0, Math.ceil((unOrderedList.current!.scrollHeight * 50) / 100));
                setIsEventEmitted(false);
                setDataLength(dropdownData.length);
                setShowSpinner(false);
            }, 100);
        }
    }, [filteredData, initialVisibleData, isScrollThresholdRequired, scrollThreshold, isEventEmitted])

    useEffect(() => {
        if (isEventEmitted && dataLength !== props.dropdownData.length && typeof props.triggerApiLoadEvent === 'function') {
            loadNextApiSet(props.dropdownData)
            return;
        }
    }, [dataLength, isEventEmitted, props.triggerApiLoadEvent, loadNextApiSet])

    useEffect(() => {
        if (isEventEmitted || !initRenderInProgress || dataLength > 0) { return; }
        if (props.defaultValue) {
            if (props.objectProperty) {
                let getValue;
                if (typeof props.defaultValue === 'object') {
                    getValue = props.dropdownData.find(dt => dt[props.objectProperty!] === props.defaultValue[props.objectProperty!]);
                } else {
                    getValue = props.dropdownData.find(dt => dt[props.objectProperty!] === props.defaultValue);
                }
                if (getValue) {
                    searchValue.current!.value = getValue[props.objectProperty];
                }
            } else {
                let getValue;
                if (typeof props.defaultValue === 'object') {
                    getValue = props.dropdownData.find(dt => dt === props.defaultValue[props.objectProperty!]);
                } else {
                    getValue = props.dropdownData.find(dt => dt=== props.defaultValue);
                }
                if (getValue) {
                    searchValue.current!.value = getValue;
                }
            }
        }
        if(props.dropdownData.length > 0) {
            setData(props.dropdownData);
        }
    }, [props.dropdownData, setData, props.defaultValue, props.objectProperty, isEventEmitted, initRenderInProgress, dataLength]);

    return (
        <React.Fragment>
            <InputField
                handleOnBlurEvent={handleOnBlurEvent}
                handleOnFocusEvent={handleOnFocusEvent}
                onSearch={!props.searchFn ? onSearch : props.searchFn}
                ariaInputField={props.aria?.ariaInputField}
                ariaRole={props.aria?.ariaRole}
                ariaRoleDescription={props.aria?.ariaRoleDescription}
                inputFieldClass={props.customClass?.inputFieldClass}
                inputFieldStyle={props.customStyle?.inputFieldStyle}
                isAutoCompleteDisabled={props.isAutoCompleteDisabled}
                key={'input-field'}
                placeHolder={props.placeHolder}
                ref={searchValue}
                clearSearch={clearSearch}
                handleDropdownClick={handleDropdownClick}
                showClearOption={props.showClearOption}
                showdropDownArrow={props.showdropDownArrow} />
            {
                isOnFocus && <div
                            className={assignClass('auto-complete-list', props?.customClass?.listContainerClass)}
                            style={props?.customStyle?.listContainerStyle ? props.customStyle.listContainerStyle : {}}
                            aria-label={props.aria?.ariaListContainer ? props.aria.ariaListContainer : 'Autocomplete list container.'}>
                    <div id="list-container">
                        <ul id="list-id"
                            ref={unOrderedList}
                            onScroll={listScrollEvent}
                            className={assignClass('unorder-list', props?.customClass?.dropdownUnorderedListClass)}
                            style={props?.customStyle?.dropdownUnorderedListStyle ? props.customStyle.dropdownUnorderedListStyle : {}}
                            tabIndex={0}
                            aria-label={props.aria?.ariaULList ? props.aria.ariaULList : 'Autocomplete unordered list'}>
                            {
                                filteredData.length > 0 && filteredData.map((data: any, index: number) => {
                                    if (!props.objectProperty && (typeof data === 'object')) {
                                        return null
                                    }
                                    return (
                                        <DropdownList
                                            index={index}
                                            onSelect={onSelect}
                                            data={data}
                                            disableListFn={props.disableListFn}
                                            disableProperty={props.disableProperty}
                                            disableListClass={props.customClass?.disableListClass}
                                            dropdownListClass={props.customClass?.dropdownListClass}
                                            dropdownListStyle={props.customStyle?.dropdownListStyle}
                                            disableListStyle={props.customStyle?.disableListStyle}
                                            key={index}
                                            objectProperty={props.objectProperty}
                                            ref={listRef}
                                        />
                                    );
                                })
                            }
                            {
                                showSpinner && props.showLoadingSpinner && !props.isCustomSpinner && <li className="auto-complete-list-spinner"><span className="loader"></span></li>
                            }
                            {
                                showSpinner && props.showLoadingSpinner && props.isCustomSpinner && <li className="auto-complete-list-spinner">
                                    <span
                                        className={props?.customClass?.customSpinnerClass ? props.customClass.customSpinnerClass : ''}
                                        style={props?.customStyle?.customSpinnerStyle ? props.customStyle.customSpinnerStyle : {}}></span>
                                </li>
                            }
                            {
                                filteredData.length <= 0 && <li
                                    className={assignClass('autocomplete-data-list noSearchResult', props?.customClass?.noResultClass)}
                                    style={props?.customStyle?.noResultStyle ? props.customStyle.noResultStyle : {}}
                                    aria-label={props.aria?.ariaNoSearchResult ? props.aria.ariaNoSearchResult : 'No search result.'}>
                                    {noSearchResultMessage}
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}

export default Core;