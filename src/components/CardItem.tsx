import * as React from 'react';
import { View } from 'react-native';
import { Button, Card, Text, Chip, Divider } from 'react-native-paper';

import { Genre } from '../types/migoTypes';

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
    <Card style={{ marginBottom: 10 }} onLongPress={toggleShowActions}>
      <Card.Content>
        <Text variant="displaySmall" style={{textTransform: 'capitalize'}}>{item.title}</Text>
        
        <Divider />

        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5, marginTop: 5}}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Episodes:</Text>
            <Text variant='bodyMedium'>{item.episodes}</Text>
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5}}>
          <Text variant='labelLarge' style={{marginRight: 5}}>{type === 'anime' ? 'Seasons:' : 'Volumes:'}</Text>
          <Text variant='bodyMedium'>{item.seasonsVolumes}</Text>
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5}}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Status:</Text>
            <Text variant='bodyMedium' style={{textTransform: 'capitalize'}}>{item.status}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5}}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Score:</Text>
            <Text variant='bodyMedium'>{item.score}</Text>
        </View>

        <Text variant='labelLarge' style={{marginBottom: 5}}>Genres:</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: 5, marginBottom: 10 }}>
            {
              item.genres.map((genre:Genre) => (<Chip key={genre.id} mode='outlined'>{genre.name}</Chip>))
            }
        </View>

        <Text variant='labelLarge' style={{marginBottom: 5}}>Demographic:</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: 5, marginBottom: 10 }}>
          <Chip mode='flat'>{item.demographic.name}</Chip>
        </View>

        <Divider />

        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Added at:</Text>
            <Text variant='bodyMedium'>{item.addedAt}</Text>
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Last Update:</Text>
            <Text variant='bodyMedium'>{item.lastUpdate}</Text>
        </View>

        </Card.Content>
        {
          showActions
          &&
          (
            <Card.Actions>
              <Button onPress={() => cardHandleEditButton()}>Edit</Button>
              <Button onPress={() => cardHandleDeleteButton()}>Delete</Button>
            </Card.Actions>
          )
        }
    </Card>
    );
};

export default CardItem;
