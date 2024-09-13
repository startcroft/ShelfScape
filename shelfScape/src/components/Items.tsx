import './Items.scss'
import { useAuth } from './AuthProvider'
import { useEffect, useState } from 'react';
import { API_URL } from './constants';
import { item, messageProps } from '../types/Types'
import { useNavigate } from 'react-router-dom';
import { Message } from './Message';

export const Items = () => {
    const [items, setItems] = useState<item[]>([]);
    const [updateItems, setUpdateItems] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const [message, setMesagge] = useState< messageProps | null | {text: string , type: 'success' | 'error'} >();
    const [isFirstRenderAuthMessage, setIsFirstRenderAuthMessage] = useState(true);

    useEffect(() => {
        const interestSelected = auth.selectedInterest;
        const fetchItems = async () => {
            try {
                const response = await fetch(`${API_URL}/items/${interestSelected?._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    const json = await response.json()
                    setItems(json.body.itemsList)

                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchItems();
        console.log(items)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.selectedInterest, updateItems]);

    useEffect(() => {
        if (auth.message && !isFirstRenderAuthMessage) {
          setMesagge(auth.message);
        }
        setIsFirstRenderAuthMessage(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [auth.message]);
      

    useEffect(() => {
       if(message){
        const timmer = setTimeout(() => {
            setMesagge(null);
        }, 3000);

        return () => {clearTimeout(timmer)}
       }

       
    }, [message]);

    const handleback = () => {
        navigate('../Interest');
    }

    const handleEditItem = (id:string) => {
        auth.handleItemId(id);
        navigate('../CreateItem');
    }

    const handleDelete = async(id: string) => {
      try {
        const response = await fetch(`${API_URL}/items/delete/${auth.selectedInterest?._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ id })
        })
        if(response.ok){
            setUpdateItems(prevState => !prevState);
            auth.handleMesage('Item deleted', 'success');
        }
        else {
            setMesagge({text:'Item cannot be deleted', type:'error'});
        }
      } catch (error) {
        auth.handleMesage('Error en la transacción.', 'error');
        
      }
    }

    return (
        <>
            <main className='mainItems'>
                <section className='mainItems__section'>

                <button className='mainLogin__buttonBack' onClick={handleback}>
                    <img src="../src/assets/back.svg" alt="back" />
                </button>

                    <button className='mainItems__section--addButton' onClick={() => {navigate('../CreateItem')}}>
                    <span className='mainItems__section--span'>Add item</span>
                    <svg className="mainItems__section--svg" xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    </button>
                </section>

                { message && <Message text={message.text} type={message.type}/>}
                <ul className='mainItems__ul'>
                    {
                      items.map(item =>
                        <li className='mainItems__ul--li'>
                        <section className='mainItems__li--sectionOne' key={item.id}>
                            <h2 className='sectionOne__h2'>{item.name}</h2>
                            <span className='sectionOne__date'>{item.date}</span>
                        </section>
                        <section className='mainItems__li--sectionTwo'>
                           <span className='sectionTwo__link'>{item.link}</span>
                           <div className='sectionTwo__buttons'>
                            <button className='sectionTwo__buttons--edit' onClick={() => {handleEditItem(item.id)}}>Edit</button>
                            <button className='sectionTwo__buttons--delete' onClick={() => {handleDelete(item.id)}}>Delete</button>
                           </div>
                        </section>
                    </li>
                      )
                    }
                </ul>
            </main>
        </>
    )
}