import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const AddNotes = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter Notes Title" />
      <TextInput
        style={styles.input}
        placeholder="Enter Notes Description"
        multiline
      />
      <TouchableOpacity style={styles.btn}>
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
