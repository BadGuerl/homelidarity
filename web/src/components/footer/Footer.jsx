import minilogo from '../../images/minilogo.png'

function Footer() {
    return (
        <footer className="mt-4 position-fixed w-100 bottom-0 row justify-content-end">
            <div className="container d-flex justify-content-end p-4">
                <img className="pt-1" src={minilogo} alt="minilogo" width="25" height="25" />
                <a className="nav-link text-secondary m-0 p-1" href="About">/ Sobre Homelidarity </a>
                <a className="nav-link text-secondary m-0 p-1" href="Cookies">/ Politica de Cookies </a>
                <a className="nav-link text-secondary m-0 p-1" href="/">/ "la Caixa" </a>
                <p className="nav-link text-secondary m-0 p-1">/ 2021</p>
            </div>
        </footer>
    )
}

export default Footer;