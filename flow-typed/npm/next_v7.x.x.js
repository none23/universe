// flow-typed signature: a6c530b4a33b66f4ee8b3e94729c9cdb
// flow-typed version: c6154227d1/next_v7.x.x/flow_>=v0.104.x

declare module "next" {
  declare type RequestHandler = (
    req: http$IncomingMessage<>,
    res: http$ServerResponse,
    parsedUrl: any
  ) => Promise<void>;

  declare type NextApp = {
    prepare(): Promise<void>,
    getRequestHandler(): RequestHandler,
    setAssetPrefix(url: string): void,
    render(
      req: http$IncomingMessage<>,
      res: http$ServerResponse,
      pathname: string,
      query?: Object
    ): Promise<void>,
    renderToHTML(
      req: http$IncomingMessage<>,
      res: http$ServerResponse,
      pathname: string,
      query?: Object
    ): string,
    renderError(
      err: Error,
      req: http$IncomingMessage<>,
      res: http$ServerResponse,
      pathname: string,
      query?: Object
    ): Promise<void>,
    renderErrorToHTML(
      err: Error,
      req: http$IncomingMessage<>,
      res: http$ServerResponse,
      pathname: string,
      query?: Object
    ): string,
    ...
  };

  declare export type Options = {
    dev?: boolean,
    dir?: string,
    quiet?: boolean,
    staticMarkup?: boolean,
    ...
  };

  declare export type Context = {
    +pathname: string,
    +query: any,
    +req?: any,
    +res?: any,
    +xhr?: any,
    +err?: any,
    ...
  };

  declare export type Page<T, S> = {
    ...React$Component<T, S>,
    getInitialProps: (ctx: Context) => Promise<*>,
    ...
  };

  declare export default (opts: Options) => NextApp;
}

declare module "next/head" {
  declare module.exports: Class<React$Component<any, any>>;
}

declare module "next/config" {
  declare module.exports: () => {
    publicRuntimeConfig: { [string]: string, ... },
    serverRuntimeConfig: { [string]: string, ... },
    ...
  };
}

declare type URLObject = {
  +href?: string,
  +protocol?: string,
  +slashes?: boolean,
  +auth?: string,
  +hostname?: string,
  +port?: string | number,
  +host?: string,
  +pathname?: string,
  +search?: string,
  +query?: Object,
  +hash?: string,
  ...
};

declare module "next/link" {
  declare export type Props = {
    prefetch?: boolean,
    shallow?: boolean,
    scroll?: boolean,
    replace?: boolean,
    onError?: (error: any) => void,
    href: string | URLObject,
    as?: string | URLObject,
    passHref?: boolean,
    ...
  };

  declare export default Class<React$Component<Props>>;
}

declare module "next/router" {
  declare export type RouteError = Error & { cancelled: boolean, ... };
  declare export type RouteCallback = (url: string) => void;
  declare export type RouteErrorCallback = (
    err: RouteError,
    url: string
  ) => void;

  declare export interface RouterEvents {
    on(event: "routeChangeStart", cb: RouteCallback): RouterEvents,
    on(event: "routeChangeComplete", cb: RouteCallback): RouterEvents,
    on(event: "routeChangeError", cb: RouteErrorCallback): RouterEvents,
    on(event: "beforeHistoryChange", cb: RouteCallback): RouterEvents,
    on(event: "hashChangeStart", cb: RouteCallback): RouterEvents,
    on(event: "hashChangeComplete", cb: RouteCallback): RouterEvents,

    off(event: "routeChangeStart", cb: RouteCallback): RouterEvents,
    off(event: "routeChangeComplete", cb: RouteCallback): RouterEvents,
    off(event: "routeChangeError", cb: RouteErrorCallback): RouterEvents,
    off(event: "beforeHistoryChange", cb: RouteCallback): RouterEvents,
    off(event: "hashChangeStart", cb: RouteCallback): RouterEvents,
    off(event: "hashChangeComplete", cb: RouteCallback): RouterEvents
  }

  declare export type EventChangeOptions = {
    [key: string]: any,
    shallow?: boolean,
    ...
  };

  declare export type BeforePopStateCallback = (options: {
    url: string,
    as: ?string,
    options: EventChangeOptions,
    ...
  }) => boolean;

  declare export type Router = {
    +route: string,
    +pathname: string,
    +asPath: string,
    +query: Object,
    events: RouterEvents,
    push(
      url: string | URLObject,
      as: ?(string | URLObject),
      options?: EventChangeOptions
    ): Promise<boolean>,
    replace(
      url: string | URLObject,
      as: ?(string | URLObject),
      options?: EventChangeOptions
    ): Promise<boolean>,
    prefetch(url: string): Promise<*>,
    beforePopState(cb: BeforePopStateCallback): void,
    ...
  };

  declare export function withRouter<T>(
    Component: React$ComponentType<T & { router: Router, ... }>
  ): Class<React$Component<T>>;

  declare export default Router;
}

declare module "next/document" {
  import type { Context } from "next";

  declare export var Head: Class<React$Component<any, any>>;
  declare export var Main: Class<React$Component<any, any>>;
  declare export var NextScript: Class<React$Component<any, any>>;
  declare export default Class<React$Component<any, any>> & {
    getInitialProps: (ctx: Context) => Promise<*>,
    renderPage(cb: Function): void,
    ...
  };
}

declare module "next/app" {
  import type { Context, Page } from "next";
  import type { Router } from "next/router";

  declare export var Container: Class<React$Component<any, any>>;

  declare export type AppInitialProps = {
    Component: Page<any, any>,
    router: Router,
    ctx: Context,
    ...
  };

  declare export default Class<React$Component<any, any>> & { getInitialProps: (appInitialProps: AppInitialProps) => Promise<*>, ... };
}

declare module "next/dynamic" {
  declare type ImportedComponent = Promise<null | React$ElementType>;
  declare type ComponentMapping = { [componentName: string]: ImportedComponent, ... };

  declare type NextDynamicOptions = {
    loader?: ComponentMapping | (() => ImportedComponent),
    loading?: React$ElementType,
    timeout?: number,
    delay?: number,
    ssr?: boolean,
    render?: (
      props: any,
      loaded: { [componentName: string]: React$ElementType, ... }
    ) => React$ElementType,
    modules?: () => ComponentMapping,
    loadableGenerated?: {
      webpack?: any,
      modules?: any,
      ...
    },
    ...
  };

  declare export default function dynamic(
    dynamicOptions: any,
    options: ?NextDynamicOptions
  ): Object;
}
