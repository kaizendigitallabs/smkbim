import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type RouteBuilder = (name: string, params?: unknown, absolute?: boolean) => string;

const buildRoute: RouteBuilder = (name) => name;

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            (globalThis as unknown as Record<string, RouteBuilder>).route = (
                name,
                params,
                absolute,
            ) => buildRoute(name, params, absolute);

            return <App {...props} />;
        },
    }),
);
