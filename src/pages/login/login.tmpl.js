const loginStr = `
      <span>Авторизация</span>
      <div>
      <label class='{{loginlabel}}' for='{{login1}}'>Логин</label>
      <input id='login' type='text' placeholder='enter login'></input>
      <label for='password'>Пароль</label>
      <input id='password' type='password' placeholder='enter password'></input>
      </div>
      <button onClick="{{handleClick}}" class='{{buttonClasses}}'>press me</button>
`;

const loginTmpl = new window.Templator(loginStr);

const context = {
  loginlabel: "form__label",
  handleClick: () => {
    console.log("click handled");
  },
  login1: "login",
  buttonClasses: "form form__submit-button",
};

const renderedTemplate = loginTmpl.compile(context);

const loginStr1 = `
    
      <button onClick="{{handleClick}}" class='{{buttonClasses}}'>press me</button>
`;

const loginTmpl1 = new window.Templator(loginStr1);

const context1 = {
  handleClick: () => {
    console.log("click handled1");
  },
};

const renderedTemplate1 = loginTmpl1.compile(context1);
