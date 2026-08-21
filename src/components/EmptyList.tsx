import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';


const EmptyList = ():React.ReactElement => {
    return(
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text variant='headlineSmall'>No items to display</Text>
        </View>
    );
};

export default EmptyList;
