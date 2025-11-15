declare module 'lucide-react' {
  const _default: any;
  export default _default;
}

declare module 'react' {
  export function useState(initial?: any): any;
  export function useEffect(effect: any, deps?: any): any;
  export const Fragment: any;
  const React: any;
  export default React;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export function jsxDEV(type: any, props?: any, key?: any): any;
}
