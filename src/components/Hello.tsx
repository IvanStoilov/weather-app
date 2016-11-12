import * as React from "react";

export function Hello (compiler: string, framework: string) : JSX.Element {
    return <h1>Hello from {compiler} and {framework}!</h1>;
}
