import * as firebase from '../config/firebase';
import {USERS} from '@env';
import {ProductInterface} from '../hook/useProducts';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CollectionInterface, GoogleSignInProps} from '../hook/useUser';
import {OrderItem} from '../hook/useOrder';
import {Alert} from 'react-native';

const usersRoute = USERS;
type ReqProps = Partial<ProductInterface | OrderItem>;
export const createInDatabase = async (url: string, requestData: ReqProps) => {
  try {
    const productCollections = firebase.collection(firebase.firestore, url);
    const newDocument = await firebase.addDoc(productCollections, requestData);

    return newDocument.id;
  } catch (error) {
    throw error;
  }
};

export const removeInDatabase = async (url: string, docId: string) => {
  try {
    const productDocumentRef = firebase.doc(firebase.firestore, url, docId);
    await firebase.deleteDoc(productDocumentRef);
    return true;
  } catch (error) {
    throw error;
  }
};

export async function signInWithGoogle({
  navigate,
  previousRoute,
  setLoading,
}: GoogleSignInProps) {
  try {
    setLoading(true);
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    if (!idToken) {
      return Alert.alert('Error fetching token');
    }
    const googleCredentials = firebase.GoogleAuthProvider.credential(idToken);

    if (!googleCredentials) {
      return Alert.alert('Error fetching google credentials');
    }
    const fetchedData = await firebase.signInWithCredential(
      firebase.auth,
      googleCredentials,
    );

    const userCollections = firebase.collection(firebase.firestore, usersRoute);

    const userSnapshot = await firebase.getDocs(userCollections);
    let userExists = false;

    for (const doc of userSnapshot.docs) {
      const userData = doc?.data() as CollectionInterface;
      const userEmail = userData?.email;
      const emailExist = userEmail === fetchedData?.user.email;
      if (emailExist) {
        userExists = true;
        break;
      }
    }

    if (!userExists) {
      const email = fetchedData.user.email;
      const newUserData = {
        userId: fetchedData.user.uid,
        email,
        role: 'Subscriber',
        joined: new Date().toString(),
        userName: fetchedData.user.displayName,
        photos: [fetchedData.user.photoURL],
        phoneNumber: fetchedData.user.phoneNumber,
        bio: '',
        age: null,
        friends: [],
        comments: [],
        city: '',
        country: '',
      };
      await firebase.addDoc(userCollections, newUserData);
    }
    navigate(previousRoute);

    setLoading(false);
  } catch (error) {
    setLoading(false);
    Alert.alert('Failed to authenticate with google auth');
  }
}
