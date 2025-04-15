import {create} from 'zustand';

export interface ChatMessage {
  timestamp: number;
  senderId: string;
  reciepientId: string;
  message: string;
  chatId?: string;
  date?: string;
  senderName: string;
  reciepientName: string;
  readStatus: {[key: string]: string};
}
export interface ChatCollection {
  chat: Record<string, ChatMessage[]>;
}

export type AllChatsProps = Record<string, ChatCollection>;

export interface ChatState {
  allChats: AllChatsProps;
  loadingChat: boolean;
  chatError: boolean | string;
  storeAllChats: (Value: Record<string, ChatCollection>) => void;
  setChatLoading: (Value: boolean) => void;
}
const useChatStore = create<ChatState>(set => ({
  allChats: {},
  loadingChat: false,
  chatError: false,
  storeAllChats: (value: Record<string, ChatCollection>) =>
    set(state => ({
      ...state,
      allChats: value,
      loadingChat: false,
      chatError: false,
    })),
  setChatLoading: (value: boolean) =>
    set(state => ({
      ...state,
      loadingChat: value,
      chatError: false,
    })),
}));

export const useChat = () => {
  const {allChats, loadingChat, chatError, setChatLoading, storeAllChats} =
    useChatStore(state => state);
  return {allChats, loadingChat, chatError, setChatLoading, storeAllChats};
};
