import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/staking">Staking</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
