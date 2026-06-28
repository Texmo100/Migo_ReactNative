import * as React from 'react';
import { View } from 'react-native';
import { Button, Card, Text, Chip, Divider } from 'react-native-paper';

import { Anime } from '../assets/fakeDatabase/fakeAnimes';

interface PropsTypes {
  item: Anime
}

const CardItem = ({item}: PropsTypes) => {
  const [showActions, setShowActions] = React.useState(false);

  const toggleShowActions = () => setShowActions(!showActions);

  return(
    <Card style={{ marginBottom: 10 }} onLongPress={toggleShowActions}>
      <Card.Content>
        <Text variant="displaySmall" style={{textTransform: 'capitalize'}}>{item.title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5}}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Episodes:</Text>
            <Text variant='bodyMedium'>{item.episodes}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5}}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Seasons:</Text>
            <Text variant='bodyMedium'>{item.seasons}</Text>
        </View>
        
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5}}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Status:</Text>
            <Text variant='bodyMedium'>{item.status}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5}}>
            <Text variant='labelLarge' style={{marginRight: 5}}>Score:</Text>
            <Text variant='bodyMedium'>{item.score}</Text>
        </View>

        <Text variant='labelLarge' style={{marginBottom: 5}}>Genre:</Text>
        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: 5, marginBottom: 10 }}>
            {
              item.genres.map(genre => (<Chip key={genre.id} mode='outlined'>{genre.name}</Chip>))
            }
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
              <Button>Edit</Button>
              <Button>Delete</Button>
            </Card.Actions>
          )
        }
    </Card>
    );
};

export default CardItem;
