import $ from "jquery";
import { Test1Class } from "./test1class";

export class TestClass {
  constructor() {
    this._beforeInit();
    this._initElems();
    this._initEvents();
  }

  _beforeInit() {
    this.TABS_SELECTOR = ".js-tabs > li";
    this.CURRENT_TAB_NAME = "CURRENT_TAB";
  }

  _initElems() {
    this.cookieController = new Test1Class();
    this.$tabs = $(this.TABS_SELECTOR);
  }

  _initEvents() {
    const self = this;
    this._loadTabState();
    this.$tabs.on("click", function() {
      self.cookieController.setCookie(self.CURRENT_TAB_NAME, $(this).index());
    });
    document.addEventListener(`changed_${this.CURRENT_TAB_NAME}`, () => {
      this._toggleActive();
    });
  }

  _loadTabState() {
    let index = this.cookieController.getCookie(this.CURRENT_TAB_NAME);
    if (index) {
      this.$tabs.closest(".active").removeClass("active");
      $(this.$tabs[index]).addClass("active");
    } else {
      this.cookieController.setCookie(this.CURRENT_TAB_NAME, 0);
      $(this.$tabs[0]).addClass("active");
    }
  }

  _toggleActive() {
    let index = this.cookieController.getCookie(this.CURRENT_TAB_NAME);
    this.$tabs.closest(".active").removeClass("active");
    $(this.$tabs[index]).addClass("active");
  }
}
