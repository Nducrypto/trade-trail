import {
  firestore,
  doc,
  collection,
  updateDoc,
  onSnapshot,
} from '../config/firebase';
import {
  AllChatsProps,
  ChatCollection,
  ChatMessage,
  useChat,
} from '../hook/useChat';
import {useEffect} from 'react';
import {createInDatabase, removeInDatabase} from '../utils/firebaseUtils';
import {mergeSort} from '../utils/sortUtils';
import {CHATS} from '@env';

const chatsRoute = CHATS;

type Toast = (value: string) => void;
export const sendMessageToDatabase = async (
  data: ChatMessage,
  toastError: Toast,
) => {
  try {
    await createInDatabase(chatsRoute, data);
  } catch (error) {
    toastError('Failed to send Chat');
  }
};

export const fetchAllChatFromDatabase = () => {
  const {storeAllChats, setChatLoading} = useChat();

  useEffect(() => {
    setChatLoading(true);
    const listenForChangeInChats = onSnapshot(
      collection(firestore, chatsRoute),
      snapshot => {
        const updatedChats: Record<string, ChatCollection> = {};
        snapshot.forEach(doc => {
          const data = doc.data() as ChatMessage;
          if (data?.timestamp) {
            const senderId = data.senderId;
            const reciepientId = data.reciepientId;
            const senderName = data.senderName;
            const reciepientName = data.reciepientName;
            const chatIdKey = createChatKey(senderId, reciepientId);
            const chatNameKey = createChatKey(senderName, reciepientName);

            if (!updatedChats[chatIdKey]) {
              updatedChats[chatIdKey] = {chat: {}};
            }
            if (!updatedChats[chatIdKey].chat[chatNameKey]) {
              updatedChats[chatIdKey].chat[chatNameKey] = [];
            }

            updatedChats[chatIdKey].chat[chatNameKey].push({
              ...data,
              chatId: doc.id,
              date: new Date(data.timestamp).toString(),
            });
          }
        });

        storeAllChats(updatedChats);
      },
    );

    return () => {
      listenForChangeInChats();
    };
  }, [storeAllChats]);
};

export const markMessagesAsReadInDatabase = async (
  userId: string,
  array: ChatMessage[],
) => {
  try {
    for (const message of array) {
      if (message.chatId) {
        const messageDocRef = doc(firestore, chatsRoute, message.chatId);
        await updateDoc(messageDocRef, {
          readStatus: {
            [userId]: 'read',
          },
        });
      }
    }
  } catch (error) {
    throw new Error('Failed to update unread message');
  }
};

export const deleteChatById = async (chatId: string) => {
  try {
    await removeInDatabase(chatsRoute, chatId);
  } catch (error) {
    throw Error('Failed to delete chat:');
  }
};

export const aggregateChatsForUser = (
  userId: string,
  allChats: AllChatsProps,
) => {
  const chatCollection: ChatCollection = {chat: {}};
  for (const key in allChats) {
    if (key.includes(userId)) {
      const chatEntries = allChats[key].chat;
      chatCollection.chat = {...chatCollection.chat, ...chatEntries};
    }
  }
  return chatCollection;
};

export function getUnreadUserMessages(userId: string, messages: ChatMessage[]) {
  return messages.filter(item => item.readStatus[userId] === 'unRead');
}

export const countUnreadMessages = (
  userId: string,
  allChatData: AllChatsProps,
) => {
  const userChatCollection = aggregateChatsForUser(userId, allChatData);
  const allUserMessages = Object.values(userChatCollection.chat).flat();
  const unreadMessages = getUnreadUserMessages(userId, allUserMessages);

  return unreadMessages.length;
};

type ChatEntry = [string, ChatMessage[]];
export const sortChatsByRecentSender = (chats: ChatEntry[]) => {
  const compareChatsByLastMessage = (a: ChatEntry, b: ChatEntry) => {
    const lastMessageA = a[1][a[1].length - 1];
    const lastMessageB = b[1][b[1].length - 1];

    const timestampA = lastMessageA?.timestamp || 0;
    const timestampB = lastMessageB?.timestamp || 0;

    return timestampB - timestampA;
  };
  const sortedConversations = mergeSort(chats, compareChatsByLastMessage);
  return sortedConversations;
};

export const createChatKey = (firstPart: string, secondPart: string) => {
  return [firstPart, secondPart].sort().join('&');
};
