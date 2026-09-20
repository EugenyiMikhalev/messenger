const registrationStr = `
      <main class='{{pageClasses}}'>
        <h1 class='{{pageTitleClasses}}'>MEssageMe</h1>
        <form class='{{loginFormClasses}}'>
          <h2 class='{{loginFormTitleClasses}}'>Registration</h2>
          <label class='{{loginlabelClasses}}' for='login'>Login
          <input class='{{loginInputClasses}}' id='login' type='text' placeholder='enter login'>
          </label>
          <label class='{{loginlabelClasses}}' for='password'>Password
          <input class='{{loginInputClasses}}' id='password' type='password' placeholder='enter password'>
          </label>
          <button onClick='{{handleClick}}' class='{{loginButtonClasses}}' type='submit'>Register account</button>
          <a href='{{loginFormHref}}'>Log in</a>
        </form>
      </main>
`;

const registrationTmpl = new window.Templator(registrationStr);
// console.log(loginTmpl);

const context = {
  pageClasses: "page page_layout_vertical",
  pageTitleClasses: "title title_theme_dark",

  loginFormClasses: "form",
  loginFormTitleClasses: "form__title",
  loginlabelClasses: "form__label",
  handleClick: () => {
    console.log("click handled");
  },
  loginInputClasses: "form__input",
  loginButtonClasses: "form__submit-button",
  loginFormHref: "/login",
};

const renderedTemplate = registrationTmpl.compile(context);
console.log(registrationTmpl);
renderedTemplate.forEach((element) => document.body.append(element));
