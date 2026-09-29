const registrationTemplate: string = `
      <main class='page page_layout_vertical'>
        <h1 class='title title_theme_dark'>MEssageME</h1>
        <form class='form' id='reg-form' novalidate>
          <h2 class='form__title'>Registration</h2>
          <div class='form__fields'>
            <div class='form__label-wrapper'>
              <label class='form__label' for='login'>Login</label>
              <input class='form__input' name='login' id='login' type='text' placeholder='Enter login' aria-describedby='login-input__error'>
              <p id='login-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>

            <div class='form__label-wrapper'>
              <label class='form__label' for='email'>Email</label>
              <input class='form__input' name='email' id='email' type='email' placeholder='Enter email' aria-describedby='email-input__error'>
              <p id='email-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
            
            <div class='form__label-wrapper'>
              <label class='form__label' for='password'>Password</label>
               <div class='form__input-wrapper'>
                  <input class='form__input' name='password' id='password' type='password' placeholder='Enter password' autocomplete='new-password' aria-describedby='password-input__error'>
                  <button id='pass-button' class='button button_type_img button_input' type='button' aria-controls='password' aria-label='Show password'>
                    <img src='{{revealIcon}}' alt='Show password'>
                  </button>
                </div>
                <p id='password-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
            
            <div class='form__label-wrapper'>
              <label class='form__label' for='repeat-password'>Password one more time</label>
              <div class='form__input-wrapper'>
                  <input class='form__input' name='repeat-password' id='repeat-password' type='password' placeholder='Repeat password' autocomplete='new-password' aria-describedby='repeat-password-input__error'>
                  <button id='pass-rep-button' class='button button_type_img button_input' type='button' aria-controls='repeat-password' aria-label='Show repeat password'>
                    <img src='{{revealIcon}}' alt='Show alt password'>
                  </button>
                </div>
                <p id='repeat-password-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
          </div>
          <button id='submit-button' class='form__submit-button' type='submit'>Register account</button>
          <a href='{{loginFormHref}}'>Log in</a>
        </form>
      </main>
`;

export default registrationTemplate;
