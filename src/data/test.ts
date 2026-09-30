import { Chat } from "../types/Chat";
import { User } from "../types/User";

const data: {
  user: User;
  chat: Chat;
} = {
  user: {
    login: "King228",
    id: "12321312421",
    email: "burgerking@mail.ru",
    name: "Вася Пупкин",
    lastOnline: new Date("2026-09-13T14:21:11+03:00"),
    registrationDate: new Date("2026-09-11T10:11:11+03:00"),
  },
  chat: {
    id: "322",
    title: "Иван Иванов",
    participantsId: ["12321312421", "3214124123"],
    messages: [
      {
        id: "message-1",
        text: "го доту",
        time: new Date("2026-09-13T13:49:00+03:00"),
        senderId: "Иван Иванов",
      },
      {
        id: "message-2",
        text: "алле",
        time: new Date("2026-09-13T14:19:00+03:00"),
        senderId: "Иван Иванов",
      },
      {
        id: "message-3",
        text: "ОТСТАНЬ!!!",
        time: new Date("2026-09-13T14:20:01+03:00"),
        senderId: "Вася Пупкин",
      },
    ],
  },
};

export default data;
