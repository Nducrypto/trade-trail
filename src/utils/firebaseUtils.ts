import * as firebase from '../config/firebase';
import {USERS} from '@env';
import {ProductInterface} from '../hook/useProducts';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CollectionInterface} from '../hook/useUser';
import {OrderItem} from '../hook/useOrder';
import {Alert} from 'react-native';
import {DynamicNavigationProps, RootStackParamList} from '../screen';
import {authorize} from 'react-native-app-auth';
import {githubConfig} from '../config/githubConfig';

const usersRoute = USERS;
type ReqProps = Partial<ProductInterface | OrderItem | CollectionInterface>;

export async function createInDatabase(url: string, requestData: ReqProps) {
  try {
    const productCollections = firebase.collection(firebase.firestore, url);
    const newDocument = await firebase.addDoc(productCollections, requestData);

    return newDocument.id;
  } catch (error) {
    throw error;
  }
}

export async function removeInDatabase(url: string, docId: string) {
  try {
    const productDocumentRef = firebase.doc(firebase.firestore, url, docId);
    await firebase.deleteDoc(productDocumentRef);
    return true;
  } catch (error) {
    throw error;
  }
}

export interface OAuthProps {
  navigate: DynamicNavigationProps['navigate'];
  route: keyof RootStackParamList;
  setLoading: (value: boolean) => void;
}

export async function signInWithGoogle({
  navigate,
  route,
  setLoading,
}: OAuthProps) {
  try {
    setLoading(true);
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    if (!idToken) {
      return Alert.alert('Error fetching token');
    }
    const credentials = firebase.GoogleAuthProvider.credential(idToken);

    if (!credentials) {
      return Alert.alert('Error fetching google credentials');
    }
    const fetchedData = await firebase.signInWithCredential(
      firebase.auth,
      credentials,
    );

    const email = fetchedData.user.email ?? '';
    const displayName = fetchedData.user.displayName ?? '';
    const userExists = await checkIfUserExists(email, displayName);

    if (!userExists) {
      await newUserData(fetchedData.user);
    }
    navigate(route);

    setLoading(false);
  } catch (error) {
    setLoading(false);
    Alert.alert('Failed to authenticate with google auth');
  }
}

export async function signInWithGithub({
  navigate,
  route,
  setLoading,
}: OAuthProps) {
  try {
    setLoading(true);
    const result = await authorize(githubConfig);
    const {accessToken} = result;

    if (!accessToken) {
      setLoading(false);
      return Alert.alert('Error fetching GitHub OAuth access token');
    }
    const credential = firebase.GithubAuthProvider.credential(accessToken);

    if (!credential) {
      return Alert.alert('Error fetching github credentials');
    }
    const fetchedData = await firebase.signInWithCredential(
      firebase.auth,
      credential,
    );

    const email = fetchedData.user.email ?? '';
    const displayName = fetchedData.user.displayName ?? '';
    const userExists = await checkIfUserExists(email, displayName);

    if (!userExists) {
      await newUserData(fetchedData.user);
    }
    navigate(route);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    Alert.alert('Failed to authenticate with github');
  }
}

async function checkIfUserExists(email: string, displayName: string) {
  const userCollections = firebase.collection(firebase.firestore, usersRoute);
  const userSnapshot = await firebase.getDocs(userCollections);
  let userExists = false;

  for (const doc of userSnapshot.docs) {
    const userData = doc?.data() as CollectionInterface;
    const userEmail = userData?.email;
    const userName = userData?.userName;

    if (userEmail === email || userName === displayName) {
      userExists = true;
      break;
    }
  }
  return userExists;
}

async function newUserData(user: any) {
  const data = {
    userId: user.uid,
    email: user.email,
    role: 'Subscriber',
    joined: new Date().toString(),
    userName: user.displayName,
    photos: [user.photoURL],
    phoneNumber: user.phoneNumber,
    bio: '',
    age: null,
    friends: [],
    comments: [],
    city: '',
    country: '',
  };
  await createInDatabase(usersRoute, data);
}
