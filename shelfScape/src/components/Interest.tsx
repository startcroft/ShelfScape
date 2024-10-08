import { useEffect, useState } from 'react';
import { CreateInterest } from './CreateInterest';
import './Interest.scss';
import { useAuth } from './AuthProvider';
import { interest, messageProps } from '../types/Types';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';
import { Message } from './Message';

export const Interest = () => {
    const [activeModal, setActiveModal] = useState(false);
    const [hoveredInterestId, setHoveredInterestId] = useState<string | null>(null);
    const [interest, setInterest] = useState<interest[]>([]);
    const [updatedState, setUpdateState] = useState(false);
    const [editInterest, setEditInterest] = useState<interest | null>(null);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null | messageProps>(null)
    const navigate = useNavigate()
    const auth = useAuth()
    const [isFirstRenderAuthMessage, setIsFirstRenderAuthMessage] = useState(true);

    useEffect(() => {
        const fetchInterest = async () => {
            try {
                const response = await fetch(`${API_URL}/intereses`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: auth.data?._id })
                });
                const json = await response.json();
                setInterest(json.body.interestList);
            } catch (error) {
                console.log(error);
            }
        }

        fetchInterest();
    }, [auth.data?._id, activeModal, updatedState]);

    useEffect(() => {
        if (auth.message && !isFirstRenderAuthMessage) {
          setMessage(auth.message);
        }
        setIsFirstRenderAuthMessage(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [auth.message]);

    useEffect(() => {
      if(message) {
        const timmer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timmer);
      }
    }, [message])

    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [activeModal]);

    const handleChange = () => {
        setActiveModal(prevState => !prevState)
        console.log("ActiveModal cambio de estado")
    }

    const handleEditInterest = (id: string) => {
        const foundInterest = interest.find(interest => interest._id === id);
        // Verificar si se encontró el interés
        if (foundInterest) {
            // Actualizar el estado editInterest con el interés encontrado
            setEditInterest(foundInterest);
        } else {
            // Manejar el caso en que no se encuentre el interés (opcional)
            console.log(`No se encontró ningún interés con el id ${id}`);
        }
        handleChange()
        console.log(editInterest)
    }

    const editReset = () => {
        setEditInterest(null)
    }

    const changeState = () => {
        setUpdateState(prevState => !prevState)
    }

        const handleDelete = async (interestId: string) => {
            setMessage(null);
            try {
                const response = await fetch(`${API_URL}/intereses/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: interestId })
                })

                if (response.ok) {
                    setMessage({ text: 'Interest Deleted!', type: 'success'});
                    changeState();
                } else {
                    setMessage({ text: 'We have problems deliting the interest.', type: 'error'});
                }
            } catch (error) {
                setMessage({ text: 'Error en la transacción.', type: 'error'});

            }
        }

        const handleMouseEnter = (interestId: string) => {
            setHoveredInterestId(interestId)
        }

        const handleMouseLeave = () => {
            setHoveredInterestId(null)
        }

        const handleView = async (id: string) =>{
            try {
                const response = await fetch(`${API_URL}/intereses/view/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.ok){
                    const json = await response.json();
                    console.log(json.body);
                    auth.saveInterest(json.body);
                    navigate('/Items');
                }
            } catch (error) {
                console.error(error)
            }
        }

        const handleCloseSection = () => {
            auth.closeSection()
        }

        return (
            <div className='interestContainer' >
                <header className="headerInterest">
                    <button className='headerInterest__closeButton' onClick={handleCloseSection}>
                        Close section
                    </button>
                    <button className='headerInterest__addButton' onClick={handleChange}>
                        <h2 className="headerIneterest__h2">Add Interest</h2>
                        <svg className="headerIneterest__svg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </button>
                </header>

                {activeModal &&
                    <div className='createInterestContainer'>
                        <CreateInterest modalState={handleChange} interestModified={editInterest} editReset={editReset}/> 
                    </div>}

                {message && <Message text={message.text} type={message.type}/>}

                <main className="mainInterest">
                    {interest.map((interest: interest) => {
                        return (
                            <section
                                className="mainInterest__section"
                                key={interest._id}
                                onMouseEnter={() => handleMouseEnter(interest._id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hoveredInterestId === interest._id &&
                                    <div className='interest__options'>
                                        <button className='interest_options--edit' onClick={() => handleEditInterest(interest._id)}><img src="src/assets/pencil.svg" alt="edit" /></button>
                                        <button className='interest_options--delete' onClick={() => handleDelete(interest._id)}><img src="src/assets/trash.svg" alt="delete" /></button>
                                        <button className='interest_options--view' onClick={() => {handleView(interest._id)}}><img src="src/assets/eye.svg" alt="view" /></button>
                                    </div>}
                                <img className="mainInterest__section--img" src={interest.imagenURL} alt="Literature" />
                                <span className="mainInterest__section--span">{interest.nombre}</span>
                            </section>
                        )
                    })}
                </main>
            </div>
        )
    }