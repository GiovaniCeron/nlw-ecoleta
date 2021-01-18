import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import api from '../../services/api';
import axios from 'axios';

import './styles.css';

import logo from '../../assets/logo.svg';



interface Item {
    iditem: number;
    title: string;
};

interface UF {
    id: number;
    sigla: string;
    nome: string;
}

interface Cidade {
    nome: string;
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUFs] = useState<UF[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [cidades, setCidades] = useState([]);
    const [selectedCity, setSelectedCity] = useState('0');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatshapp: ''
    });
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            //const ufs = response.data.map(uf => uf.sigla)
            setUFs(response.data);
        });
    }, []);

    useEffect(() => {

        if (selectedUF === '0') {
            return;
        }
        axios.get<Cidade[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
            const cityNomes = response.data.map(cidade => cidade.nome);
            setCidades(cityNomes);
        });
    }, [selectedUF]);

    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUF(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectedItem(iditem: number) {
        const alreadySelected = selectedItems.findIndex(item => item === iditem);

        if(alreadySelected >= 0){
            const filterItems = selectedItems.filter(item => item !== iditem);
            setSelectedItems(filterItems);
        }else{
            setSelectedItems([...selectedItems, iditem]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const {name, email, whatshapp} = formData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude, longitude] = [-26.9976319,-51.2446501];
        const items = selectedItems;

        const data ={
            name,
            email,
            whatshapp,
            uf,
            city,
            latitude,
            longitude,
            items
        } 

        await api.post('points', data);

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br />ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatshapp">Watshapp</label>
                            <input
                                type="text"
                                name="whatshapp"
                                id="whatshapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o Endereço no mapa</span>
                    </legend>

                    <MapContainer
                        center={[-26.9976319, -51.2446501]}
                        zoom={15}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-26.9976319, -51.2446501]} />
                    </MapContainer>


                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUF}
                                onChange={handleSelectedUF}
                            >
                                <option value="0">Selecione um Estado</option>
                                {ufs.map(uf => (
                                    <option key={uf.id} value={uf.sigla}>{uf.sigla + ' - ' + uf.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectedCity}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {cidades.map(cidade => (
                                    <option key={cidade} value={cidade}>{cidade}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li 
                                key={item.iditem} 
                                onClick={() => handleSelectedItem(item.iditem)}
                                className={selectedItems.includes(item.iditem) ? 'selected' : ''}
                            >
                                <img src="http://localhost:3333/uploads/lampadas.svg" alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>

        </div>
    );
}

export default CreatePoint;