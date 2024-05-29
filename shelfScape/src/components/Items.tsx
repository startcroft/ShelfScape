import './Items.scss'

export const Items = () => {

    return (
        <>
            <main className='mainItems'>
                <section className='mainItems__section'>
                  <span className='mainItems__section--span'>Add item</span>
                  <svg className="mainItems__section--svg" xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                </section>
                <ul className='mainItems__ul'>
                    <li className='mainItems__ul--li'>
                        <section className='mainItems__li--sectionOne'>
                            <h2 className='sectionOne__h2'>Lama Rinchen - chapter 1</h2>
                            <span className='sectionOne__date'>14/05/2024</span>
                        </section>
                        <section className='mainItems__li--sectionTwo'>
                           <span className='sectionTwo__link'>www.youtube.com/lamarinchen</span>
                           <div className='sectionTwo__buttons'>
                            <button className='sectionTwo__buttons--edit'>Edit</button>
                            <button className='sectionTwo__buttons--delete'>Delete</button>
                           </div>
                        </section>
                    </li>
                    <li className='mainItems__ul--li'>
                        <section className='mainItems__li--sectionOne'>
                            <h2 className='sectionOne__h2'>Lama Rinchen - chapter 1</h2>
                            <span className='sectionOne__date'>14/05/2024</span>
                        </section>
                        <section className='mainItems__li--sectionTwo'>
                           <span className='sectionTwo__link'>www.youtube.com/lamarinchen</span>
                           <div className='sectionTwo__buttons'>
                            <button className='sectionTwo__buttons--edit'>Edit</button>
                            <button className='sectionTwo__buttons--delete'>Delete</button>
                           </div>
                        </section>
                    </li>
                    <li className='mainItems__ul--li'>
                        <section className='mainItems__li--sectionOne'>
                            <h2 className='sectionOne__h2'>Lama Rinchen - chapter 1</h2>
                            <span className='sectionOne__date'>14/05/2024</span>
                        </section>
                        <section className='mainItems__li--sectionTwo'>
                           <span className='sectionTwo__link'>www.youtube.com/lamarinchen</span>
                           <div className='sectionTwo__buttons'>
                            <button className='sectionTwo__buttons--edit'>Edit</button>
                            <button className='sectionTwo__buttons--delete'>Delete</button>
                           </div>
                        </section>
                    </li>
                    <li className='mainItems__ul--li'>
                        <section className='mainItems__li--sectionOne'>
                            <h2 className='sectionOne__h2'>Lama Rinchen - chapter 1</h2>
                            <span className='sectionOne__date'>14/05/2024</span>
                        </section>
                        <section className='mainItems__li--sectionTwo'>
                           <span className='sectionTwo__link'>www.youtube.com/lamarinchen</span>
                           <div className='sectionTwo__buttons'>
                            <button className='sectionTwo__buttons--edit'>Edit</button>
                            <button className='sectionTwo__buttons--delete'>Delete</button>
                           </div>
                        </section>
                    </li>
                </ul>
            </main>
        </>
    )
}