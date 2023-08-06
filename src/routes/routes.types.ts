import type { FunctionComponent, ComponentClass } from 'react';

type ReactComponent = FunctionComponent<unknown> | ComponentClass<unknown>;

export type Redirect = {
    from: string;
    to: string;
    isEnabled?: boolean;
};

export type Route = {
    path: string;
    component: ReactComponent;
    isEnabled?: boolean;
};
