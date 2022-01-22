import React from 'react';
import "./about.sass";
import "./zombieAbout.png";

const About = () => {
    return (
        <div className="container">
            <h4>¡Hola! Esta pagina es el proyecto final del curso de React de CODERHOUSE. La misma fue realizada con la finalidad de explorar la utilizacion del framework y sus capacidades. 
                La pagina tiene un tono comico, siendo el primer e-commerce creado para "zombis" jaja.
                Pagina realizada por Matias Gulin</h4>
            <img src={require('./zombieAbout.png')} alt="zombie"></img>
        </div>
    )
}

export default About

