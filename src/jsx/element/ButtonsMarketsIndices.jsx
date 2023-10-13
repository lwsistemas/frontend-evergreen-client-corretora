import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


function ButtonsMarketsIndices() {
    const user = useSelector(state => state.user)
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isStock, setisStock] = useState(user.isStock === 1);
    let timeout = 0; // Variável para armazenar o timeout
    
    const openModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);

        // Fecha o modal após 5 segundos
        timeout = setTimeout(() => {
            closeModal();
        }, 5000); // 5000 milissegundos = 5 segundos
    };

    const closeModal = () => {
        setModalMessage('');
        setIsModalOpen(false);
        clearTimeout(timeout); // Limpa o timeout ao fechar o modal
    };

    // Função para obter a mensagem com base na opção selecionada
    const getMessage = (option) => {
        switch (option) {
            case 'Stocks':
                return "Você não tem acesso a esse tipo de investimento de Stock";
                
            case 'Arbitragem':
                return "Você não tem acesso a esse tipo de investimento para Arbitragem";
            default:
                return '';
        }
    };

    const getStock = (option) => {
        switch (option) {
            case 'Stocks':
                
                window.location.href = '/Stocks';
        }

    }

    useEffect(() => {
        // Limpa o timeout quando o componente é desmontado
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="flex-row" role="group" style={{ display: 'flex', float: 'right' }}>
            <Link className="btn btn-outline-primary m-1" to={'/mercados'}>
                {t('Application_Cryptos')}&nbsp;<i className="mdi mdi-bitcoin"></i>
            </Link>
            <button
                className="btn btn-outline-primary m-1"
                onClick={() => {
                    if (isStock == true) {
                        // Chama a função getStock com o parâmetro 'Stocks'
                        getStock('Stocks');
                    } else {
                        const message = getMessage('Stocks');
                        openModal(message);
                    }
                }}
            >
                
                {t('Application_Stock')}&nbsp;<i className="mdi mdi-finance"></i>
            </button>

            <button
                className="btn btn-outline-primary m-1"
                onClick={() => {
                    const message = getMessage('Arbitragem');
                    openModal(message);
                }}
            >
                {t('Application_Arbitragem')}&nbsp;<i className="mdi mdi-reload"></i>
            </button>

            {/* Modal */}
            <div
                className={`modal fade ${isModalOpen ? 'show' : ''}`}
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden={!isModalOpen}
                style={{ display: isModalOpen ? 'block' : 'none' }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content bg-warning">
                        <div className="modal-header">
                            <h5 className="modal-title text-white" id="exampleModalLabel">
                                Informação <i className="fa fa-exclamation-triangle"></i>
                            </h5>
                            <button type="button" className="close" onClick={closeModal} aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-white">
                            {modalMessage}
                        </div>
                    </div>
                </div>
            </div>
            {/* Fim do Modal */}
        </div>
    );
}

export default ButtonsMarketsIndices;
