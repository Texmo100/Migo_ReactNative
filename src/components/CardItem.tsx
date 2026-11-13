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
      <View style={styles.cardHeaderWrapper}>
        <View style={styles.titleWrapper}>
          <Text variant="headlineLarge" style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.ratingWrapper}>
          <Text variant="bodyLarge">{item.score}</Text>
        </View>
      </View>
      <Divider />
      <View style={styles.basicInfoWrapper}>
        <View style={styles.basicInfoItem}>
          <Text variant="bodyLarge" style={styles.basicInfoText}>Episodes</Text>
          <Chip mode='outlined' style={styles.basicInfoChip}>{item.episodes}</Chip>
        </View>
        <View style={styles.basicInfoItem}>
          <Text variant="bodyLarge" style={styles.basicInfoText}>Volumes</Text>
          <Chip mode='outlined' style={styles.basicInfoChip}>{item.seasonsVolumes}</Chip>
        </View>
      </View>
      {
        showActions
        && 
        (
          <React.Fragment>
            <View style={styles.detailInfoWrapper}>
              <View style={styles.detailInfoItemWrapper}>
                <Text variant="bodyLarge" style={styles.detailInfoItemTitle}>Genres</Text>
                <View style={styles.detailInfoItemContent}>
                  {
                    item.genres.map((genre:Genre) => 
                      (
                        <Chip
                            key={genre.id}
                            mode='outlined'
                            style={[styles.detailInfoItemChip, styles.genreChip]}
                          >
                            {genre.name}
                        </Chip>
                      ))
                  }
                </View>
              </View>
              <View style={styles.detailInfoItemWrapper}>
                <Text variant="bodyLarge" style={styles.detailInfoItemTitle}>Demographic</Text>
                <View style={styles.detailInfoItemContent}>
                  <Chip mode='outlined' style={[styles.detailInfoItemChip, styles.demographicChip]}>
                    {item.demographic.name}
                  </Chip>
                </View>
              </View>
              <View style={styles.detailInfoItemWrapper}>
                <Text variant="bodyLarge" style={styles.detailInfoItemTitle}>Status</Text>
                <View style={styles.detailInfoItemContent}>
                  <Chip mode='flat' style={styles.detailInfoItemChip} textStyle={{color: 'white'}}>
                    {item.status}
                  </Chip>
                </View>
              </View>
            </View>
            <Divider />
            <View style={styles.historyDatesWrapper}>
              <Text variant="bodyMedium" style={styles.historyItemDate}>Added at: {item.addedAt}</Text>
              <Text variant="bodyMedium">Last Update: {item.lastUpdate}</Text>
            </View>
            <Card.Actions>
              <Button onPress={() => cardHandleEditButton()}>Edit</Button>
              <Button onPress={() => cardHandleDeleteButton()}>Delete</Button>
            </Card.Actions>
          </React.Fragment>
        )
      }
    </Card>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 10,
    padding: 10,
  },
  cardHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleWrapper: {
    maxWidth: '75%',
    justifyContent: 'center',
  },
  title: {
    textTransform: 'capitalize',
  },
  ratingWrapper: {
    width: 80,
    height: 80,
    backgroundColor: migoDarkTheme.colors.onPrimary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicInfoWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  basicInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  basicInfoText: {
    marginRight: 10,
  },
  basicInfoChip: {
    flex: 1,
    borderRadius: 50,
  },
  detailInfoWrapper: {
    flex: 1,
  },
  detailInfoItemWrapper: {
    flex: 1,
  },
  detailInfoItemTitle: {
    marginBottom: 10,
  },
  detailInfoItemContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailInfoItemChip: {
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },
  genreChip: {
    borderColor: migoDarkTheme.colors.primary,
  },
  demographicChip: {
    borderColor: migoDarkTheme.colors.secondaryContainer,
  },
  historyDatesWrapper: {
    marginTop: 10,
    flexDirection: 'row',
  },
  historyItemDate: {
    marginRight: 10,
  }
});

export default CardItem;
