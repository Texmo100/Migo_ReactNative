import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Text, TextInput, SegmentedButtons, Button, HelperText } from 'react-native-paper';

import ChipSelector from './ChipSelector';

import { fakeGenreList } from '../types/fakeGenres';
import { fakeDemographicList } from '../types/fakeDemographics';

import { fakeAnimeList, fakeMangaList } from '../types/fakeDatabase';

import { AnimeManga } from '../types/migoTypes';

interface Props {
    hideModal: () => void,
    type: string,
    mode: string,
    cardItem: any,
}

const initialFormState = {
    title: '',
    episodes: 0,
    seasonsVolumes: 0,
    status: '',
    score: 0,
    genres: [],
    demographic: {} as AnimeManga,
    personalComments: '',
};

const CustomForm = ({hideModal, type, mode, cardItem}:Props):React.ReactElement => {
    const [formData, setFormData] = React.useState<any>(mode === 'edition' && cardItem ? cardItem : initialFormState);
    const [errorInForm, setErrorInForm] = React.useState(false);

    const handleSubmit = ():void => {
        if(isValidForm(formData)) {
            setErrorInForm(false);
            console.log("Valid form data");
            console.log(formData);

            if(mode === 'creation'){
                const newItem:AnimeManga = {
                    id: fakeAnimeList.length + 1,
                    title: formData.title,
                    episodes: formData.episodes,
                    seasonsVolumes: formData.seasonsVolumes,
                    status: formData.status,
                    score: formData.score,
                    genres: formData.genres,
                    demographic: formData.demographic,
                    personalComments: formData.personalComments,
                    addedAt: new Date().toLocaleDateString(),
                    lastUpdate: new Date().toLocaleDateString(),
                };

                if(type === 'anime') {
                    fakeAnimeList.push(newItem);
                }

                if(type === 'manga'){
                    fakeMangaList.push(newItem);
                }
            }

            if(mode === 'edition') {
                cardItem['title'] = formData.title;
                cardItem['episodes'] = formData.episodes;
                cardItem['seasonsVolumes'] = formData.seasonsVolumes;
                cardItem['status'] = formData.status;
                cardItem['score'] = formData.score;
                cardItem['genres'] = formData.genres;
                cardItem['demographic'] = formData.demographic;
                cardItem['personalComments'] = formData.personalComments;
                cardItem['lastUpdate'] = new Date().toLocaleDateString();
            }

            hideModal();
            cleanFormData();
        } else {
            setErrorInForm(true);
        }
    };

    const isValidForm = (formData:any):boolean => {
        const errors: string[] = [];

        if(formData.title === "") errors.push('title')
        if(formData.episodes === 0) errors.push('episodes')
        if(formData.seasonsVolumes === 0) errors.push('seasonsVolumes')
        if(formData.status === "") errors.push('status')
        if(formData.score === 0) errors.push('score')
        if(formData.genres.length === 0) errors.push('genres')
        if(formData.demographic === undefined) errors.push('demographic')

        if(errors.length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const handleCancel = ():void => {
        hideModal();
        cleanFormData();
    };

    const cleanFormData = ():void => {
        setFormData(initialFormState);
        setErrorInForm(false);
    };

    const chipSelectorHandler = (label:string, selectedChips: any[]):void => {
        const lowerCaseLabel = label.toLowerCase();

        if(lowerCaseLabel === "genres") {
            setFormData({...formData, genres: selectedChips});
        }

        if(lowerCaseLabel === "demographic") {
            setFormData({...formData, demographic: selectedChips[0]});
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => handleCancel()} />
                <Appbar.Content title="Migo Form" />
            </Appbar.Header>

            <ScrollView style={styles.formContainer}>
                {
                    mode === "creation"
                    ?
                    (
                        <Text variant='displaySmall' style={styles.formTitle}>
                            { type === "anime" ? "Add Anime" : "Add Manga"}
                        </Text>
                    )
                    :
                    (
                        <Text variant='displaySmall' style={styles.formTitle}>
                            { type === "anime" ? "Edit Anime" : "Edit Manga"}
                        </Text>
                    )
                }

                <View style={styles.formGroup}>
                    <TextInput
                        mode='outlined'
                        label='Title'
                        value={formData.title}
                        onChangeText={(value) => setFormData({...formData, title: value})}
                        outlineStyle={{borderRadius: 10}}
                        error={errorInForm && formData.title === "" ? true : false}
                    />
                    <HelperText type="error" visible={errorInForm && formData.title === "" ? true : false}>
                        Title field is required
                    </HelperText>
                </View>

                <View style={styles.formGroup}>
                    <TextInput
                        mode='outlined'
                        label='Episodes'
                        value={String(formData.episodes)}
                        onChangeText={(value) => setFormData({...formData, episodes: value === '' ? 0 : parseInt(value, 10)})}
                        outlineStyle={{borderRadius: 10}}
                        keyboardType='numeric'
                        error={errorInForm && formData.episodes === 0 ? true : false}
                    />
                    <HelperText type="error" visible={errorInForm && formData.episodes === 0 ? true : false}>
                        Episodes field is required
                    </HelperText>
                </View>

                <View style={styles.formGroup}>
                    <TextInput
                        mode='outlined'
                        label={type === "anime" ? "Seasons" : "Volumes"}
                        value={String(formData.seasonsVolumes)}
                        onChangeText={(value) => setFormData({...formData, seasonsVolumes: value === '' ? 0 : parseInt(value, 10)})}
                        outlineStyle={{borderRadius: 10}}
                        keyboardType='numeric'
                        error={errorInForm && formData.seasonsVolumes === 0 ? true : false}
                    />
                    <HelperText type="error" visible={errorInForm && formData.seasonsVolumes === 0 ? true : false}>
                        {type === "anime" ? "Seasons" : "Volumes"} field is required
                    </HelperText>
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
                    <HelperText type="error" visible={errorInForm && formData.status === "" ? true : false}>
                        Status field is required
                    </HelperText>
                </View>

                <View style={styles.formGroup}>
                    <TextInput
                        mode='outlined'
                        label='Score'
                        value={String(formData.score)}
                        onChangeText={(value) => setFormData({...formData, score: value === '' ? 0 : parseInt(value, 10)})}
                        outlineStyle={{borderRadius: 10}}
                        keyboardType='numeric'
                        error={errorInForm && formData.score === 0 ? true : false}
                    />
                    <HelperText type="error" visible={errorInForm && formData.score === 0 ? true : false}>
                        Score field is required
                    </HelperText>
                </View>

                <View style={styles.formGroup}>
                    <ChipSelector label='Genres' data={fakeGenreList} mode='multiple' chipSelectorHandler={chipSelectorHandler} value={formData.genres}/>
                    <HelperText type="error" visible={errorInForm && formData.genres.length === 0 ? true : false}>
                        Genres field is required
                    </HelperText>
                </View>

                <View style={styles.formGroup}>
                    <ChipSelector label='Demographic' data={fakeDemographicList} mode='single' chipSelectorHandler={chipSelectorHandler} value={formData.demographic}/>
                    <HelperText type="error" visible={errorInForm && formData.demographic === undefined ? true : false}>
                        Demographic field is required
                    </HelperText>
                </View>

                <View style={styles.formGroup}>
                    <TextInput
                        mode='outlined'
                        label='Personal Comments (Optional)'
                        value={formData.personalComments}
                        onChangeText={(value) => setFormData({...formData, personalComments: value})}
                        outlineStyle={{borderRadius: 10}}
                        multiline={true}
                        numberOfLines={10}
                    />
                </View>

                <View style={styles.actionsContainer}>
                    <Button mode="outlined" onPress={() => handleSubmit()} style={{marginRight: 10}}>
                        { mode === 'creation' ? 'Add' : 'Save Changes'}
                    </Button>
                    <Button mode="contained" onPress={() => handleCancel()}>Cancel</Button>
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
        marginBottom: 5,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 20,
        marginBottom: 50,
    },
});

export default CustomForm;
