import logo from '../images/logo-gris.png';

function Cookies() {
    return (
        <div className="">

            <img className="m-4" src={logo} alt="" width="350" href="/" />

            <div className="container col-6">
                <p className="mt-3 text-white text-start">El acceso al sitio web puede implicar la utilización de cookies, que son pequeñas
                cantidades de información que se almacenan en el navegador utilizado por cada usuario para que el servidor
                recuerde cierta información que posteriormente pueda utilizar. Esta información permite identificar al usuario
                como un usuario concreto y permite guardar sus preferencias personales e información técnica como, por ejemplo,
                las páginas concretas que visita.
                Al navegar por nuestra Web, estará aceptando el uso de las cookies en las condiciones establecidas en la Política
                de Cookies excepto en la medida que haya modificado la configuración de su navegador para rechazar la utilización
                de las mismas. <br/>
                Las cookies utilizadas podrían ser de dos tipos:<br/>
                Cookies de sesión, que no se almacenan en el equipo del usuario, pero se necesitan durante cada sesión de uso en
                cada servicio web, ya que son imprescindibles para el correcto funcionamiento del servicio.
                Cookies almacenadas temporalmente en el equipo del usuario, que se utilizan para realizar estudios estadísticos
                anónimos y agregados del uso que los usuarios hacen del servicio, para poder hacer futuras mejoras y optimizaciones.
                Si el usuario deseara más información sobre cómo revocar el consentimiento prestado o sobre el procedimiento para
                deshabilitar las cookies, así como realizar alguna pregunta sobre la Política de Cookies del Sitio Web, se puede
                poner en contacto con el Titular a través de la siguiente dirección legal@homelidarity.es indicando en el asunto
                “Política de Cookies”.D ebe recordarse que, en ocasiones, la no aceptación de la cookie puede suponer la imposibilidad
                de acceder, en todo o parte, a la disponibilidad del servicio. El usuario debe consultar las instrucciones y manuales
                de su navegador para ampliar esta información.
                </p>
         
            </div>
        </div>
    );
}

export default Cookies;