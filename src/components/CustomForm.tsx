import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Text, TextInput, SegmentedButtons, Button } from 'react-native-paper';

import { Genre } from '../types/migoTypes';
import ChipSelector from './ChipSelector';

import { fakeGenreList } from '../types/fakeGenres';
import { fakeDemographicList } from '../types/fakeDemographics';

interface Props {
    hideModal: () => void,
}

interface DataInput {
    title: string,
    episodes: number,
    seasonsVolumes: number,
    status: string,
    score: number,
    genres: Genre[],
    demographic: '',
}

const CustomForm = ({hideModal}:Props):React.ReactElement => {
    const [formData, setFormData] = React.useState<DataInput>({
        title: '',
        episodes: 0,
        seasonsVolumes: 0,
        status: '',
        score: 0,
        genres: [],
        demographic: '',
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => hideModal()} />
                <Appbar.Content title="Migo Form" />
            </Appbar.Header>

            <ScrollView style={styles.formContainer}>
                <Text variant='displaySmall' style={styles.formTitle}>Add Anime</Text>

                <View style={styles.formGroup}>
                    <TextInput
                        mode='outlined'
                        label='Title'
                        value={formData.title}
                        onChangeText={(value) => setFormData({...formData, title: value})}
                        outlineStyle={{borderRadius: 10}}
                        style={{marginBottom: 20}}
                    />

                    <TextInput
                        mode='outlined'
                        label='Episodes'
                        value={String(formData.episodes)}
                        onChangeText={(value) => setFormData({...formData, episodes: value === '' ? 0 : parseInt(value, 10)})}
                        outlineStyle={{borderRadius: 10}}
                        keyboardType='numeric'
                        style={{marginBottom: 20}}
                    />

                    <TextInput
                        mode='outlined'
                        label='Seasons'
                        value={String(formData.seasonsVolumes)}
                        onChangeText={(value) => setFormData({...formData, seasonsVolumes: value === '' ? 0 : parseInt(value, 10)})}
                        outlineStyle={{borderRadius: 10}}
                        keyboardType='numeric'
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text variant='labelLarge' style={{marginBottom: 10}}>Status</Text>
                    <SegmentedButtons
                        value={formData.status}
                        onValueChange={(value) => setFormData({...formData, status: value})}
                        buttons={[
                            {
                                value: 'completed',
                                label: 'Completed',
                            },
                            {
                                value: 'in-progress',
                                label: 'In-Progress',
                            },
                            { 
                                value: 'archived', 
                                label: 'Archived' 
                            },
                        ]}
                    />
                </View>

                <View style={styles.formGroup}>
                    <TextInput
                        mode='outlined'
                        label='Score'
                        value={String(formData.score)}
                        onChangeText={(value) => setFormData({...formData, score: value === '' ? 0 : parseInt(value, 10)})}
                        outlineStyle={{borderRadius: 10}}
                        keyboardType='numeric'
                    />
                </View>

                <View style={styles.formGroup}>
                    <ChipSelector label='Genres' data={fakeGenreList} mode='multiple' />
                </View>

                <View style={styles.formGroup}>
                    <ChipSelector label='Demographic' data={fakeDemographicList} mode='single' />
                </View>

                <View style={styles.actionsContainer}>
                    <Button mode="outlined" onPress={() => console.log('Pressed')} style={{marginRight: 10}}>Add</Button>
                    <Button mode="contained" onPress={() => console.log('Pressed')}>Cancel</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 20,
    },
    formTitle: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 20,
        marginBottom: 50,
    }
});

export default CustomForm;
