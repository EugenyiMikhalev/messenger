import Templator from "../../utils/templator/templator";
import userIcon from "../../assets/icons/user.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import sendIcon from "../../assets/icons/send.svg";
import searchIcon from "../../assets/icons/search.svg";
import deleteIcon from "../../assets/icons/delete.svg";

const chatsStr = `
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
            <textarea name='message' id='message' class='chat__input' placeholder='Type your message...'></textarea>
            <button class='button button_type_img'>
              <img src='{{sendIcon}}'>
            </button>
          </div>
        </div>
        </section> 
      </main>
`;

const chatsTmpl = new Templator(chatsStr);
// console.log(loginTmpl);

const context = {
  userName: "Вася Пупкин",
  userIcon: userIcon,
  settingsIcon,
  chatTitle: "Иван Иванов",
  messages: [
    { text: "го доту", time: "13-09-2026-13:49", sender: "Иван Иванов" },
    { text: "алле", time: "13-09-2026-14:19", sender: "Иван Иванов" },
    { text: "ОТСТАНЬ!!!", time: "13-09-2026-14:20", sender: "Вася Пупкин" },
  ],
  sendIcon,
  searchIcon,
  deleteIcon,
};

const renderedTemplate = chatsTmpl.compile(context);
console.log(chatsTmpl);
renderedTemplate.forEach((element) => document.body.append(element));
