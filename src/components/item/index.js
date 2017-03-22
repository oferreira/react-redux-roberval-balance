import React, {Component} from 'react';
import classNames from "classnames";
import './style.css';


export const ITEM_TYPES= ['apple','orange','lemon','pear']

class Item extends Component {
    render() {
        return (
            <div className={classNames({
                "container": true,
                selected: this.props.selected
            })} onClick={() => this.props.handleClick(this.props.item)}>
                <div className="container-item">
                    <div className="item">
                        <div className={this.props.item.type}></div>
                    </div>
                </div>

                <span className="index">{this.props.item.index + 1} </span>
                <span className="weight">{this.props.item.weight} g</span>
            </div>
        )
    }
}


Item.propTypes = {
    id: React.PropTypes.number,
    selected: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
};


export default Item
