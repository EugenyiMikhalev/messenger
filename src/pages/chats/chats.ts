import Templator from "../../utils/templator/templator";
import chatsPageTemplate from "./chats.tmpl";

import userIcon from "../../assets/icons/user.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import sendIcon from "../../assets/icons/send.svg";
import searchIcon from "../../assets/icons/search.svg";
import deleteIcon from "../../assets/icons/delete.svg";

import data from "../../data/test";

import { Chat } from "../../types/Chat";
import { User } from "../../types/User";

type ChatsPageData = {
  user: User;
  chat: Chat;
};

const timeFormatter = new Intl.DateTimeFormat("ru-Ru", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Moscow",
});

function renderChats({ user, chat }: ChatsPageData): HTMLElement[] {
  const messages = chat.messages.map((message) => ({
    ...message,
    time: timeFormatter.format(message.time),
  }));

  const context = {
    userName: user.userName,
    chatTitle: chat.title,
    messages,
    userIcon,
    settingsIcon,
    sendIcon,
    searchIcon,
    deleteIcon,
  };

  const templator = new Templator(chatsPageTemplate);

  return templator.compile(context);
}

renderChats(data).forEach((element) => document.body.append(element));
