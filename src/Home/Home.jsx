import React, { useState, useEffect } from 'react'
import './Home.css'
import Homebg from '../assets/homebg.png'
import Send from '../assets/sendbtn.png'
import SendDisabled from '../assets/sendbtndisabled.png'
import Lockimg from '../assets/lock.png'
import Modal from 'react-modal';

const Home = () => {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [groupName, setGroupName] = useState('');
    const [error, setError] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [notes, setNotes] = useState([]);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [textValue, setTextValue] = useState('');
    const [typedNotes, setTypedNotes] = useState([]);

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

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const newGroupName = groupName.trim();
        const newSelectedColor = selectedColor;
        const isGroupNameExists = notes.filter((note) => note.groupName === newGroupName);

        if (!newGroupName) {
            setError('Please enter group name');
        } else if (isGroupNameExists.length > 0) {
            setError('Group name already exists')
        } else if (!newSelectedColor) {
            setError('Please choose color');
        } else {
            try {
                const initials = newGroupName
                    .split(' ')
                    .slice(0, 2)
                    .map(word => word.charAt(0).toUpperCase())
                    .join('');

                const newNote = { groupName: newGroupName, selectedColor: newSelectedColor, notesname: initials, typednotes: [] }
                const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
                const updatedNotes = [...existingNotes, newNote]

                localStorage.setItem('notes', JSON.stringify(updatedNotes))
                setNotes(updatedNotes);
                setGroupName('');
                setSelectedColor('');
                setError('');
                setIsOpen(false)
            } catch (error) {
                alert('Error storing notes:', error);
            }
        }
    };

    useEffect(() => {
        try {
            const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
            setNotes(existingNotes);
        } catch (error) {
            alert('Error fetching notes from local storage:', error);
        }
    }, []);

    const openNotesInfo = (index, color) => {
        setSelectedItemIndex(index)
        setSelectedNote(notes[index]);
    }

    const handleTextChange = (event) => {
        setTextValue(event.target.value);
    };

    const sendTypedNotes = () => {
        if (textValue.trim() !== '') {
            const currentDate = new Date();

            const day = currentDate.getDate();
            const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
            const year = currentDate.getFullYear();
            const formattedDate = `${day} ${month} ${year}`;

            const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
            const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(currentDate);

            const newTypedNote = {
                text: textValue,
                date: formattedDate,
                time: formattedTime,
            };

            const updatedTypedNotes = [...typedNotes, newTypedNote]
            setTypedNotes(updatedTypedNotes);

            const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
            existingNotes[selectedItemIndex].typednotes = updatedTypedNotes;
            localStorage.setItem('notes', JSON.stringify(existingNotes));

            setTextValue('');

        }
    }

    useEffect(() => {
        try {
            const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
            const updatedExistingNotes = existingNotes[selectedItemIndex]?.typednotes || []
            setTypedNotes(updatedExistingNotes);
        } catch (error) {
            alert('Error fetching notes from local storage:', error);
        }
    }, [selectedItemIndex]);

    return (
        <div>
            <div className='home_div'>
                <div className='sidebar'>
                    <div className='sidebar_title'>
                        <h1>Pocket Notes</h1>
                    </div>
                    <div className='notes_list'>

                        <div className='notes_listdiv'>
                            {notes.map((note, index) => (
                                <div key={index} className='notes_container' onClick={() => openNotesInfo(index)} style={{ backgroundColor: selectedItemIndex === index ? '#2F2F2F2B' : '' }}>
                                    <div style={{ backgroundColor: note.selectedColor, width: '3rem', height: '3rem', borderRadius: '100%', color: '#ffffff' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                            {note.notesname}
                                        </div>
                                    </div>

                                    <div>{note.groupName}</div>
                                </div>
                            ))}
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
                            <form onSubmit={handleSubmit} >
                                <div className='group_name'>
                                    <label>Group Name</label>
                                    <input type='text' placeholder='Enter group name' value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)} />
                                </div>
                                <div className='choose_color'>
                                    <label>Choose colour</label>
                                    <div className='choose_color_div'>
                                        <button id='color-one' type='button' onClick={() => handleColorSelection('#B38BFA')}></button>
                                        <button id='color-two' type='button' onClick={() => handleColorSelection('#FF79F2')}></button>
                                        <button id='color-three' type='button' onClick={() => handleColorSelection('#43E6FC')}></button>
                                        <button id='color-four' type='button' onClick={() => handleColorSelection('#F19576')}></button>
                                        <button id='color-five' type='button' onClick={() => handleColorSelection('#0047FF')}></button>
                                        <button id='color-six' type='button' onClick={() => handleColorSelection('#6691FF')}></button>
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

                <div className='homeNote_div'>
                    {selectedItemIndex !== null ? (
                        <div className='note_page_div'>
                            {selectedNote && (
                                <div className='notes_nav'>
                                    <div style={{ backgroundColor: selectedNote.selectedColor, width: '3rem', height: '3rem', borderRadius: '100%', }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                            {selectedNote.notesname}
                                        </div>
                                    </div>
                                    <div>
                                        {selectedNote.groupName}
                                    </div>
                                </div>
                            )}


                            <div className='notestextTypedArea'>

                                {typedNotes.length !== 0 ? (typedNotes.map((note, index) => (
                                    <div key={index} className='noteCard'>
                                        <div className='typed_notes'>
                                            {note.text}
                                        </div>
                                        <div className='date_time'>
                                            <div>
                                                {note.date}
                                            </div>
                                            <div className='dot'></div>
                                            <div>
                                                {note.time}
                                            </div>
                                        </div>
                                    </div>
                                ))) : (<div style={{ width: '100%', textAlign: 'center' }}>
                                    Start writing notes here
                                </div>)}

                            </div>

                            <div className='text_area'>
                                <div className='texttype_area'>
                                    <div className='input_text'>
                                        <textarea type="text" value={textValue} onChange={handleTextChange} placeholder='Enter your text here...........' />
                                    </div>

                                    <div className='send_button'>
                                        <button>
                                            {textValue ? (
                                                <img src={Send} alt="send button" onClick={sendTypedNotes} />
                                            ) : (
                                                <img src={SendDisabled} alt="send button" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
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
                    )}
                </div>


            </div>
        </div>
    )
}

export default Home