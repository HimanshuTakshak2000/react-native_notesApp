import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const AddNotes = () => {
  const [title, setTitle] = useState<string>('');
  const [isTitleError, setIsTitleError] = useState<Boolean>(false);
  const [description, setdescription] = useState<string>('');
  const [isdescriptionError, setIsdescriptionError] = useState<Boolean>(false);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (text.length == 0) {
      setIsTitleError(true);
    } else {
      setIsTitleError(true);
      (false);
    }
  };

  const handledescriptionChange = (text: string) => {
    setdescription(text);
    if (text.length == 0) {
      setIsdescriptionError(true);
    } else {
      setIsdescriptionError(false);
    }
  };

  const handleAddNotes = () => {
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
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Notes Title"
        onChangeText={t => handleTitleChange(t)}
        value={title}
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
        onChangeText={(t)=> handledescriptionChange(t)}
        value={description}
      />
      {isdescriptionError && (
        <View style={{marginVertical: 5, marginLeft: 22}}>
          <Text style={{color: 'red', fontWeight: '400', fontSize: 14}}>
            Enter Description for notes
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.btn} onPress={() => handleAddNotes()}>
        <Text style={styles.btnText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  btn: {
    width: '90%',
    height: 45,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
