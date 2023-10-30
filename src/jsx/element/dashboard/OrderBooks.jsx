import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from '../../../services/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';

const fillIn = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 0%;
  }
`;

const AnimatedTableCell = styled.td`
  animation: ${fillIn} 3.5s;
    margin-bottom: 10px; /* Espaçamento vertical entre as linhas */

`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
`;

const AnimatedTableRow = styled.tr`
  animation: ${fadeIn} 2.5s;
  margin-bottom: 10px;


`;

const OrderBook = ({ SymbolCoin }) => {
    const { t } = useTranslation();
    const [buyOrders, setBuyOrders] = useState([]);
    const [sellOrders, setSellOrders] = useState([]);
    const [lastSellPrice, setLastSellPrice] = useState(null);
    const [highlightedRow, setHighlightedRow] = useState(null);
    const [highlightedRows, setHighlightedRows] = useState([]);

    // Função para obter os dados do livro de pedidos
    const getOrderBooks = async () => {
        try {
            const response = await axios.get(`ordersbooks/all/${(SymbolCoin)}`);
            const buyOrders = response.data.filter(item => item.Tipo === 1).slice(0, 6).reverse();
            const sellOrders = response.data.filter(item => item.Tipo === 2).slice(0, 6).reverse();

            setBuyOrders(buyOrders.reverse());
            setSellOrders(sellOrders.reverse());

            if (sellOrders.length > 0) {
                const lastSellOrder = sellOrders[sellOrders.length - 1];
                setLastSellPrice(lastSellOrder.PriceCoin);

                // Adicione todas as linhas de compra e venda à lista de linhas destacadas
                const allHighlightedRows = [...buyOrders, ...sellOrders].map(item => item.id);
                setHighlightedRows(allHighlightedRows);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getOrderBooks();
        const interval = setInterval(() => {
            getOrderBooks();
        }, 2300);
    
        return () => {
            clearInterval(interval);
        };
    }, [SymbolCoin]);

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Order Book</h4>
            </div>
            <PerfectScrollbar>
                <div className="card-body order-book">
                    {/* Tabela de ordens "SELL" */}
                    <table className="table table-hover" id="sell">
                        <thead>
                            <tr>
                                <th scope="col">{t('Application_Valor')}</th>
                                <th scope="col">{t('Application_Qtd')}</th>
                                <th scope="col">{t('Application_Total')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellOrders.map((item, index) => (
                                <AnimatedTableRow
                                    key={item.id}
                                    className={highlightedRows.includes(item.id) ? (
                                        item.Tipo === 1 ? 'gradient-highlighted-danger' : 'gradient-highlighted-danger'
                                    ) : ''}
                                >
                                    <AnimatedTableCell className={item.Tipo === 1 ? 'text-success' : 'text-danger'}>
                                        {parseFloat(item.PriceCoin).toFixed(7)}
                                    </AnimatedTableCell>
                                    <AnimatedTableCell>{parseFloat(item.QtdCoin).toFixed(7)}</AnimatedTableCell>
                                    <AnimatedTableCell>{parseFloat(item.QtdUsd).toFixed(2)}</AnimatedTableCell>
                                </AnimatedTableRow>
                            ))}
                        </tbody>
                    </table>
                    <div className="order-book-divider">
                        <h6 className={`${lastSellPrice > buyOrders[0]?.PriceCoin ? 'text-success' : 'text-danger'}`}>
                            {lastSellPrice > buyOrders[0]?.PriceCoin ? (
                                <FontAwesomeIcon icon={faArrowUp} className="text-success" />
                            ) : (
                                <FontAwesomeIcon icon={faArrowDown} className="text-danger" />
                            )}{' '}
                            {parseFloat(lastSellPrice).toFixed(2)}
                        </h6>
                    </div>
                    {/* Resto do código, incluindo a tabela "BUY" */}
                    <table className="table" id="buy">
                        <thead>
                            <tr>
                                <th scope="col">{t('Application_Valor')}</th>
                                <th scope="col">{t('Application_Qtd')}</th>
                                <th scope="col">{t('Application_Total')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyOrders.map((item, index) => (
                                <AnimatedTableRow
                                    key={item.id}
                                    className={highlightedRows.includes(item.id) ? (
                                        item.Tipo === 2 ? 'gradient-highlighted-success' : 'gradient-highlighted-success'
                                    ) : ''}
                                >
                                    <AnimatedTableCell className={item.Tipo === 1 ? 'text-success' : 'text-danger'}>
                                        {parseFloat(item.PriceCoin).toFixed(7)}
                                    </AnimatedTableCell>
                                    <AnimatedTableCell>{parseFloat(item.QtdCoin).toFixed(7)}</AnimatedTableCell>
                                    <AnimatedTableCell>{parseFloat(item.QtdUsd).toFixed(2)}</AnimatedTableCell>
                                </AnimatedTableRow>
                            ))}
                        </tbody>
                    </table>
                </div>
            </PerfectScrollbar>
        </div>
    );
};

export default OrderBook;
