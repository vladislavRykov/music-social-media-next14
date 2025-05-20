import { useEffect, useState } from "react";

export const useCSSVariable = (targetElement:string = ":root") => {
    const [
        cssRootStyles,
        setCssRootStyles
    ] = useState<CSSStyleDeclaration | null>(null);
    const [rootElement, setRootElement] = useState<Element | null>(null);

    const getCssVariable = (variable: string) => {
        const value = cssRootStyles?.getPropertyValue(variable);
        return value;
    };

    const setCssVariable = (variable: string, value: string) => {
        //@ts-ignore
        rootElement?.style.setProperty(variable, value);
    };
    useEffect(() => {
        if (document) {
            const rootElement = document.querySelector(targetElement) as Element;
            const rootStyles = getComputedStyle(rootElement);
            setRootElement(rootElement);
            setCssRootStyles(rootStyles);
        }
    }, [targetElement])

    return {getCssVariable, setCssVariable};
};