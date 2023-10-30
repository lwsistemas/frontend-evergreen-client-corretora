import React from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Importe 'toast' e 'ToastContainer'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => {
    toast('Esta é uma notificação toast!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <h1>Exemplo de Notificação Toast em React</h1>
      <button onClick={notify}>Mostrar Notificação</button>
      <ToastContainer /> {/* Inclua o ToastContainer para renderizar as notificações */}
    </div>
  );
}

export default App;
