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

    const searchValue = useRef<HTMLInputElement>(null);

    const scrollDownIndex = useRef(0);

    const scrollThreshold = props.scrollThreshold ? props.scrollThreshold : 3;

    const [isOnFocus, setisOnFocus] = useState<boolean>(false);

    const unOrderedList = useRef<HTMLUListElement>(null);

    const listRef = useRef<HTMLLIElement>(null);

    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const [filteredData, setFilteredData] = useState<any[]>([]);

    const [searchedData, setSearchedData] = useState<any[]>([]);

    const noSearchResultMessage = props.noSearchResultMessage ? props.noSearchResultMessage : 'No results found.';

    const initialVisibleData = props.initialVisibleData ? props.initialVisibleData : 1000;

    const isScrollThresholdRequired = (props.isScrollThresholdRequired !== undefined && props.isScrollThresholdRequired !== null) ? props.isScrollThresholdRequired : true;

    const [isEventEmitted, setIsEventEmitted] = useState<boolean>(false);

    /* This state is to monitor the dropdown length so that useEffect does not re-render */
    const [dropdownDataLength, setDropdownDataLength] = useState<number>(0);

    const [isInputFieldDirty, setInputFieldDirty] = useState<boolean>(false);

    const handleOnFocusEvent = (event: any) => {
        setisOnFocus(true);
        const getListId = document.getElementById('autoCompleteListContainerId')?.style;
        const getInputId = document.getElementById('searchInput')?.clientWidth;
        if (getListId && getInputId) {
            getListId.width = getInputId+'px';
        }
        if (props.triggerOnFocusEvent && typeof props.triggerOnFocusEvent === 'function') {
            props.triggerOnFocusEvent(event)
        }
        if (filteredData.length <= 0) {
            if (isInputFieldDirty && searchValue.current?.value && searchValue.current.value !== '') {
                onSearch(null);
            } else {
                setData(props.dropdownData, props.defaultValue, props.objectProperty);
            }
        }
    }

    const onSelect = (selectedValue: any) => {
        if (selectedValue === undefined || selectedValue === null) { return; }
        if (props.objectProperty) {
            searchValue.current!.value = selectedValue[props.objectProperty];
        } else {
            searchValue.current!.value = selectedValue;
        }
        setisOnFocus(false);
        setInputFieldDirty(false);
        setFilteredData([]);
        setSearchedData([]);
        if (props.broadcastSelectedValue) {
            props.broadcastSelectedValue(selectedValue);
        }
    }

    const handleOnBlurEvent = (event: any) => {
        if (props.inspectAutoCompleteList) { return; }
        if ((event?.relatedTarget as HTMLElement)?.classList?.contains('arrow')) {
            return;
        }
        if ((event?.relatedTarget as HTMLElement)?.classList?.contains('unorder-list')) {
            searchValue.current?.focus();
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
        setFilteredData([]);
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

    const onSearch = async (_event: any) => {
        if (!searchValue.current?.value || searchValue.current?.value.trim() === '') {
            setSearchedData([]);
            initData();
            unOrderedList.current?.scrollTo(0, 0);
            return;
        }
        if (!isInputFieldDirty) {
            setInputFieldDirty(true);
        }
        scrollDownIndex.current = 0; //reset
        if (props.searchFn && typeof props.searchFn === 'function') {
            const result = await props.searchFn(searchValue.current.value, props.dropdownData);
            if (result && result.length > 0) {
                setSearchedData(result);
                const getFirstSetData = result.slice(0, initialVisibleData);
                scrollDownIndex.current = scrollDownIndex.current + getFirstSetData.length;
                setFilteredData(getFirstSetData);
                return;
            }
        }
        if (props.objectProperty) {
            const getSearchData = props.dropdownData.filter(dt => dt[props.objectProperty!]?.toString().toLowerCase().includes(searchValue.current!.value.toLowerCase().trim()));
            if (getSearchData.length > 0) {
                const getFirstSetData = getSearchData.slice(0, initialVisibleData);
                scrollDownIndex.current = scrollDownIndex.current + getFirstSetData.length;
                setSearchedData(getSearchData);
                setFilteredData(getFirstSetData);
                if (getFirstSetData.length < initialVisibleData) {
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
                }
                return;
            }
            setFilteredData([]);
            return;
        }
        const getSearchData = props.dropdownData.filter(dt => dt?.toString().toLowerCase().includes(searchValue.current!.value.toLowerCase().trim()));
        if (getSearchData.length > 0) {
            const getFirstSetData = getSearchData.slice(0, initialVisibleData);
            scrollDownIndex.current = scrollDownIndex.current + getFirstSetData.length;
            setSearchedData(getSearchData);
            setFilteredData(getFirstSetData);
            if (getFirstSetData.length < initialVisibleData) {
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
            }
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
        } else if (isScrollThresholdRequired && event.target.scrollTop < 10 && filteredData.length > initialVisibleData) {
            initData();
        }
    }

    const initData = () => {
        const data = isInputFieldDirty && searchedData.length > 0 && searchValue.current?.value ? searchedData.slice(0, initialVisibleData) : props.dropdownData.slice(0, initialVisibleData);
        setFilteredData(data);
        scrollDownIndex.current = data.length;
        return;
        
    }

    const loadNextSetData = () => {
        try {
            if (!isOnFocus) { return; }
            setTimeout(() => {
                nextSet();
            }, 150)
        } catch (err) {
            console.log(err);
        }
    }

    const nextSet = () => {
        const dropdownData = searchedData.length > 0 ? [...searchedData] : [...props.dropdownData];
        if(props.dropdownData.length === scrollDownIndex.current || searchedData.length === scrollDownIndex.current) {
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
        if(dropdownData.length > filteredData.length) {
            const getThresholdData = Math.ceil(filteredData.length / scrollThreshold);
            let getNextDataSet: any;
            if (isScrollThresholdRequired && getThresholdData >= initialVisibleData) {
                const temp = [...filteredData];
                temp.splice(0, initialVisibleData);
                getNextDataSet = dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                    if (isInputFieldDirty && (searchValue.current?.value && searchValue.current!.value !== '')) {
                        if (props.objectProperty) {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt[props.objectProperty!]?.toString().toLowerCase().includes(props.defaultValue?.toString()?.toLowerCase().trim()));
                        } else {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt?.toString().toLowerCase().includes(props.defaultValue?.toString()?.toLowerCase().trim()));
                        }
                    }
                    setFilteredData([...temp, ...getNextDataSet]);
                }
            } else {
                getNextDataSet = dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                    if (isInputFieldDirty && (searchValue.current?.value && searchValue.current!.value !== '')) {
                        if (props.objectProperty) {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt[props.objectProperty!]?.toString().toLowerCase().includes(searchValue.current!.value?.toString()?.toLowerCase().trim()));
                        } else {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt?.toString().toLowerCase().includes(searchValue.current!.value?.toString()?.toLowerCase().trim()));
                        }
                    }
                    setFilteredData((prevData) => [...prevData, ...getNextDataSet]);
                }
            }
            setTimeout(() => {
                unOrderedList.current?.scrollTo(0, Math.ceil((unOrderedList.current!.scrollHeight * 50) / 100));
            }, 100)
        }
    }

    const setData = useCallback((dropDownData: any[], defaultValue: any, objectProperty: string | undefined) => {
        const data = [...dropDownData];
        if (data.length <= initialVisibleData) {
            setFilteredData(data);
            scrollDownIndex.current = data.length;
            return;
        }
        let getFirstSetData = data.slice(0, initialVisibleData);
        scrollDownIndex.current = getFirstSetData.length;
        if (isInputFieldDirty && (searchValue.current?.value && searchValue.current!.value !== '')) {
            if (objectProperty) {
                getFirstSetData = getFirstSetData.filter(dt => dt[objectProperty!]?.toString().toLowerCase().includes(searchValue.current!.value?.toString()?.toLowerCase().trim()));
            } else {
                getFirstSetData = getFirstSetData.filter(dt => dt?.toString().toLowerCase().includes(searchValue.current!.value?.toString()?.toLowerCase().trim()));
            }
        }
        setFilteredData(getFirstSetData);
        setDropdownDataLength(data.length);
        return;
    }, [initialVisibleData, isInputFieldDirty]);

    const loadNextApiSet = useCallback((dropdownData: any) => {
        if (!isEventEmitted) { return; }
        if (searchValue.current?.value && searchValue.current.value !== '') {
            let getSearchData;
            if (props.objectProperty) {
                getSearchData = dropdownData.filter((dt: any) => dt[props.objectProperty!]?.toString().toLowerCase().includes(searchValue.current!.value.toLowerCase().trim()));
            } else {
                getSearchData = dropdownData.filter((dt: any) => dt?.toString().toLowerCase().includes(searchValue.current!.value.toLowerCase().trim()));
            }
            if (getSearchData && getSearchData.length > 0) {
                if (isInputFieldDirty) {
                    setSearchedData(getSearchData);
                }
                const getSlicedData = getSearchData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getSlicedData && getSlicedData.length > 0) {
                    scrollDownIndex.current = scrollDownIndex.current + getSlicedData.length;
                    const getThresholdData = Math.ceil(filteredData.length / scrollThreshold);
                    if (isScrollThresholdRequired && getThresholdData >= initialVisibleData) {
                        const temp = [...filteredData];
                        temp.splice(0, initialVisibleData);
                        setFilteredData([...temp, ...getSlicedData]);
                    } else {
                        setFilteredData((prevData) => [...prevData, ...getSlicedData]);
                    }
                }
                setTimeout(() => {
                    unOrderedList.current?.scrollTo(0, Math.ceil((unOrderedList.current!.scrollHeight * 50) / 100));
                    setIsEventEmitted(false);
                    setDropdownDataLength(dropdownData.length);
                    setShowSpinner(false);
                }, 100);
            } else {
                setIsEventEmitted(false);
                setDropdownDataLength(dropdownData.length);
                setShowSpinner(false);
                setSearchedData([]);
                setFilteredData([])
            }
            return;
        }

        if(dropdownData.length > filteredData.length) {
            const getThresholdData = Math.ceil(filteredData.length / scrollThreshold);
            let getNextDataSet: any;
            if (isScrollThresholdRequired && getThresholdData >= initialVisibleData) {
                const temp = [...filteredData];
                temp.splice(0, initialVisibleData);
                getNextDataSet = dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                    if (props.defaultValue && (searchValue.current?.value && searchValue.current!.value !== '')) {
                        if (props.objectProperty) {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt[props.objectProperty!]?.toString().toLowerCase().includes(props.defaultValue?.toString()?.toLowerCase().trim()));
                        } else {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt?.toString().toLowerCase().includes(props.defaultValue?.toString()?.toLowerCase().trim()));
                        }
                    }
                    setFilteredData([...temp, ...getNextDataSet]);
                }
            } else {
                getNextDataSet = dropdownData.slice(scrollDownIndex.current, scrollDownIndex.current + initialVisibleData);
                if (getNextDataSet.length > 0) {
                    scrollDownIndex.current = scrollDownIndex.current + getNextDataSet.length;
                    if (props.defaultValue && (searchValue.current?.value && searchValue.current!.value !== '')) {
                        if (props.objectProperty) {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt[props.objectProperty!]?.toString().toLowerCase().includes(props.defaultValue?.toString()?.toLowerCase().trim()));
                        } else {
                            getNextDataSet = getNextDataSet.filter((dt: any) => dt?.toString().toLowerCase().includes(props.defaultValue?.toString()?.toLowerCase().trim()));
                        }
                    }
                    setFilteredData((prevData) => [...prevData, ...getNextDataSet]);
                }
            }
            setTimeout(() => {
                unOrderedList.current?.scrollTo(0, Math.ceil((unOrderedList.current!.scrollHeight * 50) / 100));
                setIsEventEmitted(false);
                setDropdownDataLength(dropdownData.length);
                setShowSpinner(false);
            }, 100);
        }
    }, [filteredData, initialVisibleData, isScrollThresholdRequired, scrollThreshold, isEventEmitted, props.objectProperty, props.defaultValue, isInputFieldDirty])

    useEffect(() => {
        if (isEventEmitted && dropdownDataLength !== props.dropdownData.length && typeof props.triggerApiLoadEvent === 'function') {
            loadNextApiSet(props.dropdownData)
            return;
        }
    }, [dropdownDataLength, isEventEmitted, props.triggerApiLoadEvent, loadNextApiSet, props.dropdownData])

    useEffect(() => {
        if (isEventEmitted || dropdownDataLength > 0) { return; }
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
    }, [props.dropdownData, setData, props.defaultValue, props.objectProperty, isEventEmitted, dropdownDataLength]);

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
                <div
                    id="autoCompleteListContainerId"
                    className={assignClass('auto-complete-list', props?.customClass?.listContainerClass)}
                    style={props?.customStyle?.listContainerStyle ? props.customStyle.listContainerStyle : {}}
                    aria-label={props.aria?.ariaListContainer ? props.aria.ariaListContainer : 'Autocomplete list container.'}>
                    { isOnFocus && <div id="list-container">
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
                                            dropdownListClass={props.customClass?.dropdownListClass}
                                            dropdownListStyle={props.customStyle?.dropdownListStyle}
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
                                !showSpinner && filteredData.length <= 0 && <li
                                    className={assignClass('autocomplete-data-list noSearchResult', props?.customClass?.noResultClass)}
                                    style={props?.customStyle?.noResultStyle ? props.customStyle.noResultStyle : {}}
                                    aria-label={props.aria?.ariaNoSearchResult ? props.aria.ariaNoSearchResult : 'No search result.'}>
                                    {noSearchResultMessage}
                                </li>
                            }
                        </ul>
                    </div>
                    }
            </div>
        </React.Fragment>
    );
}

export default Core;