import {useEffect} from 'react';
import {
  firestore,
  collection,
  onAuthStateChanged,
  auth,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from '../config/firebase';
import {
  CollectionInterface,
  FriendsProp,
  initialState,
  useUser,
} from '../hook/useUser';

import {USERS} from '@env';

const usersRoute = USERS;

export const useAuthentication = () => {
  const state = useUser();

  useEffect(() => {
    state.setUserLoading(true);

    const unSubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const usersCollectionRef = collection(firestore, usersRoute);
        const userSnapshot = await getDocs(usersCollectionRef);
        for (const doc of userSnapshot.docs) {
          const data = {...doc?.data(), docId: doc.id} as CollectionInterface;

          if (data?.email === user?.email) {
            state.updateCurrentUser(data);
            return;
          }
        }
      } else {
        state.updateCurrentUser(initialState);
      }
    });

    return unSubscribe;
  }, []);
};

export const fetchAllUsers = () => {
  const state = useUser();

  useEffect(() => {
    const listenForChangeUsers = onSnapshot(
      collection(firestore, usersRoute),
      snapshot => {
        const groupedUserById: Record<string, CollectionInterface> = {};
        snapshot.forEach(doc => {
          const data = doc.data() as CollectionInterface;
          if (!groupedUserById[data.userId]) {
            groupedUserById[data.userId] = {} as CollectionInterface;
          }
          groupedUserById[data.userId] = {
            ...data,
            docId: doc.id,
          };
        });
        state.storeAllUsers(groupedUserById);
      },
    );
    return () => {
      listenForChangeUsers();
    };
  }, []);
};

export const updateFriendsList = async (data: FriendsProp, docId: string) => {
  try {
    const docRef = doc(firestore, usersRoute, docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const friendsArray: FriendsProp[] = docSnapshot.data().friends || [];
      const friendsMap = new Map(
        friendsArray.map(friend => [friend.userId, friend]),
      );

      if (friendsMap.has(data.userId)) {
        friendsMap.delete(data.userId);
      } else {
        friendsMap.set(data.userId, data);
      }
      const updatedFriendsArray = Array.from(friendsMap.values());
      await updateDoc(docRef, {friends: updatedFriendsArray});
    }
  } catch (error) {
    throw new Error('Failed to update friends list');
  }
};

export const markFollowersAsViewed = async (docId: string) => {
  try {
    const docRef = doc(firestore, usersRoute, docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const updatedFriends = await docSnapshot
        .data()
        .friends.map((friend: FriendsProp) => ({
          ...friend,
          status: 'viewed',
        }));

      await updateDoc(docRef, {friends: updatedFriends});
    }
  } catch (error) {
    throw Error('failed to update notifications status to read');
  }
};
