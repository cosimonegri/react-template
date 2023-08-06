import { Navigate, Route as ReactRouterRoute } from 'react-router-dom';

import type { Redirect, Route } from './routes.types';

export const getRedirectComponent = (
    redirect: Redirect,
    currentPath: string,
) => {
    if (redirect.isEnabled === false || currentPath !== redirect.from) {
        return null;
    }
    return (
        <Navigate key={`${redirect.from}-${redirect.to}`} to={redirect.to} />
    );
};

export const getRouteComponent = (route: Route) => {
    if (route.isEnabled === false) {
        return null;
    }
    return (
        <ReactRouterRoute
            key={route.path}
            Component={route.component}
            path={route.path}
        />
    );
};
