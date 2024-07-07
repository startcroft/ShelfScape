import { useState } from 'react'
import { useAuth } from './AuthProvider';
import { API_URL } from './constants';
import { CreateInterestProps } from '../types/Types';
import './CreateInterest.scss';

export const CreateInterest: React.FC<CreateInterestProps> = ({modalState, interestModified}) => {
    const [interestName, setInterestName] = useState(interestModified ? interestModified.nombre : "");
    const [image, setImage] = useState<string | null>(interestModified ? interestModified.imagenURL : null);
    const auth = useAuth();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const nuevoInteres = {
          nombre: interestName,
          imagenURL: image,
          contenidos: []
        };
    
        try {
          const response = await fetch(`${API_URL}/usuarios/${auth.data?._id}/intereses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoInteres),
          });
    
          if (response.ok) {
            modalState();
            console.log("Interest added");
            // Maneja la respuesta exitosa
          } else {
            console.log(`Error: ${response.statusText}`);
            // Maneja la respuesta de error del servidor
          }
        } catch (error) {
          console.error("Fetch error: ", error);
          // Maneja los errores de la solicitud fetch
        }
        
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setImage(e.target.value);
    };
    return(
        <form className="newInterest" onSubmit={handleSubmit}>
            <img className="newInterest__img"  src={image ? image : "src/assets/uploadImage.jpg"} alt="upload image" />
            <input className="newInterest__input" type="text" placeholder='Interest name' value={interestName} onChange={(e) => setInterestName(e.target.value)}/>
            <input 
                placeholder='Add the of the image'
                type="text" 
                onChange={handleImageChange}
            />

            {interestModified ? <button className='newInterest__button'>Editar</button> : <button className='newInterest__button' type="submit" >Add</button>}
            
        </form>

    )
}