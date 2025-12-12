import { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    function route(name?: string, params?: any, absolute?: boolean, config?: ZiggyConfig): string;
    
    var route: {
        (name?: string, params?: any, absolute?: boolean, config?: ZiggyConfig): string;
        current(name?: string): boolean;
        has(name: string): boolean;
        params(): Record<string, any>;
    };

    interface Window {
        axios: any;
        route: typeof route;
    }
}

export {};

