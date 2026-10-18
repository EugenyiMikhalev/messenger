export const LoginFormTemplate = `
        <h2 class='form__title'>Authorization</h2>
          <div class='form__label-wrapper'>
            <label class='form__label' for='login'>Login</label>
            <div class='form__input-wrapper'>
                {{loginInput}}
                <p id='login-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
          </div>
          <div class='form__label-wrapper'>
            <label class='form__label' for='password'>Password</label>
            <div class='form__input-wrapper'>
              {{passInput}}
              <p id='password-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
          </div>
          {{submitButton}}
          <a href='{{loginFormHref}}'>Create an account</a>
          `;
