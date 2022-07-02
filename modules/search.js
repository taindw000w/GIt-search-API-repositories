const USER_PER_PAGE = 5;
export class Search {
  constructor(view) {
    this.view = view;
    this.view.input.addEventListener(
      "keyup",
      this.debounce(this.search.bind(this), 500)
    );
  }

  async search() {
    if (this.view.input.value) {
      return await fetch(
        `https://api.github.com/search/repositories?q=${this.view.input.value}&per_page=${USER_PER_PAGE}`
      ).then((res) => {
        if (res.ok) {
          if (
            this.view.input.value.length !==
            this.view.input.value.length - 1
          ) {
            this.clearUsers();
            res.json().then((res) => {
              res.items.forEach((person) => this.view.createUser(person, this));
            });
          }
        }
      });
    } else {
      this.clearUsers();
    }
  }

  clearUsers() {
    this.view.searchWrapperResult.innerHTML = "";
  }


  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
