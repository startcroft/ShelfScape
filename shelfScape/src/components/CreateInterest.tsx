import './CreateInterest.scss'

export const CreateInterest = () => {
    return(
        <form className="newInterest" action="">
            <img className="newInterest__img"src="src/assets/uploadImage.jpg" alt="upload image" />
            <input className="newInterest__input" type="text" placeholder='Interest name' />
            <button className='newInterest__button'>Add</button>
        </form>

    )
}