import {
    Card,
    Container,
    Imeg,
    ImegContainer
} from "./ImegCard.styled";
import Modal from 'react-modal';
import { useState } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const ImegCard = ({imeg}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <Card onClick={openModal}>
                <Imeg src={`${imeg.webformatURL}`} alt="" />
            </Card>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ImegContainer>
                    <Imeg src={`${imeg.largeImageURL}`} alt="" />
                </ImegContainer>
                <button onClick={closeModal}>close</button>
            </Modal>
        </Container>
    );
}
