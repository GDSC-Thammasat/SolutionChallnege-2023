import '../../style/about.css'

import Thanahot from '../../assets/images/team/Thanachot.jpg'
import Suphawit from '../../assets/images/team/Suphawit.jpg'
import Erafan from '../../assets/images/team/Erafan.jpg'
import Afundy from '../../assets/images/team/Afundy.jpg'


const About = () => {
    return (
            <body>
                <div className='site-container'>


                    <div className='article-container'>
                        <article className='article-card'>
                            <figure className='article-image'>
                                <img src={Thanahot} alt="" height={200}/>
                            </figure>
                            <div className="article-content">
                                <h3 className='card-title'>Thanachot Wongmetin</h3>
                                <p className="card-excerpt">GDSC-TU Lead</p>
                                <p className="card-major">Software Engineer, Faculty of Engineer.</p>
                                <p className="card-job">Former Software Engineer Intern at WEDO.</p>
                            </div>

                        </article>

                        <article className='article-card'>
                            <figure className='article-image'>
                                <img src={Suphawit} alt="" height={200}/>
                            </figure>
                            <div className="article-content">
                                <h3 className='card-title'>Suphawit Chomsomsa</h3>              
                                <p className="card-excerpt">GDSC-TU Core Team</p>
                                <p className="card-major">Economics, Faculty of Economics.</p>
                                <p className="card-job">Former Data Engineer Intern at AIS.</p>
                            </div>

                        </article>
                        
                        <article className='article-card'>
                            <figure className='article-image'>
                                <img src={Erafan} alt="" height={200}/>
                            </figure>
                            <div className="article-content">
                                <h3 className='card-title'>Erafan Madaehoh</h3>
                                <p className="card-excerpt">GDSC-TU Participant</p>
                                <p className="card-major">Data Science, Faculty of Science.</p>
                                <p className="card-job">Former Data Scientist Intern at AIS.</p>
                            </div>

                        </article>

                        <article className='article-card'>
                            <figure className='article-image'>
                                <img src={Afundy} alt="" height={200}/>
                            </figure>
                            <div className="article-content">
                                <h3 className='card-title'>Afundy Hayeetah</h3>
                                <p className="card-excerpt">GDSC-TU Participant</p>
                                <p className="card-major">Physics, Faculty of Science.</p>
                                <p className="card-job">Former AI/ML Engineer Intern at AIS.</p>
                            </div>

                        </article>
                    </div>
                    
                </div>
            </body>
    )
    }
export default About