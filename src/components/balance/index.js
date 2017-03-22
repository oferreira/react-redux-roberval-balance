import React, {Component} from 'react';
import {connect} from 'react-redux'
import TimerMixin from 'react-timer-mixin'

import {findHeaviestItem} from '../../reducers/balance/actions';
import Config from '../../constants/config';
import Item, {ITEM_TYPES} from '../item';

import './style.css';

export class Balance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this._getDefaultItems()
        };

        this.handleItemClick = this.handleItemClick.bind(this);
        this.reset = this.reset.bind(this);
        this.findHeaviestItem = this.findHeaviestItem.bind(this);
    }


    _createItem(index, weight = this.props.weight) {
        let type = ITEM_TYPES.find(x => x = Math.floor(Math.random() * (this.props.qty - 1)));
        return {
            index,
            weight,
            type
        }
    }

    _getDefaultItems() {
        return Array.from(Array(this.props.qty).keys()).map(i => this._createItem(i));
    }

    handleItemClick(item) {
        let items = this.state.items;
        items.filter((e) => e.weight > this.props.weight).map(i => i.weight = this.props.weight);
        items[item.index].weight = Math.floor(this.props.weight * 1.1);

        this.setState({
            items
        });
    }

    reset() {
        let items = this.state.items;
        items.filter((e) => e.weight > this.props.weight).map(i => i.weight = this.props.weight);

        this.setState({
            items,
            error: false,
            result: false
        });
    }

    findHeaviestItem() {
        TimerMixin.setTimeout(() => this.props.findHeaviestItem(
            this.state.items,
            () => this.setState({isWaiting: false})
        ), 500);

    }

    renderItems() {
        const items = this.state.items.map(item => (
            <Item
                key={item.index}
                id={item.index}
                item={item}
                selected={item.weight !== this.props.weight}
                handleClick={this.handleItemClick}
            />
        ));

        return (
            <div className="items">
                {items}
            </div>
        )
    }

    renderControls() {
        return (
            <div className="row">
                <div className="controls">
                    <button className="button reset" onClick={this.reset}>Remise à zero</button>
                    <button className="button run" onClick={this.findHeaviestItem}>Rechercher le fruit le plus lourd</button>
                </div>
            </div>
        )
    }

    renderError(error) {
        return (
            <div className="error">
                <h3>Erreur :</h3>
                <p>Nous n'avons pas réussi à trouver le plus lourd ... merci de sélectionner un fruit et de
                    réessayer</p>
            </div>
        )
    }

    renderResult(result) {

        return (
            <div className="results">
                <h3>Résultat :</h3>
                <p>Le fruit le plus lourd est le numéro{result.item.index + 1} !</p>
                <p>Et a été trouvé en {result.round} tours</p>
            </div>
        )
    }


    render() {
        const {error, result} = this.props

        return (
            <div className="balance">
                {this.renderItems()}
                {this.renderControls()}
                {error ? (this.renderError(error) ) : ''}
                {result ? (this.renderResult(result)) : ''}
            </div>
        );
    }
}

Balance.propTypes = {
    qty: React.PropTypes.number,
    weight: React.PropTypes.number,
    findHeaviestItem: React.PropTypes.func.isRequired
};

Balance.defaultProps = {
    qty: Config.Balance.qty,
    weight: Config.Balance.weight,
    result: false,
    error: false,
};


const mapStateToProps = (state) => {
    return {
        result: state.Balance.result,
        error: state.Balance.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findHeaviestItem: (items, callback) => {
            dispatch(findHeaviestItem(items, callback))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Balance)
