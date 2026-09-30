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
import { validateField } from "../../utils/validation/validateField";
import { validateMessage } from "../../utils/validation/validators";

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
    login: user.login,
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

const render = renderChats(data);

function addEvents(render: HTMLElement[]) {
  const form: HTMLFormElement | null =
    render[0]?.querySelector("#message-form");
  const messageInput: HTMLTextAreaElement | null =
    render[0]?.querySelector("#message");
  const messageErrorEl: HTMLElement | null =
    render[0]?.querySelector("#message-error");

  if (!(form instanceof HTMLFormElement)) {
    throw new Error("Form does not exist in registration page");
  }

  if (!(messageInput instanceof HTMLTextAreaElement)) {
    throw new Error("Input does not exist in registration page");
  }

  if (!(messageErrorEl instanceof HTMLElement)) {
    throw new Error("Error text does not exist in registration page");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateField(messageInput, validateMessage, messageErrorEl)) return;

    const values: Record<string, FormDataEntryValue> = {};

    new FormData(form).forEach((value, name) => {
      values[name] = value;
    });

    console.log(values);
    messageInput.value = "";
    messageInput.style.height = "auto";
  });

  messageInput.addEventListener("input", () => {
    messageInput.style.height = "auto";
    messageInput.style.height = `${messageInput.scrollHeight}px`;
  });
}

addEvents(render);
render.forEach((element) => document.body.append(element));
