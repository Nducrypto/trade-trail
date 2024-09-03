import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  createChatKey,
  sendMessageToDatabase,
  fetchAllChatFromDatabase,
  getUnreadUserMessages,
  markMessagesAsReadInDatabase,
} from '../../../controller/chats';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {
  screenNames,
  NavigationProps,
  RootStackParamList,
} from '../../../screen';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {chatStyles} from './chatStyles';
import themes from '../../../config/themes';
import {useUser} from '../../../hook/useUser';
import {useGlobalState} from '../../../hook/useGlobal';
import {useChat, ChatMessage} from '../../../hook/useChat';
import {mergeSort} from '../../../utils/sortUtils';

const ChatScreen = () => {
  fetchAllChatFromDatabase();
  const {params} = useRoute<RouteProp<RootStackParamList, 'ChatScreen'>>();
  const reciepient = params;
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const navigation = useNavigation<NavigationProps>();
  const {toastError} = useGlobalState();
  const {currentUser} = useUser();
  const {allChats} = useChat();
  const currentUserId = currentUser.userId;
  const reciepientId = reciepient.profileId;

  const currentUserName = currentUser.userName;
  const reciepientName = reciepient.profileName;

  const chatIdKey = createChatKey(currentUserId, reciepientId);
  const chatNameKey = createChatKey(currentUserName, reciepientName);

  const chats = allChats[chatIdKey]?.chat[chatNameKey] ?? [];
  const sortedDialogueByTime = mergeSort(chats, (a, b) => {
    return a?.timestamp - b?.timestamp;
  });

  const extractUnreadMessage: ChatMessage[] = getUnreadUserMessages(
    currentUser?.userId,
    sortedDialogueByTime,
  );
  const unreadmessageLength = extractUnreadMessage.length;

  const handleUpdateUnread = () => {
    markMessagesAsReadInDatabase(currentUser.userId, extractUnreadMessage);
  };

  useEffect(() => {
    if (unreadmessageLength > 0) {
      handleUpdateUnread();
    }
  }, [unreadmessageLength]);

  useEffect(() => {
    const scrollToBottom = () => {
      scrollViewRef?.current?.scrollToEnd({animated: false});
    };
    scrollToBottom();
  }, [sortedDialogueByTime]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    const messageData = {
      timestamp: new Date().getTime(),
      message: message,
      senderId: currentUserId,
      reciepientId,
      readStatus: {[currentUserId]: 'read', [reciepientId]: 'unRead'},
      senderName: currentUserName,
      reciepientName: reciepient.profileName,
    };
    sendMessageToDatabase(messageData as ChatMessage, toastError);
    setMessage('');
  };

  function isCurrentUserMessage(senderId: string) {
    return senderId === currentUser?.userId;
  }
  if (!currentUser?.email) {
    return (
      <TouchableOpacity
        testID="sign-in-btn"
        style={chatStyles.signInCon}
        onPress={() => navigation.navigate(screenNames.signIn)}>
        <Text style={chatStyles.signInText}>Please Sign in to continue</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={chatStyles.container}>
      <View style={chatStyles.content}>
        <ScrollView
          ref={scrollViewRef}
          style={chatStyles.messages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={chatStyles.messagesContainer}>
          {sortedDialogueByTime.map((data: any) => (
            <View key={data.chatId} style={chatStyles.item}>
              <View
                style={{
                  ...chatStyles.messageCon,
                  ...(data.senderId === currentUser?.userId && {
                    justifyContent: 'flex-end',
                  }),
                }}>
                <View>
                  <View
                    style={{
                      ...chatStyles.message,
                      ...(isCurrentUserMessage(data.senderId) && {
                        backgroundColor: themes.COLORS.BUTTON_COLOR,
                      }),
                    }}>
                    <Text
                      style={{
                        ...chatStyles.messageText,
                        ...(isCurrentUserMessage(data.senderId) && {
                          color: themes.COLORS.WHITE,
                        }),
                      }}>
                      {data.message}
                    </Text>
                  </View>
                  <View>
                    <Text style={chatStyles.messageDate}>
                      {moment(new Date(data.timestamp).toISOString()).format(
                        'h:mm A',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={chatStyles.messageInput}>
          <TouchableOpacity
            onPress={handleSendMessage}
            testID="button"
            disabled={!message}>
            <Entypo
              size={16}
              name="camera"
              style={{paddingRight: 8, color: themes.COLORS.MUTED}}
            />
          </TouchableOpacity>

          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Message"
            style={chatStyles.input}
            placeholderTextColor="grey"
            testID="chat-input"
          />
        </View>
      </View>
    </View>
  );
};
export default ChatScreen;
