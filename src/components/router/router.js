export default class Router {
  constructor ({element}) {
      this.element = element;
      this.pages = {};
  }

  /**
   * Пеперйти на заданный путь
   * @param {strin} path
   * @returns {boolean} если путь не найден - false
   */
  go (path) {
      let pageView = this.pages[path];

      if (!pageView) {
          return false;
      }

      pageView.show();

      if (this._currentView) {
          this._currentView.hide();
      }

      this._currentView = pageView;

      window.history.pushState({}, '', path);

      return true;
  }

  /**
   * @param {string} path
   * @param {PageView} pageView
   */
  register (path, pageView) {
      this.pages[path] = pageView;
  }

  start () {
      this.element.addEventListener('click', event => {
          if (!(event.target instanceof HTMLAnchorElement)) {
              return;
          }

          if (this.go(event.target.getAttribute('href'))) {
              event.preventDefault();
          }
      });

      window.location.reload(false);
    //   window.addEventListener('popstate', event => {
    //       console.log('hey')
    //       this.go(location.pathname);
    //   });
  }
}