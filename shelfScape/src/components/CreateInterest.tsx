import { useState } from 'react'
import { useAuth } from './AuthProvider';
import { API_URL } from './constants';
import './CreateInterest.scss'

export const CreateInterest = () => {
    const [interestName, setInterestName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const auth = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevoInteres = {
            nombre: interestName,
            imagenURL: image ? URL.createObjectURL(image) : null,
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
                console.log('Interés agregado exitosamente');
                // Maneja la respuesta exitosa
            } else {
                console.error('Error al agregar el interés');
                // Maneja el error
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            // Maneja el error
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };
    return(
        <form className="newInterest" onSubmit={handleSubmit}>
            <img className="newInterest__img"  src={image ? URL.createObjectURL(image) : "src/assets/uploadImage.jpg"} alt="upload image" />
            <input className="newInterest__input" type="text" placeholder='Interest name' value={interestName} onChange={(e) => setInterestName(e.target.value)}/>
            <input 
                type="file" 
                onChange={handleFileChange}
            />
            <button className='newInterest__button' type="submit">Add</button>
        </form>

    )
}