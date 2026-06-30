import * as React from 'react';
import { Portal, Modal } from 'react-native-paper';

interface Props {
    children: React.ReactNode,
    visible: boolean,
    hideModal: () => void,
}

const CustomModal = ({ children, visible, hideModal }: Props):React.ReactElement => {
    return(
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={{ flex: 1, backgroundColor: 'black' }}
            >
                {children}
            </Modal>
        </Portal>
    );
};

export default CustomModal;
