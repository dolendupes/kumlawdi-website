import 'piccolore';
import { v as decodeKey } from './chunks/astro/server_BVS5fME2.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BmNlpcRk.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/dolendupes/workspace/flex/kumlawdi-website/","cacheDir":"file:///Users/dolendupes/workspace/flex/kumlawdi-website/node_modules/.astro/","outDir":"file:///Users/dolendupes/workspace/flex/kumlawdi-website/dist/","srcDir":"file:///Users/dolendupes/workspace/flex/kumlawdi-website/src/","publicDir":"file:///Users/dolendupes/workspace/flex/kumlawdi-website/public/","buildClientDir":"file:///Users/dolendupes/workspace/flex/kumlawdi-website/dist/client/","buildServerDir":"file:///Users/dolendupes/workspace/flex/kumlawdi-website/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/create-payment-intent","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/create-payment-intent\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"create-payment-intent","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/create-payment-intent.ts","pathname":"/api/create-payment-intent","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/cookie-policy","isIndex":false,"type":"page","pattern":"^\\/cookie-policy\\/?$","segments":[[{"content":"cookie-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookie-policy.astro","pathname":"/cookie-policy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/credentials","isIndex":false,"type":"page","pattern":"^\\/credentials\\/?$","segments":[[{"content":"credentials","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/credentials.astro","pathname":"/credentials","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"},{"type":"inline","content":".social-account-card[data-astro-cid-adrakfm2]{transition:transform .2s ease}.social-account-card[data-astro-cid-adrakfm2]:hover{transform:translateY(-2px)}\n"}],"routeData":{"route":"/follow-us","isIndex":false,"type":"page","pattern":"^\\/follow-us\\/?$","segments":[[{"content":"follow-us","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/follow-us.astro","pathname":"/follow-us","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/support","isIndex":false,"type":"page","pattern":"^\\/support\\/?$","segments":[[{"content":"support","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/support.astro","pathname":"/support","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"},{"type":"inline","content":".carousel-container[data-astro-cid-sm2xkbpr]{display:flex;width:100%}.carousel-slide[data-astro-cid-sm2xkbpr]{flex:0 0 100%;width:100%;min-width:0}\n"}],"routeData":{"route":"/teams","isIndex":false,"type":"page","pattern":"^\\/teams\\/?$","segments":[[{"content":"teams","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/teams.astro","pathname":"/teams","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/terms-conditions","isIndex":false,"type":"page","pattern":"^\\/terms-conditions\\/?$","segments":[[{"content":"terms-conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms-conditions.astro","pathname":"/terms-conditions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.XXOx837J.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://kumlawdifoundation.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/cookie-policy.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/credentials.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/follow-us.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/support.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/teams.astro",{"propagation":"none","containsHead":true}],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/terms-conditions.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/create-payment-intent@_@ts":"pages/api/create-payment-intent.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/cookie-policy@_@astro":"pages/cookie-policy.astro.mjs","\u0000@astro-page:src/pages/credentials@_@astro":"pages/credentials.astro.mjs","\u0000@astro-page:src/pages/follow-us@_@astro":"pages/follow-us.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/support@_@astro":"pages/support.astro.mjs","\u0000@astro-page:src/pages/teams@_@astro":"pages/teams.astro.mjs","\u0000@astro-page:src/pages/terms-conditions@_@astro":"pages/terms-conditions.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CbgpYPLd.mjs","/Users/dolendupes/workspace/flex/kumlawdi-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_FzZBzwfN.mjs","/Users/dolendupes/workspace/flex/kumlawdi-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.CR7h3-g3.js","/Users/dolendupes/workspace/flex/kumlawdi-website/src/components/QuickDonateButton.astro?astro&type=script&index=1&lang.ts":"_astro/QuickDonateButton.astro_astro_type_script_index_1_lang.Bcct4H06.js","/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/follow-us.astro?astro&type=script&index=0&lang.ts":"_astro/follow-us.astro_astro_type_script_index_0_lang.BSBGdHsf.js","/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/support.astro?astro&type=script&index=0&lang.ts":"_astro/support.astro_astro_type_script_index_0_lang.CeXm1n03.js","/Users/dolendupes/workspace/flex/kumlawdi-website/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.x2VYlkko.js","/Users/dolendupes/workspace/flex/kumlawdi-website/src/components/QuickDonateButton.astro?astro&type=script&index=0&lang.ts":"_astro/QuickDonateButton.astro_astro_type_script_index_0_lang.C8R_V25D.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/follow-us.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const t=document.getElementById(\"follow-all-btn\"),l=document.querySelectorAll(\".social-account-card\");function s(e){const i=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent),n=e.dataset.appUrl,o=e.dataset.webUrl||e.href;if(i&&n){const r=window.open(n,\"_blank\",\"noopener,noreferrer\");setTimeout(()=>{(!r||r.closed||typeof r.closed>\"u\")&&window.open(o,\"_blank\",\"noopener,noreferrer\")},500)}else window.open(o,\"_blank\",\"noopener,noreferrer\")}l.forEach(e=>{e.addEventListener(\"click\",function(i){const n=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent),o=e.dataset.appUrl;n&&o&&(i.preventDefault(),s(e))})});const a=Array.from(l);t?.addEventListener(\"click\",function(){const e=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);e?confirm(`This will open ${a.length} social media pages. If you have the apps installed, they'll open directly. Continue?`)&&a.forEach((n,o)=>{setTimeout(()=>{s(n)},o*400)}):a.forEach((n,o)=>{setTimeout(()=>{const r=n.dataset.webUrl||n.href;window.open(r,\"_blank\",\"noopener,noreferrer\")},o*200)});const i=t.innerHTML;t.innerHTML=\"<span>Opening accounts...</span>\",t.disabled=!0,setTimeout(()=>{t.innerHTML=i,t.disabled=!1},a.length*(e?400:200)+500)})});"],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/pages/support.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"individual-sponsorships-toggle\"),t=document.getElementById(\"individual-sponsorships-content\"),e=document.getElementById(\"individual-sponsorships-icon\");n&&t&&e&&n.addEventListener(\"click\",()=>{const s=t.classList.contains(\"hidden\");t.classList.toggle(\"hidden\"),e.style.transform=s?\"rotate(180deg)\":\"rotate(0deg)\"});"],["/Users/dolendupes/workspace/flex/kumlawdi-website/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","const e=document.getElementById(\"mobile-menu-button\"),t=document.getElementById(\"mobile-menu\");e?.addEventListener(\"click\",()=>{t?.classList.toggle(\"hidden\")});const o=document.getElementById(\"mobile-teams-toggle\"),n=document.getElementById(\"mobile-teams-submenu\"),m=document.getElementById(\"mobile-teams-icon\");o?.addEventListener(\"click\",()=>{n?.classList.toggle(\"hidden\"),m?.classList.toggle(\"rotate-180\")});const l=document.getElementById(\"mobile-support-toggle\"),c=document.getElementById(\"mobile-support-submenu\"),s=document.getElementById(\"mobile-support-icon\");l?.addEventListener(\"click\",()=>{c?.classList.toggle(\"hidden\"),s?.classList.toggle(\"rotate-180\")});const i=document.getElementById(\"mobile-contact-toggle\"),d=document.getElementById(\"mobile-contact-submenu\"),g=document.getElementById(\"mobile-contact-icon\");i?.addEventListener(\"click\",()=>{d?.classList.toggle(\"hidden\"),g?.classList.toggle(\"rotate-180\")});"]],"assets":["/_astro/about.XXOx837J.css","/CNAME","/favicon.jpg","/_astro/Layout.astro_astro_type_script_index_0_lang.CR7h3-g3.js","/_astro/QuickDonateButton.astro_astro_type_script_index_0_lang.C8R_V25D.js","/_astro/QuickDonateButton.astro_astro_type_script_index_1_lang.Bcct4H06.js","/documents/kumlawdi-logo-1-.jpg","/documents/kumlawdi-logo-composite-black.jpg","/documents/kumlawdi-logo-composite-red.jpg","/documents/kumlawdi-logo-composite-white.jpg","/documents/kumlawdi-sponsorship-proposal.pdf","/videos/README.md","/images/ambrea-heashot.jpeg","/images/flex-logo-full.png","/images/flex-logo-grayscale-alt.png","/images/flex-logo-grayscale.png","/images/flex-logo-icon.png","/images/hector-headshot.jpeg","/images/kumlawdi-composite.jpg","/images/kumlawdi-logo-black.png","/images/kumlawdi-logo-monochrome.png","/images/kumlawdi-logo-white.png","/images/logo-black.jpg","/images/logo-red.jpg","/images/logo-white.jpg","/images/logo-zeffy.jpg","/images/p-headshot.jpeg","/images/yakpak-logo.jpg","/images/cartoons/cartoon-auto-1.jpg","/images/cartoons/cartoon-harry-1.jpg","/images/cartoons/cartoon-yak-1.jpg","/images/cartoons/cartoon-yak-2.jpg","/images/teams/flex-group-image-1.jpg","/images/teams/flex-group-image-2.jpg","/images/teams/flex-harry-1.jpg","/images/teams/flex-jahleel-1.jpg","/images/teams/flex-logo.jpg","/images/teams/yak-graffiti.jpg","/images/teams/yak-group-image-1.jpg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"HgY6tnbQJ4DnQqiiuyWwC87PfO5UsILeteQ4u3AFSt4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
