import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

const ConfirmPoint = () => {
    return (
        <div className="register-container">
            <FiCheckCircle size={40} color="#34CB79" />
            <h1>Ponto cadastrado com sucesso</h1>
            <Link to="/" className="button-register-to-home">Clique para voltar a Home</Link>
        </div>
    );
}

export default ConfirmPoint;