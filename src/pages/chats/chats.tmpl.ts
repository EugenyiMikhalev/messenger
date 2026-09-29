const chatsPageTemplate = `
      <main class='page page_layout_horizontal'>
        <section class='side-bar'>
          <div class='side-bar__info'>
            <img class='side-bar__info__img' src='{{userIcon}}'>
            <span>{{userName}}</span>
            <button class='button button_type_img'>
              <img src='{{settingsIcon}}'>
            </button>
          </div>
          <div class='chatlist'>
            <ul class='chatlist__list'>
              <li class='chatlist__chat chatlist__chat_active'>Иван Иванов: го дота</li>
              <li class='chatlist__chat'>Босс: ты где епты?</li>
            </ul>
          </div>
        </section>
        <section class='main-column'>
        <span class='no-opened-chats-text_hide'>Откройте чат из списка слева</span>
        <div class='chat'>
          <div class='chat__top'>
            <img class='side-bar__info__img' src='{{userIcon}}'>
            <span class='chat__title'>{{chatTitle}}</span>

            <div class='search'>
              <input class='search__input' placeholder='Search...'>
              <button class='button button_type_img'>
                <img src='{{searchIcon}}'>
              </button>
            </div>
            <button class='button button_type_img'>
                <img src='{{deleteIcon}}'>
            </button>
          </div>
          <div class='bubbles'>
            <div class='bubbles__bubble'>
              <span class='bubbles__message'>{{messages.0.text}}</span>
              <span class='bubbles__time'>{{messages.0.time}}</span>
            </div>
            <div class='bubbles__bubble'>
              <span class='bubbles__message'>{{messages.1.text}}</span>
              <span class='bubbles__time'>{{messages.1.time}}</span>
            </div>
            <div class='bubbles__bubble bubbles__bubble_self'>
              <span class='bubbles__message'>{{messages.2.text}}</span>
              <span class='bubbles__time'>{{messages.2.time}}</span>
            </div>
          </div>
          <div class='chat__bottom'>
            <form id='message-form' class='message-form'>
              <div>
              <textarea name='message' id='message' class='chat__input' placeholder='Type your message...' rows='1' aria-describedby='message-error' aria-label='message-input'></textarea>
              <p id='message-error' class='form__error-text form__error-text_hide' aria-live='polite'></p>
              </div>
              <button id='send-button' class='button button_type_img' type='submit'>
                <img src='{{sendIcon}}' alt='Send message'>
              </button>
            </form>
          </div>
        </div>
        </section> 
      </main>
`;

export default chatsPageTemplate;
