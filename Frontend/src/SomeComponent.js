// src/components/SomeComponent.js
import React, { useState } from 'react';
import Modal from './Modal';

const SomeComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Open Modal</button>
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <h2>Modal Title</h2>
                    <p>This is the content of the modal.</p>
                    <button onClick={handleCloseModal}>Close Modal</button>
                </Modal>
            )}
        </div>
    );
};

export default SomeComponent;
