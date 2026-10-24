import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text, Chip, Divider } from 'react-native-paper';

import { Genre } from '../types/migoTypes';

import { migoDarkTheme } from '../assets/themes/migoDarkTheme';

interface Props {
  type: string;
  item: any;
  handleEdit: (cardItem:any) => void;
  handleDelete: (cardItem:any) => void;
}

const CardItem = ({type, item, handleEdit, handleDelete}: Props):React.ReactElement => {
  const [showActions, setShowActions] = React.useState(false);
  const toggleShowActions = () => setShowActions(!showActions);

  const cardHandleEditButton = ():void => {
    handleEdit(item);
    toggleShowActions();
  };

  const cardHandleDeleteButton = ():void => {
    handleDelete(item);
    toggleShowActions();
  };

  return(
    <Card style={styles.cardWrapper} onPress={toggleShowActions}>
      <View style={styles.cardHeader}>
        <View style={styles.headerWrapper}>
          <Text variant='headlineMedium' style={styles.headerTitle}>{item.title}</Text>
        </View>
        <View style={styles.ratingBox}>
          <Text variant='titleLarge'>{item.score}</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.cardContent}>
        <View style={styles.eVWrapper}>
          <View style={styles.eVItem}>
            <Text variant='bodyMedium' style={styles.eVItemText}>Episodes</Text>
            <Chip mode='outlined'>{item.episodes}</Chip>
          </View>
          <View style={styles.eVItem}>
            <Text variant='bodyMedium' style={styles.eVItemText}>Volumes</Text>
            <Chip mode='outlined'>{item.seasonsVolumes}</Chip>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 10,
    marginBottom: 10,
  },
  cardHeader: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    textTransform: 'capitalize',
  },
  ratingBox: {
    width: 80,
    height: 80,
    backgroundColor: migoDarkTheme.colors.onPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
  },
  eVWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  eVItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  eVItemText: {
    marginRight: 10,
  },
});

export default CardItem;
