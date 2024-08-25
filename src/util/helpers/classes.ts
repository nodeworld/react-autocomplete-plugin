export function assignClass(classTobeMandatory?: string, classes?: string) {
    if (!classTobeMandatory && !classes) { return; }
    let templateClass = classTobeMandatory ? classTobeMandatory : '';
    const splitCustomClasses = classes?.split(' ');
    if (!splitCustomClasses) { return templateClass; }
    for (const customClass of splitCustomClasses) {
        templateClass = templateClass + ' ' + customClass;
    }
    return templateClass;
}