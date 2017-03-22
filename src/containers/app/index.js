import React, {Component} from 'react';

import Balance from '../../components/balance';
import './style.css';

export class App extends Component {
    render() {
        return (
            <div className="app">
                <header className="header">
                    <h1>Bienvenue dans le jeu Roberval Balance !</h1>
                    <p>L’idée du jeu est simple, lorsque vous cliquez sur un fruit, vous augmentez son poids. Et ensuite lorsque vous cliquez sur le bouton « rechercher le fruit le plus lourd », l’ordinateur doit trouver celui-ci en un minimum de pesées</p>
                </header>
                <Balance qty={8} weight={100}/>
            </div>
        );
    }
}

export default App;