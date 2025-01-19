import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type LoaderProps = {
  visible: boolean;
};

export default function Loader({visible}: LoaderProps) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    height: 80,
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
