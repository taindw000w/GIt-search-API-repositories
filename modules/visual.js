export class VisualContent {
  constructor() {
    this.html = document.querySelector("html");
    this.body = document.querySelector("body");

    this.outerWrapper = this.createElement("div", "wrapper");
    this.innerWrapper = this.createElement("div", "wrapper-box");
    this.input = this.createElement("input", "wrapper-box__input");
    this.searchWrapperResult = this.createElement("ul", "wrapper-menu-search");
    this.spanInfoName = this.createElement("span", "wrapper-menu-search");

    this.clickBoxResult = this.createElement("div", "box-result-item");

    this.body.append(this.outerWrapper);
    this.body.append(this.clickBoxResult);

    this.outerWrapper.append(this.innerWrapper);

    this.innerWrapper.append(this.input);
    this.innerWrapper.append(this.searchWrapperResult);
  }

  createElement(elemTag, elemClass) {
    const element = document.createElement(elemTag);
    if (elemClass) {
      element.classList.add(elemClass);
    }
    return element;
  }

  createUser(userData, context) {
    this.listItem = this.createElement("li", "wrapper-menu-search__item");
    this.listItem.textContent = `${userData.name}`;
    this.searchWrapperResult.append(this.listItem);
    this.listItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.clickBoxResult.style.display === "") {
        this.clickBoxResult.style.display = "block";
      }
      this.clickBoxResult.innerHTML += `<div class="box-result">Name: ${userData.name}<br>Owner: ${userData.owner.login}<br>Stars: ${userData.stargazers_count}<button class="btn-close"></button></div>`;
      this.input.value = "";
      context.clearUsers();
      if (this.clickBoxResult.innerText !== "") {
        this.clickBoxResult.addEventListener("click", this.deleteUser);
      }
    });
  }

  deleteUser() {
    let target = event.target;
    if (!target.classList.contains("btn-close")) return;
    target.parentElement.remove();
  }
}
