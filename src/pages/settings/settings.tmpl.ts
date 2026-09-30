const settingsTemplate: string = `
  <main class='page page_layout_horizontal'>
    <section class='section'>
      <h1 class='title title_theme_dark'>Settings</h1>
      <form class='form' id='settings-form' novalidate>
        <div class='form__input-wrapper'>
          <label class='form__label' for='login-input'>Login</label>
          <input id='login-input' name='login' class='form__input' value='{{login}}' type='text' placeholder='Enter new login...' aria-describedby='login-input__error'>
          <p id='login-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
        </div>
        <div class='form__input-wrapper'>
          <label class='form__label' for='name-input'>Name</label>
          <input id='name-input' name='name' class='form__input' value='{{name}}' type='text' placeholder='Enter new name...' aria-describedby='name-input__error'>
          <p id='name-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
        </div>
        <div class='form__input-wrapper'>
          <label class='form__label' for='email-input'>Email</label>
          <input id='email-input' name='email' class='form__input' value='{{email}}' type='email' autocomplete='email' placeholder='Enter new email...' aria-describedby='email-input__error'>
          <p id='email-input__error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
        </div>
        <button id='submit-button' class='form__submit-button' type='submit'>save</button>
      </form>
    </section>
  </main>
`;

export default settingsTemplate;
