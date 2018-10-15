export default class Router {
  constructor() {
  }

  /**
		* @method start
    * @description 
	*/
  start() {
    let addressBarListener = setInterval(() => {
      let location = window.location.pathname;
      if (this.currentPage === location) return;

      for (let i in this.pages) {
        if (this.pages[i].url === location) {
          this.pages[i].method();
          this.currentPage = this.pages[i].url;
        }
      }
    }, 1000);
  }

  /**
   * @method pagesRegistration
   * @description Inner method - page registration, creating the object with page-name, page-url, method for page and HTMLAnchorElement for page.
   */
  pagesRegistration() {
    this.pages = {};
    let anchors = document.querySelectorAll('a');
    
    anchors.forEach(elem => {
      if (elem.getAttribute('href')) {
        this.pages[elem.name] = {};
        this.pages[elem.name].url = elem.getAttribute('href');
        this.pages[elem.name].method = this[elem.name];
        this.pages[elem.name].element = elem;
      }
    });
    return this.pages;
  }

  /**
   * @method initEvents(elem)
   * @description Inner method - creating events for click (click on HTMLAnchorElement).
   */
  initEvents(elem) {
    elem.addEventListener(
      'click',
      e => {
        let target = e.target;
        if (target.getAttribute('href')) {
          e.preventDefault();
          this.currentPage = this.pages[target.name].url;
          this.pages[target.name].method();
        }
      },
      true
    );
  }

  setCurentPage(name) {
    this.currentPage = this.pages[name].url;
    window.history.pushState({}, '', this.pages[name].url);
  }
}