import { useState } from 'react';
import './App mejora.css';

function App() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [textAVoz, setTextAVoz] = useState('');
  const [vozAText, setVozAText] = useState('');
  const [logueado, setLogueado] = useState(false);

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value);
  }

  function cambiarClave(evento) {
    setClave(evento.target.value);
  }

  function ingresar() {
    if (usuario === 'admin' && clave === 'admin') {
      alert('Has ingresado correctamente');
      setLogueado(true);
    } else {
      alert('Usuario o clave incorrectos');
    }
  }

  function cambiarTexto(evento) {
    setTextAVoz(evento.target.value);
  }

  function convertirTextAVoz() {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(textAVoz);
    synth.speak(utterThis);
  }

  function resultado(evento) {
    setVozAText(evento.results[0][0].transcript);
  }

  function grabarVozAText() {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.start();
    recognition.onresult = resultado;
  }

  if (logueado) {
    return (
      <>
        <div>
          <h3>Conversor de texto a voz</h3>
          <input
            type="text"
            id="textAVoz"
            value={textAVoz}
            onChange={cambiarTexto}
            placeholder="Escribe algo para convertir a voz"
          />
          <button onClick={convertirTextAVoz}>Convertir</button>
        </div>

        <br />

        <div>
          <h3>Conversor de voz a texto</h3>
          <button onClick={grabarVozAText}>Grabar</button>
          <p>{vozAText}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h3>Inicio de sesión</h3>
        <label htmlFor="usuario">Usuario</label>
        <input
          type="text"
          name="usuario"
          id="usuario"
          value={usuario}
          onChange={cambiarUsuario}
          placeholder="Ingrese su usuario"
        />
        <br />
        <label htmlFor="clave">Clave</label>
        <input
          type="password"
          name="clave"
          id="clave"
          value={clave}
          onChange={cambiarClave}
          placeholder="Ingrese su clave"
        />
        <br />
        <button onClick={ingresar}>Ingresar</button>
      </div>
    </>
  );
}

export default App;
