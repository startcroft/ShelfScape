import { messageProps } from '../types/Types'
import './Message.scss'
export const Message: React.FC<messageProps> = ({text, type}) => {
    const getColor = () => {
        switch (type) {
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            default:
                return 'black';
        }
    };

    return(
    <div className='messageContainer' style={{backgroundColor: `${getColor()}`}}>
        <p>{text}</p>
    </div>
    )
}