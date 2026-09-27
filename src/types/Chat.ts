import { Message } from "./Message";

export type Chat = {
  id: string;
  messages: Message[];
  participantsId: string[];
  title: string;
};
