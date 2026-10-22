const regFormTemplate: string = `
        <h2 class='form__title'>Registration</h2>
        <div class='form__fields'>
        <div class='form__label-wrapper'>
            <label class='form__label' for='login'>Login</label>
            <div class='form__input-wrapper'>
                {{loginInput}}
                <p id='login-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
        </div>

        <div class='form__label-wrapper'>
            <label class='form__label' for='email'>Email</label>
            <div class='form__input-wrapper'>
                {{emailInput}}
                <p id='email-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
        </div>
        
        <div class='form__label-wrapper'>
            <label class='form__label' for='password'>Password</label>
            <div class='form__input-wrapper'>
                {{passInput}}
                {{showPassBtn}}
                <p id='password-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
        </div>
        
        <div class='form__label-wrapper'>
            <label class='form__label' for='repeat-password'>Password one more time</label>
            <div class='form__input-wrapper'>
                {{passRepeatInput}}
                {{showPassRepBtn}}
                <p id='repeat-password-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
            </div>
        </div>
        </div>
        {{submitButton}}
        {{loginLink}}
`;

export default regFormTemplate;
