import React from "react";

type Primitive = boolean | string | number | bigint | symbol | null | undefined;

export const usePrevious = <T extends Primitive>(value: T): T | undefined => {
    const currRef = React.useRef<T>(value);
    const prevRef = React.useRef<T>();

    if (currRef.current !== value) {
        prevRef.current = currRef.current;
        currRef.current = value;
    }

    return prevRef.current;
};
