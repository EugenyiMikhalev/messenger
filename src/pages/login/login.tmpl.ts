import Templator from "../../utils/templator/templator";

const loginStr: any = `
      <main class='{{pageClasses}}'>
        <h1 class='{{pageTitleClasses}}'>MEssageMe</h1>
        <form class='{{loginFormClasses}}'>
          <h2 class='{{loginFormTitleClasses}}'>Authorization</h2>
          <label class='{{loginlabelClasses}}' for='login'>Login
          <input class='{{loginInputClasses}}' id='login' type='text' placeholder='enter login'>
          </label>
          <label class='{{loginlabelClasses}}' for='password'>Password
          <input class='{{loginInputClasses}}' id='password' type='password' placeholder='enter password'>
          </label>
          <button onClick='{{handleClick}}' class='{{loginButtonClasses}}' type='submit' submit>Login</button>
          <a href='{{loginFormHref}}'>Create an account</a>
        </form>
      </main>
`;

const loginTmpl = new Templator(loginStr);
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
  loginFormHref: "/register",
};

const renderedTemplate = loginTmpl.compile(context);
console.log(renderedTemplate);
renderedTemplate.forEach((element: HTMLElement) =>
  document.body.append(element),
);
