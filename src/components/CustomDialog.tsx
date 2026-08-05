import * as React from 'react';
import { Portal, Dialog, Text, Button } from 'react-native-paper';

interface Props {
    visible: boolean;
    hideDialog: () => void;
    onAction: () => void;
    type: string;
    itemToDelete: any;
}

const CustomDialog = ({visible, hideDialog, onAction, type, itemToDelete}:Props):React.ReactElement => {
    return(
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor: '#212121'}}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyLarge">Do you want to delete the following {type === 'anime'? 'Anime' : 'Manga'}?</Text>
              <Text variant="bodyLarge" style={{marginTop: 10, textTransform: 'capitalize'}}>{itemToDelete === null ? "" : itemToDelete.title}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode='outlined' onPress={onAction}>Delete</Button>
              <Button mode='contained' onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    );
};

export default CustomDialog;
