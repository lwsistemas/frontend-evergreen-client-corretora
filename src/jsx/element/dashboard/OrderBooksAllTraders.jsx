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
  margin-bottom: 10px;
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
    const [OrdersOrder, setOrdersOrder] = useState([]);
    const [lastSellPrice, setLastSellPrice] = useState(null);
    const [highlightedRows, setHighlightedRows] = useState([]);

    const getOrderBooks = async () => {
        try {
            const response = await axios.get(`ordersbooks/all/order/${SymbolCoin}`);
            const OrdersOrder = response.data.slice(0, 32);

            setOrdersOrder(OrdersOrder);

            if (OrdersOrder.length > 0) {
                const lastSellOrder = OrdersOrder[OrdersOrder.length - 1];
                setLastSellPrice(lastSellOrder.priceMedia);

                // Adicione todas as linhas de compra e venda à lista de linhas destacadas
                const allHighlightedRows = OrdersOrder.map(item => item.id);
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
        }, 1300);

        return () => {
            clearInterval(interval);
        };
    }, [SymbolCoin]);

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">{t('Applications_TradersMercado')}</h4>
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
                            {OrdersOrder.map((item, index) => (
                                <AnimatedTableRow
                                    key={item.id}
                                    className={highlightedRows.includes(item.id) ? (
                                        item.type === 'buy' ? 'gradient-highlighted-success' : 'gradient-highlighted-danger'
                                    ) : ''}
                                >
                                    <AnimatedTableCell className={item.type === 'buy' ? 'text-success' : 'text-danger'}>
                                        {parseFloat(item.priceMedia).toFixed(4)}
                                    </AnimatedTableCell>
                                    <AnimatedTableCell>{parseFloat(item.quantity).toFixed(6)}</AnimatedTableCell>
                                    <AnimatedTableCell>{parseFloat(item.finalValue).toFixed(3)}</AnimatedTableCell>
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
