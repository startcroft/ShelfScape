import { useState } from 'react'
import { CreateInterest } from './CreateInterest'
import './Interest.scss'

export const Interest = () => {
    const [activeModal, setActiveModal] = useState(false)
    const handleChange = () =>{
        setActiveModal(true)
    }

    return (
        <div className='interestContainer'>
            <header className="headerInterest">
                <button onClick={handleChange}>
                <h2 className="headerIneterest__h2">Add Interest</h2>
                <svg className="headerIneterest__svg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                </button>
            </header>

            {activeModal && 
            <div className='createInterestContainer'>
            <CreateInterest/>
            </div>}

            <main className="mainInterest">
                <section className="mainInterest__section" >
                    <img className="mainInterest__section--img" src="src\assets\literaruta.jpg" alt="Literature" />
                    <span className="mainInterest__section--span" >Literature</span>
                </section>
                <section className="mainInterest__section" >
                    <img className="mainInterest__section--img" src="src\assets\literaruta.jpg" alt="Literature" />
                    <span className="mainInterest__section--span" >Spirituality</span>
                </section>
                <section className="mainInterest__section" >
                    <img className="mainInterest__section--img" src="src\assets\literaruta.jpg" alt="Literature" />
                    <span className="mainInterest__section--span" >Literature</span>
                </section>
                <section className="mainInterest__section" >
                    <img className="mainInterest__section--img" src="src\assets\literaruta.jpg" alt="Literature" />
                    <span className="mainInterest__section--span" >Literature</span>
                </section>
                <section className="mainInterest__section" >
                    <img className="mainInterest__section--img" src="src\assets\literaruta.jpg" alt="Literature" />
                    <span className="mainInterest__section--span" >Literature</span>
                </section>
                <section className="mainInterest__section" >
                    <img className="mainInterest__section--img" src="src\assets\literaruta.jpg" alt="Literature" />
                    <span className="mainInterest__section--span" >Literature</span>
                </section>
                <section className="mainInterest__section" >
                    <img className="mainInterest__section--img" src="src\assets\literaruta.jpg" alt="Literature" />
                    <span className="mainInterest__section--span" >Literature</span>
                </section>
            </main>

        </div>
    )
}