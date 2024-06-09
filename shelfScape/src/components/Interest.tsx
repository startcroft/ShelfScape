import { useState } from 'react'
import { CreateInterest } from './CreateInterest'
import './Interest.scss'
import { useAuth } from './AuthProvider'
import { interest } from '../types/Types'


export const Interest = () => {
    const [activeModal, setActiveModal] = useState(false)
    const [hoveredInterestId, setHoveredInterestId] = useState<string | null>(null)
    const auth = useAuth()

    const handleChange = () => {
        setActiveModal(true)
    }

    const handleMouseEnter = (interestId: string) => {
        setHoveredInterestId(interestId)
    }

    const handleMouseLeave = () => {
        setHoveredInterestId(null)
    }

    const handleCloseSection = () => {
        auth.closeSection()
    }

    return (
        <div className='interestContainer'>
            <header className="headerInterest">
                <button onClick={handleCloseSection}>
                    Close section
                </button>
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
                    <CreateInterest />
                </div>}

            <main className="mainInterest">
                {auth.data?.intereses.map((interest: interest) => {
                    return (
                        <section
                            className="mainInterest__section"
                            key={interest._id}
                            onMouseEnter={() => handleMouseEnter(interest._id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hoveredInterestId === interest._id &&
                                <div className='interest__options'>
                                    <button className='interest_options--edit'><img src="src/assets/pencil.svg" alt="edit" /></button>
                                    <button className='interest_options--delete'><img src="src/assets/trash.svg" alt="delete" /></button>
                                    <button className='interest_options--view'><img src="src/assets/eye.svg" alt="view" /></button>
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
