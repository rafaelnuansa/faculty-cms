// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center mt-10">
            <h1 className="display-1">404</h1>
            <p className="lead">Oops! The page you`re looking for doesn`t exist.</p>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
    );
};

export default NotFound;
