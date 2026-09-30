const loginPageTemplate: string = `
      <main class='page page_layout_vertical'>
        <h1 class='title title_theme_dark'>MEssageME</h1>
        <form class='form' id='login-form' novalidate>
          <h2 class='form__title'>Authorization</h2>
          <div class='form__label-wrapper'>
            <label class='form__label' for='login'>Login</label>
            <input class='form__input' name='login' id='login' type='text' placeholder='Enter login' aria-describedby='login-input__error'>
            <p id='login-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
          </div>
          <div class='form__label-wrapper'>
            <label class='form__label' for='password'>Password</label>
            <div class='form__input-wrapper'>
              <input class='form__input' name='password' id='password' type='password' placeholder='Enter password' autocomplete='current-password' aria-describedby='password-input__error'>
              <p id='password-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
          </div>
          <button id='submit-button' class='form__submit-button' type='submit'>Login</button>
          <a href='{{loginFormHref}}'>Create an account</a>
        </form>
      </main>
`;

export default loginPageTemplate;
