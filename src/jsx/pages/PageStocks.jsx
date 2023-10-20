import React, { useEffect, useState, useRef  } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar/sidebar';
import axios from "../../services";
import { useTranslation } from "react-i18next";
import ButtonsMarkets from '../element/ButtonsMarkets';
import ButtonsMarketsIndices from '../element/ButtonsMarketsIndices';
import { useSelector, useDispatch } from 'react-redux';
import { User } from "../store/User/User.action";
import BottomBar from '../layout/sidebar/bottom-bar';
import { Loader } from "./home/components/loader";
import TradingViewWidget2 from '../element/dashboard/TradingViewWidget';

function Mercados() {
    const user = useSelector((state) => state.user);
    const { t } = useTranslation();
    const [prices, setPrices] = useState([]);
    const parametros = useParams();
    const [currencyTipo, setCurrencyTipo] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPrices, setFilteredPrices] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchResultsRef = useRef(null);

    useEffect(() => {
        // Adicionar um ouvinte de eventos para cliques no documento
        document.addEventListener('click', handleClickOutside);

        // Remover o ouvinte de eventos quando o componente for desmontado
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
            // Se o clique for fora do search-results, fecha o search-results
            setShowSearchResults(false);
        }
    };



    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filterCoins = () => {
        const query = searchQuery.toLowerCase();
        const filtered = prices.filter((coin) => {
            const tickerLower = coin.ticker ? coin.ticker.toLowerCase() : '';
            const mshIdLower = coin.msh_id ? coin.msh_id.toLowerCase() : '';
            const descriptionLower = coin.description ? coin.description.toLowerCase() : '';
            return tickerLower.includes(query) || mshIdLower.includes(query) || descriptionLower.includes(query);
        });
        setFilteredPrices(filtered);

        // Mostrar resultados da pesquisa se houver algum resultado
        setShowSearchResults(filtered.length > 0);
    };



    const getPrices = async () => {
        try {
            const pricesData = (await axios.get(`/price/Stocks`)).data;
            setPrices(pricesData.reverse());
            setFilteredPrices(pricesData.reverse());
        } catch (err) {
            return err.message;
        }
    };

    const validUser = async () => {
        try {
            const valid = await axios.put('user/validUser', {
                authKey: user.authKey,
            });
        } catch (error) {
            if (error.response) {
                if (error.response.status && error.response.status === 406) {
                    console.log('invalid user');
                    dispatch(User(null));
                } else {
                    console.log('Unexpected error');
                }
            } else {
                console.log('Unexpected error 404');
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        setIsLoading(true);
        validUser()
            .then(() => getPrices())
            .then(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          getPrices();
        }, 12000);
        
        return () => {
          clearInterval(interval);
        };
      }, []);
      

    useEffect(() => {
        filterCoins();
    }, [searchQuery, prices]);

    const displayedPrices = filteredPrices
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredPrices.length / itemsPerPage);

    return (
        <>
            <Header2 title={t('Application_Mercados') + ' / Stocks'} />
            <Sidebar selectedItem="markets" />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="content-body">
                    <div className="container">
                        <div className="card sub-menu">
                            <div className="card-body">
                                <div>
                                    <ButtonsMarkets />
                                </div>
                            </div>
                        </div>

                        <div className="card sub-menu">
                            <div className="card-body">
                                <div>
                                    <ButtonsMarketsIndices />
                                </div>
                            </div>
                        </div>

                        <div className="card sub-menu">
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        {totalPages > 1 && (
                                            <div className="row">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className='btn btn-outline-primary'
                                                >
                                                    Anterior
                                                </button>
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <button
                                                        key={i}
                                                        className={currentPage === i + 1 ? 'active btn btn-outline-primary' : 'btn btn-outline-primary'}
                                                        onClick={() => handlePageChange(i + 1)}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className='btn btn-outline-primary'
                                                >
                                                    Próximo
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="search-box" ref={searchResultsRef}>
                                            <input
                                                type="text"
                                                placeholder="Pesquisar"
                                                value={searchQuery}
                                                onChange={handleSearch}
                                                className="form-control"
                                            />
                                            {searchQuery !== '' && (
                                                <div className="search-results">
                                                    {/* Inserir informações dos resultados da pesquisa aqui */}
                                                    {displayedPrices.map((coin) => (
                                                        <div key={coin.id}>
                                                            {/* Renderize os detalhes da pesquisa aqui */}
                                                            <Link
                                                                style={{ width: '100%' }}
                                                                to={`/robots/Stocks/${coin.ticker}/${coin.composite_figi}`}
                                                            >
                                                                <span>
                                                                    <img
                                                                        src={coin.img}
                                                                        style={{
                                                                            width: 'auto',
                                                                            height: '35px',
                                                                            margin: '10px',
                                                                            float: 'left'
                                                                        }}
                                                                        alt={`${coin.img} logo`}
                                                                    />
                                                                </span>
                                                                <p>{coin.ticker} / {coin.msh_id} / Setor: {coin.sector} / industry {coin.industry}</p>
                                                            </Link>

                                                            {/* Adicione outras informações relevantes da pesquisa aqui */}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '10px' }}>
                            {displayedPrices.map((coin) => (
                                <div className="col-md-12" key={coin.id}>
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="d-flex align-items-center">
                                                <span>
                                                    <img
                                                        src={coin.img}
                                                        style={{
                                                            width: 'auto',
                                                            height: '65px',
                                                            margin: '10px',
                                                        }}
                                                        alt={`${coin.img} logo`}
                                                    />
                                                </span>
                                                <div
                                                    className="flex-grow-1"
                                                    style={{
                                                        marginLeft: '5px',
                                                        fontSize: '20px',
                                                        width: '80%',
                                                    }}
                                                >
                                                    {coin.ticker} / {coin.msh_id} / Setor: {coin.sector} / industry {coin.industry}
                                                </div>
                                            </div>
                                            <p style={{ textAlign: 'right' }}>
                                                <span
                                                    style={{ color: coin.change_perc_today > 0 ? '#07ce71' : '#7f2929' }}
                                                >
                                                    &nbsp;{coin.change_perc_today}% 24h
                                                </span>
                                                <h3 className="mt-2">
                                                    {Intl.NumberFormat('en-IN', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                        minimumFractionDigits: 2,
                                                    }).format(coin.last_price)}
                                                </h3>
                                                <span>
                                                    Composite Figi: {coin.composite_figi}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="card-body" style={{ minHeight: '400px' }}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="text-justify">{coin.description}</div>
                                                    <div style={{ float: 'left', margin: '20px 0 0 10px' }}>
                                                        <Link
                                                            className="btn btn-outline-primary btn-lg"
                                                            style={{ width: '100%' }}
                                                            to={`/robots/Stocks/${coin.ticker}/${coin.composite_figi}`}
                                                        >
                                                            {t('Application_StartMarketStocks')}&nbsp;<i className="fa fa-bar-chart-o" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-md-8 mt-2" style={{ minHeight: '400px' }}>
                                                    <TradingViewWidget2 symbol={coin.ticker} id={coin.ticker} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card sub-menu">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        {totalPages > 1 && (
                                            <div className="row">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className='btn btn-outline-primary'
                                                >
                                                    Anterior
                                                </button>
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <button
                                                        key={i}
                                                        className={currentPage === i + 1 ? 'active btn btn-outline-primary' : 'btn btn-outline-primary'}
                                                        onClick={() => handlePageChange(i + 1)}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className='btn btn-outline-primary'
                                                >
                                                    Próximo
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <BottomBar selectedIcon="markets" />
        </>
    );
}

export default Mercados;
