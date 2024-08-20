import {useEffect} from 'react';
import {
  firestore,
  collection,
  onAuthStateChanged,
  auth,
  onSnapshot,
  getDocs,
} from '../config/firebase';
import {CollectionInterface, useUser} from '../hook/useUser';

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
          const data = doc?.data();

          if (data?.email === user?.email) {
            state.updateCurrentUser(data as CollectionInterface);

            return;
          }
        }
      } else {
        state.updateCurrentUser({} as CollectionInterface);
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
