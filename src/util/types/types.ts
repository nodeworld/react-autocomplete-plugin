export type CustomClassType = {
    parentContainerClass?: string;
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
  
export type CustomStyleType = {
    parentContainerStyle?: React.CSSProperties;
    inputFieldStyle?: React.CSSProperties;
    listContainerStyle?: React.CSSProperties;
    dropdownUnorderedListStyle?: React.CSSProperties;
    dropdownListStyle?: React.CSSProperties;
    disableListStyle?: React.CSSProperties;
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
  