import './CreateItem.scss'

export const CreateItem = () => {

  return (
    <>
      <div className='newItem'>
        <form className='newItem__form' action="">
          <input className="newItem__form--title" type="text" placeholder='Title' />
          <textarea className="newItem__form--textArea" name="link" id="link">Here is the link</textarea>
          <button className='newItem__form--button'>Add</button>
        </form>
      </div>
    </>
  )
}