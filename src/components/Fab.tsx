import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface Props {
  onPressFunction: () => void,
}

const Fab = ({onPressFunction}: Props):React.ReactElement => (
  <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => onPressFunction()}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default Fab;
