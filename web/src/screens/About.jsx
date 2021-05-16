import child from '../images/child-and-clown.jpg';
import paint from '../images/paint.jpg';
import family from '../images/family.jpg';
import logo from '../images/logo-gris.png';
import caixa from '../images/obrasocial.png';


function About() {
    return (
        <div className="login-card">
            <img className="my-3" src={logo} alt="" width="350" href="/" />
            <p className="text-secondary mt-3">Homelidarity es una propuesta de La Obra Social "la Caixa" para facilitar la estancia de las familias<br />
            que van a tener a sus hijos hospitalizados, durante largo tiempo, en el hospital infantil de Barcelona.
            </p>
            <p className="text-secondary">La finalidad de esta aplicación és acercar las viviendas a las que no se les está dando uso, a las familias<br />
            que puedan tener difultades para obtener una en condiciones durante largo tiempo.
            </p>
            <div>
                <img className="p-1 mt-3 rounded" src={child} alt="" width="250" href="/" />
                <img className="p-1 mt-3 rounded" src={paint} alt="" width="250" href="/" />
                <img className="p-1 mt-3 rounded" src={family} alt="" width="250" href="/" />
            </div>
            <p className="mt-5 text-secondary">También se facilita la posibilidad de hacer donaciones para que estas familias puedan<br />
            sufragar los gastos ocasionado de vivir lejos de su hogar, y posiblemente, no poder trabajar por atender las<br />
            del menor hospitalizado.
            </p>
            <img className="mt-5 rounded" src={caixa} alt="" width="250" href="/" />

        </div>
    );
}

export default About;