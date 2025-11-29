import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Z4scO-Sl.mjs';
import { manifest } from './manifest_CbgpYPLd.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/create-payment-intent.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/cookie-policy.astro.mjs');
const _page5 = () => import('./pages/credentials.astro.mjs');
const _page6 = () => import('./pages/follow-us.astro.mjs');
const _page7 = () => import('./pages/privacy-policy.astro.mjs');
const _page8 = () => import('./pages/support.astro.mjs');
const _page9 = () => import('./pages/teams.astro.mjs');
const _page10 = () => import('./pages/terms-conditions.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/create-payment-intent.ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/cookie-policy.astro", _page4],
    ["src/pages/credentials.astro", _page5],
    ["src/pages/follow-us.astro", _page6],
    ["src/pages/privacy-policy.astro", _page7],
    ["src/pages/support.astro", _page8],
    ["src/pages/teams.astro", _page9],
    ["src/pages/terms-conditions.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ab1c3a6d-4b0d-4227-b2af-1bb815ce9e82",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
