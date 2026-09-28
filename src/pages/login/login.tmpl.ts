const loginPageTemplate: string = `
      <main class='page page_layout_vertical'>
        <h1 class='title title_theme_dark'>MEssageMe</h1>
        <form class='form' id='login-form' novalidate>
          <h2 class='form__title'>Authorization</h2>
          <label class='form__label' for='login'>Login
          <input class='form__input' name='login' id='login' type='text' placeholder='Enter login'>
          </label>
          <p id='login-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
          <label class='form__label' for='password'>Password
          <input class='form__input' name='password' id='password' type='password' placeholder='Enter password'>
          </label>
           <p id='password-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
          <button id='submit-button' class='form__submit-button' type='submit'>Login</button>
          <a href='{{loginFormHref}}'>Create an account</a>
        </form>
      </main>
`;

export default loginPageTemplate;
