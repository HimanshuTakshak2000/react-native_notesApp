import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/noteReducer';
import {baseUrl} from '../utils/baseUrl';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootNavigationParaList, 'Home'>;
};

type noteType = {
  _id: string;
  title: string;
  description: string;
  postedById: string;
  postedByName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function HomeScreen({navigation}: HomeScreenProps) {
  const [notes, setNotes] = useState<noteType[]>([]);
  const [isModelVisible, setisModelVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [isTitleError, setIsTitleError] = useState<Boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [noteId, setNoteId] = useState<string>('');
  const [isdescriptionError, setIsdescriptionError] = useState<Boolean>(false);
  const [isUpdatePressed, setIsUpdatePressed] = useState<boolean>(false);
  const {userId, name} = useSelector((state: RootState) => state.noteReducer);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      getAllNotes();
    }, []),
  );

  // We can use both above or below code to get focused on the current page :-
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   getAllNotes();
  // },[isFocused]);

  const getAllNotes = async () => {
    const user = await AsyncStorage.getItem('User');
    if (user) {
      const parsedUser = JSON.parse(user);
      const userId = parsedUser._id;
      const name = parsedUser.name;
      dispatch(setUser({userId, name})); // redux is used to set userId and name in store.
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const res = await fetch(`${baseUrl}api/notes/getNotes?userId=${userId}`, {
        headers,
        method: 'GET',
      });
      const data = await res.json();
      console.log('data :- ', data.length);
      setNotes(data);
    }
  };
  const eachItemPress = (item: noteType, type: number) => {
    if (type == 2) {
      setIsUpdatePressed(true);
      setNoteId(item._id);
    }
    // else{
    //   setIsUpdatePressed(true);
    // }
    setTitle(item.title);
    setisModelVisible(true);
    setDescription(item.description);
  };
  const deleteNotes = async (notesId: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const res = await fetch(`${baseUrl}api/notes/deleteNotes/${notesId}`, {
      headers,
      method: 'DELETE',
    });
    await res.json();
    ToastAndroid.show('Note Deleted Successfully!!', ToastAndroid.LONG);
    setisModelVisible(false);
    getAllNotes();
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (text.length == 0) {
      setIsTitleError(true);
    } else {
      setIsTitleError(false);
    }
  };

  const handledescriptionChange = (text: string) => {
    setDescription(text);
    if (text.length == 0) {
      setIsdescriptionError(true);
    } else {
      setIsdescriptionError(false);
    }
  };

  const handleUpdateNotes = () => {
    if (title.length == 0 && description.length == 0) {
      setIsTitleError(true);
      setIsdescriptionError(true);
    } else if (title.length == 0) {
      setIsTitleError(true);
      setIsdescriptionError(false);
    } else if (description.length == 0) {
      setIsTitleError(false);
      setIsdescriptionError(true);
    } else {
      setIsTitleError(false);
      setIsdescriptionError(false);
      updateNotesApi();
    }
  };

  const updateNotesApi = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {title, description, userId, userName: name};
    const res = await fetch(`${baseUrl}api/notes/updateNotes/${noteId}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify(body),
    });

    await res.json();

    ToastAndroid.show('Notes Updated Successfully!!', ToastAndroid.LONG);
    setisModelVisible(false);
    setIsUpdatePressed(false);
    getAllNotes();
  };
  const renderItem = (item: noteType) => {
    console.log('item :- ', item);
    return (
      <View style={styles.notesItem}>
        <TouchableOpacity onPress={() => eachItemPress(item, 1)}>
          <Text>{item.title}</Text>
          <Text>
            {item.description.length < 30
              ? item.description
              : `${item.description.substring(0, 30)}...`}
          </Text>
        </TouchableOpacity>

        <View style={{justifyContent:'space-between'}}>
          <Text onPress={() => eachItemPress(item, 2)}>Update</Text>
          <Text onPress={() => deleteNotes(item._id)}>Delete</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <View style={styles.header}>
          <Text style={styles.title}>Notes App</Text>
        </View>
        {notes.length > 0 ? (
          <FlatList data={notes} renderItem={({item}) => renderItem(item)} />
        ) : (
          <View style={styles.noDataView}>
            <Text style={styles.title}>Notes Not Found</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AddNotes')}>
          <Text style={styles.btnText}>Create Note</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModelVisible} onRequestClose={() => setisModelVisible(false)} >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'gray',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: 230,
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Notes Title"
              onChangeText={t => handleTitleChange(t)}
              value={title}
              editable = {isUpdatePressed}
            />
            {isTitleError && (
              <View style={{marginVertical: 5, marginLeft: 22}}>
                <Text style={{color: 'red', fontWeight: '400', fontSize: 14}}>
                  Enter Title for notes
                </Text>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter Notes Description"
              multiline
              onChangeText={t => handledescriptionChange(t)}
              value={description}
              editable = {isUpdatePressed}
            />
            {isdescriptionError && (
              <View style={{marginVertical: 5, marginLeft: 22}}>
                <Text style={{color: 'red', fontWeight: '400', fontSize: 14}}>
                  Enter Description for notes
                </Text>
              </View>
            )}
            {isUpdatePressed ? (
              <TouchableOpacity
                style={styles.btnModel}
                onPress={() => handleUpdateNotes()}>
                <Text style={styles.btnModelText}>Update Note</Text>
              </TouchableOpacity>
            ) : (
                <TouchableOpacity
                  style={styles.btnModel}
                  onPress={() => setisModelVisible(false)}>
                  <Text style={styles.btnModelText}>Close</Text>
                </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    paddingLeft: 20,
    // alignItems:"center",
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  btn: {
    position: 'absolute',
    width: 200,
    height: 50,
    borderRadius: 30,
    right: 20,
    bottom: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  notesItem: {
    width: '90%',
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    paddingLeft: 20,
  },
  btnModel: {
    width: '90%',
    height: 45,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnModelText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
