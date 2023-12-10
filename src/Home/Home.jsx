import React, { useState, useRef } from 'react'
import './Home.css'
import Homebg from '../assets/homebg.png'
import Lockimg from '../assets/lock.png'
import Modal from 'react-modal';

const Home = () => {

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            width: '35%'
        },
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [groupName, setGroupName] = useState('');
    const [error, setError] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const groupNameRef = useRef('');
    const selectedColorRef = useRef('');


    const handleColorSelection = (color) => {
        selectedColorRef.current = color;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (groupNameRef == '') {
            setError('Please enter group name')
        } else if (selectedColorRef == '') {
            setError('Please select color')
        } else {
            setError('')
            setGroupName(groupNameRef.current);
            setSelectedColor(selectedColorRef.current);
            setIsOpen(false);
        }
    };

    return (
        <div>
            <div className='home_div'>
                <div className='sidebar'>
                    <div className='sidebar_title'>
                        <h1>Pocket Notes</h1>
                    </div>
                    <div className='notes_list'>
                        <div className='notes_listdiv'>
                            <div style={{ backgroundColor: selectedColor, width: '3rem', height: '3rem', borderRadius: '100%' }}></div>
                            <div>{groupName}</div>
                        </div>
                    </div>
                    <div className='btnadd_notes'>
                        <button className='btnadd' onClick={openModal}>+</button>

                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Modal"
                        >
                            <div className='sub_title'>
                                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create New group</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='group_name'>
                                    <label>Group Name</label>
                                    <input type='text' placeholder='Enter group name' value={groupNameRef.current}
                                        onChange={(e) => (groupNameRef.current = e.target.value)} />
                                </div>
                                <div className='choose_color'>
                                    <label>Choose colour</label>
                                    <div className='choose_color_div'>
                                        <button id='color-one' onClick={() => handleColorSelection('#B38BFA')}></button>
                                        <button id='color-two' onClick={() => handleColorSelection('#FF79F2')}></button>
                                        <button id='color-three' onClick={() => handleColorSelection('#43E6FC')}></button>
                                        <button id='color-four' onClick={() => handleColorSelection('#F19576')}></button>
                                        <button id='color-five' onClick={() => handleColorSelection('#0047FF')}></button>
                                        <button id='color-six' onClick={() => handleColorSelection('#6691FF')}></button>
                                    </div>
                                </div>
                                <div style={{ color: 'red' }}>{error}</div>
                                <div className='create_btn_div'>
                                    <button className='btnCreate' type='submit'>Create</button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>

                <div className='home_page_div'>
                    <div className='home_page'>
                        <img src={Homebg} alt="homebg" />
                        <h1>Pocket Notes</h1>
                        <p>
                            Send and receive messages without keeping your phone online.
                            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                        </p>
                    </div>
                    <div className='encrypted_div'>
                        <img src={Lockimg} alt="encrypted" />
                        <p>end-to-end encrypted</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home