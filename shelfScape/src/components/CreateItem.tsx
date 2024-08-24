import { useEffect, useState } from 'react';
import './CreateItem.scss';
import { useAuth } from './AuthProvider';
import { v4 as uuidv4 } from 'uuid';
import { item } from '../types/Types';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';

export const CreateItem = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const interestSelected = auth.selectedInterest;

  useEffect(() => {
    if (auth.itemToEdit) {
      console.log(auth.itemToEdit);
      const callItem = async () => {
        try {
          const response = await fetch(`${API_URL}/items/${interestSelected?._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (response.ok) {
            const json = await response.json();
            const itemList = json.body.itemsList;
            const itemSelected = itemList.find((element: item) => element.id === auth.itemToEdit);
            if (itemSelected) {
              setName(itemSelected.name);
              setLink(itemSelected.link);
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
      callItem()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.itemToEdit]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleback = () => {
    navigate('../Items');
}


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newContent: item = {
      id: auth.itemToEdit ? auth.itemToEdit : uuidv4(),
      name: name,
      link: link,
      date: formatDate(Date.now())
    }

    //  const contenidos = auth.selectedInterest?.contenidos.push(newContent);
    const method = auth.itemToEdit ? 'PUT' : 'POST';
    const url = auth.itemToEdit ? `${API_URL}/items/edit/${auth.selectedInterest?._id}` : `${API_URL}/items/create/${auth.selectedInterest?._id}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContent)
      })
      if (response.ok) {
        console.log(newContent);
        auth.handleItemId('noID');
        auth.itemToEdit ? auth.handleMesage('The item was edited successfully!', 'success') : auth.handleMesage('The item was suceesfully!', 'success');
        navigate('/Items');
      } else {
        auth.itemToEdit ? auth.handleMesage('The item cannot be edited!', 'error') : auth.handleMesage('The item cannot be created', 'error');
        navigate('/Items');
      }
    } catch (error) {
      auth.handleMesage('Error en la transacción.', 'error');
    }
  }

  return (
    <>
      <div className='newItem'>

        <button className='mainLogin__buttonBack' onClick={handleback}>
          <img src="../src/assets/back.svg" alt="back" />
        </button>

        <form className='newItem__form' onSubmit={handleSubmit}>
          <input className="newItem__form--title" type="text" placeholder='Title' value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className="newItem__form--textArea" name="link" id="link" value={link} onChange={(e) => { setLink(e.target.value) }}>Here is the link</textarea>
          <button className='newItem__form--button' type='submit'>{auth.itemToEdit ? 'Edit' : 'Add'}</button>
        </form>
      </div>
    </>
  )
}