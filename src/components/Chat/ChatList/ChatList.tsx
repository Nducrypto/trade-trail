import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {chatListStyles} from './chatListStyles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../../screen';
import {useUser} from '../../../hook/useUser';
import {ChatMessage, useChat} from '../../../hook/useChat';
import {
  fetchAllChatFromDatabase,
  countUnreadMessages,
  getUnreadUserMessages,
  sortChatsByRecentSender,
  aggregateChatsForUser,
} from '../../../controller/chats';
import {Avatar} from '@rneui/base';
import {hp} from '../../../config/appConfig';
import moment from 'moment';
import themes from '../../../config/themes';
import {useGlobalState} from '../../../hook/useGlobal';

const ChatList = () => {
  fetchAllChatFromDatabase();
  const navigation = useNavigation<NavigationProps>();
  const {updateUtilityTitle} = useGlobalState();
  const {currentUser} = useUser();
  const currentUserId = currentUser.userId || '';
  const {allChats} = useChat();

  const handleNavigation = (values: ChatMessage) => {
    const isReciepient = currentUserId === values.reciepientId;
    const profileId = isReciepient ? values?.senderId : values?.reciepientId;
    const profileName = isReciepient
      ? values?.senderName
      : values?.reciepientName;
    updateUtilityTitle(profileName);
    navigation.navigate(screenNames.chatScreen, {
      profileId,
      profileName,
    });
  };

  const chatCollection = aggregateChatsForUser(currentUser.userId, allChats);
  const uniqueDialogues = Object.entries(chatCollection.chat);
  const recentlyActiveChats = sortChatsByRecentSender(uniqueDialogues);

  const retrieveSenderName = (name: string) => {
    const userKeyPattern = /^(.*?)&(.*)$/;
    const match = name.match(userKeyPattern);
    const otherName = match
      ? match[1] !== currentUser.userName
        ? match[1]
        : match[2]
      : '';
    return otherName;
  };
  if (!currentUserId) {
    return (
      <TouchableOpacity
        testID="sign-in-btn"
        activeOpacity={0.7}
        style={chatListStyles.signInCon}
        onPress={() => navigation.navigate(screenNames.signIn)}>
        <Text style={chatListStyles.signInText}>
          Please Sign in to continue
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      scrollEnabled={recentlyActiveChats.length > 7}
      data={recentlyActiveChats}
      renderItem={({item, index}) => {
        const [key, messages] = item;
        const messageValues = Object.values(messages);
        const length = messageValues.length;
        const unreadCount = getUnreadUserMessages(
          currentUser.userId,
          messageValues,
        ).length;
        const hasUnreadMessages = unreadCount > 0;
        const recentMessageText = messageValues[length - 1]?.message ?? '';
        const recentMessageDate = messageValues[length - 1]?.date?.toString();
        const senderName = retrieveSenderName(key);

        return (
          <TouchableOpacity
            testID="chat-list-flatlist"
            activeOpacity={0.7}
            onPress={() => handleNavigation(messageValues[0])}
            key={index}
            style={chatListStyles.item}>
            <View style={chatListStyles.avatarAndNameContainer}>
              <Avatar
                size={hp('6%')}
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                containerStyle={chatListStyles.avatar}
              />
              <View>
                <Text style={chatListStyles.senderName} numberOfLines={1}>
                  {senderName}
                </Text>
                <Text style={chatListStyles.lastMessage} numberOfLines={1}>
                  {recentMessageText}
                </Text>
              </View>
            </View>
            <View>
              {hasUnreadMessages && (
                <View style={chatListStyles.valueContainer}>
                  <Text style={chatListStyles.value}>{unreadCount}</Text>
                </View>
              )}
              <Text
                style={{
                  ...chatListStyles.date,
                  ...(recentMessageText &&
                    hasUnreadMessages && {
                      color: themes.COLORS.BUTTON_COLOR,
                      fontWeight: '500',
                    }),
                }}>
                {recentMessageDate
                  ? moment(recentMessageDate).fromNow(true)
                  : ''}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
      contentContainerStyle={chatListStyles.container}
    />
  );
};

export default ChatList;
