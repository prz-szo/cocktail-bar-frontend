import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fetchJson, prepareParams } from '../../utils/fetch';

import './CocktailsList.css';


class CocktailsList extends React.Component {
  static propTypes = {
    cocktails: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  __fetchCocktail = async (id) => {
    const cocktail = (await fetchJson(`http://localhost:3300/cocktails/${id}`, prepareParams())).cocktail;
    this.props.onClick(cocktail)
  };

  __renderCocktailsList() {
    return this.props.cocktails.map(cocktail => (
      <div
        key={cocktail.id}
        className='cocktail'
        onClick={() => this.__fetchCocktail(cocktail.id)}
      >
        {cocktail.name}
      </div>
    ));
  }

  render() {
    return (
      <div className={classNames('cocktails-list', 'bp3-card', 'bp3-elevation-1')}>
        {this.__renderCocktailsList()}
      </div>
    );
  }
}

export default CocktailsList;
