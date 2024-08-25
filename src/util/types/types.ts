export type CustomClassType = {
    parentContainerClass?: string;
    inputFieldContainerClass?:string;
    inputFieldClass?: string;
    listContainerClass?: string;
    dropdownUnorderedListClass?: string;
    dropdownListClass?: string;
    noResultClass?: string;
    disableListClass?:string;
    inputLabelContainerClass?:string;
    inputLabelClass?: string;
    customSpinnerClass?: string;
  }
  
export type CustomNgStyleType = {
    parentContainerStyle?: React.CSSProperties;
    inputFieldContainerStyle?: React.CSSProperties;
    inputFieldStyle?: React.CSSProperties;
    listContainerStyle?: React.CSSProperties;
    dropdownUnorderedListStyle?: React.CSSProperties;
    dropdownListStyle?: React.CSSProperties;
    noResultStyle?: React.CSSProperties;
    inputLabelContainerStyle?: React.CSSProperties;
    inputLabelStyle?: React.CSSProperties;
    customSpinnerStyle?: React.CSSProperties;
  }

export type CustomAriaType = {
  ariaRole?: string;
  ariaRoleDescription?: string;
  ariaNoSearchResult?: string;
  ariaULList?: string;
  ariaListContainer?: string;
  ariaInputField?: string;
  ariaInputLabel?: string;
}
  