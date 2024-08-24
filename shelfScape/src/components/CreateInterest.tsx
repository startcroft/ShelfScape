import { useState, useEffect } from 'react'
import { useAuth } from './AuthProvider';
import { API_URL } from './constants';
import { CreateInterestProps } from '../types/Types';
import { Message } from './Message';
import './CreateInterest.scss';

export const CreateInterest: React.FC<CreateInterestProps> = ({ modalState, interestModified, editReset }) => {
  const [interestName, setInterestName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  
  const auth = useAuth();

  useEffect(() => {
    if (interestModified) {
      setInterestName(interestModified.nombre);
      setImage(interestModified.imagenURL);
    } else {
      setInterestName("");
      setImage(null);
    }
  }, [interestModified]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    // setLoading(true);
    // setError(null);

    if (!auth.data?._id) {
      // setError("User not authenticated");
      // setLoading(false);
      return;
    }

    const nuevoInteres = {
      nombre: interestName,
      imagenURL: image,
      contenidos: []
    };

    const method = interestModified ? 'PUT' : 'POST';
    const url = interestModified ? `${API_URL}/intereses/edit/${interestModified._id}` : `${API_URL}/usuarios/${auth.data._id}/intereses`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoInteres),
      });

      if (response.ok) {
        modalState();
        console.log(interestModified ? "Interest updated" : "Interest added");
        if (!interestModified) {
          setInterestName("");
          setImage(null);
        }
        editReset();
        // setMessage({ text: 'Interest addes successfully!', type: 'success'});
        interestModified ? auth.handleMesage('Interest edited successfully!', 'success') : 
        auth.handleMesage('Interest added successfully!', 'success')
      } else {
        // setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      auth.handleMesage('Error en la transacción.', 'error');
    } finally {
      // setLoading(false);
    }
  // }, [auth.data, interestName, image, modalState, interestModified];
  }

  return (
    <form className="newInterest" onSubmit={handleSubmit}>
    <img className="newInterest__img"  src={image ? image : "src/assets/uploadImage.jpg"} alt="upload image" />
    <input className="newInterest__input" type="text" placeholder='Interest name' value={interestName} onChange={(e) => setInterestName(e.target.value)}/>
    <input 
        placeholder='Add the of the image'
        type="text" 
        onChange={handleImageChange}
    />

    {interestModified ? <button className='newInterest__button'>Editar</button> : <button className='newInterest__button' type="submit" >Add</button>}
    {message && <Message text={message.text} type={message.type}/>}
    
</form>

  );
};


export default CreateInterest;
