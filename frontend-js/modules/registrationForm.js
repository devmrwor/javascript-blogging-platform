class RegistrationForm {
  constructor() {
    this.allFields = document.querySelectorAll(
      "#registration-form .form-control"
    );
    this.insertValidationElements();
    this.username = document.querySelector("#username-register");
    this.username.previousValue = "";
    this.events();
  }
  // events
  events() {
    this.username.addEventListener("keyup", () => {
      this.isDifferent(this.username, this.usernameHandler);
    });
  }
  // methods
  isDifferent(inputValue, handler) {
    if (inputValue.previousValue != inputValue.value) {
      handler.call(this);
    }
    inputValue.previousValue = inputValue.value;
  }

  usernameHandler() {
    this.username.errors = false;
    this.usernameImmediately();
    clearTimeout(this.username.timer);
    this.username.timer = setTimeout(() => this.usernameAfterDelay(), 3000);
  }

  usernameImmediately() {
    if (
      this.username.value != "" &&
      !/^([a-zA-Z0-9]+)$/.test(this.username.value)
    ) {
      this.showValidationError(
        this.username,
        "Username can only contain letters and numbers."
      );
    }
    if (this.username.value.length > 30) {
      this.showValidationError(
        this.username,
        "Username cannot exceed 30 characters."
      );
    }

    if (!this.username.errors) {
      this.hideValidationError(this.username);
    }
  }

  usernameAfterDelay() {
    if (this.username.value.length < 3) {
      this.showValidationError(
        this.username,
        "Username must be at least 3 characters."
      );
    }
  }

  showValidationError(el, message) {
    el.nextElementSibling.innerHTML = message;
    el.nextElementSibling.classList.add("liveValidateMessage--visible");
    el.errors = true;
  }

  hideValidationError(el) {
    el.nextElementSibling.classList.remove("liveValidateMessage--visible");
  }

  insertValidationElements() {
    this.allFields.forEach((field) => {
      field.insertAdjacentHTML(
        "afterend",
        '<div class="alert alert-danger small liveValidateMessage"></div>'
      );
    });
  }
}

export default RegistrationForm;
