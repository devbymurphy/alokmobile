const transitionMs = 620;
const routeStorageKey = 'alok-page-transition-route';

function getRouteName(urlLike = window.location.href) {
  const url = new URL(urlLike, window.location.href);
  const path = url.pathname.toLowerCase();

  if (path.endsWith('/stock.html')) return 'stock';
  if (path.endsWith('/product.html')) return 'product';
  if (path.endsWith('/index.html') || path.endsWith('/')) return 'home';
  return 'default';
}

function getRouteLabel(routeName) {
  if (routeName === 'stock' || routeName === 'product') return 'AM';
  return 'AM';
}

function createTransitionLayer() {
  let layer = document.querySelector('.page-transition-layer');
  if (layer) return layer;

  layer = document.createElement('div');
  layer.className = 'page-transition-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `
    <div class="page-transition-panel">
      <span class="transition-mark">AM</span>
      <span class="transition-line"></span>
    </div>
  `;
  document.body.appendChild(layer);
  return layer;
}

function isModifiedClick(event) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function shouldTransition(link) {
  if (!link) return false;
  if (link.target && link.target !== '_self') return false;
  if (link.hasAttribute('download')) return false;

  const href = link.getAttribute('href');
  if (!href || href.startsWith('#')) return false;
  if (/^(tel:|mailto:|sms:|whatsapp:|javascript:)/i.test(href)) return false;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return false;

  const samePageHash = url.pathname === window.location.pathname
    && url.search === window.location.search
    && url.hash;
  if (samePageHash) return false;

  return true;
}

function startPageExit(url, forcedRoute) {
  const layer = createTransitionLayer();
  const routeName = forcedRoute || getRouteName(url);
  const mark = layer.querySelector('.transition-mark');
  if (mark) mark.textContent = getRouteLabel(routeName);
  layer.dataset.route = routeName;
  document.body.dataset.transitionRoute = routeName;
  sessionStorage.setItem(routeStorageKey, routeName);
  document.body.classList.add('page-is-leaving');
  layer.classList.add('is-active');

  window.setTimeout(() => {
    window.location.href = url;
  }, transitionMs);
}

function bindDirectStockLinks() {
  document.querySelectorAll('a[href*="stock.html"]').forEach(link => {
    link.dataset.forcePageTransition = 'stock';
    link.classList.add('has-stock-page-transition');
  });
}

function bindPageTransitions() {
  const layer = createTransitionLayer();
  const entryRoute = sessionStorage.getItem(routeStorageKey) || getRouteName();
  sessionStorage.removeItem(routeStorageKey);
  document.body.dataset.transitionRoute = entryRoute;
  layer.dataset.route = entryRoute;
  const mark = layer.querySelector('.transition-mark');
  if (mark) mark.textContent = getRouteLabel(entryRoute);
  document.body.classList.add('page-has-entered');
  bindDirectStockLinks();

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-is-leaving');
    document.querySelector('.page-transition-layer')?.classList.remove('is-active');
    document.body.classList.add('page-has-entered');
  });

  document.addEventListener('click', event => {
    if (isModifiedClick(event)) return;

    const link = event.target.closest('a[href]');
    const card = event.target.closest('[data-href]');

    if (!link && card?.dataset.href) {
      event.preventDefault();
      event.stopPropagation();
      startPageExit(new URL(card.dataset.href, window.location.href).href);
      return;
    }

    if (!shouldTransition(link)) return;

    event.preventDefault();
    event.stopPropagation();
    startPageExit(link.href, link.dataset.forcePageTransition);
  }, true);
}

window.startPageTransition = startPageExit;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindPageTransitions);
} else {
  bindPageTransitions();
}
