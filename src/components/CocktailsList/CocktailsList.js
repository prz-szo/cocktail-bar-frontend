import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Intent, Tag } from '@blueprintjs/core';
import { fetchJson, prepareParams, prepareAuthParams } from '../../utils/fetch';

import './CocktailsList.css';


class CocktailsList extends React.Component {
  static propTypes = {
    cocktails: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    onClick: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  __fetchCocktail = async (id) => {
    const cocktail = (await fetchJson(
      `${process.env.REACT_APP_BACK}/cocktails/${id}`, prepareParams())).cocktail;
    this.props.onClick(cocktail);
  };

  __editCocktail = async (id) => {
    const cocktail = (await fetchJson(`${process.env.REACT_APP_BACK}/cocktails/${id}`, prepareAuthParams())).cocktail;
    this.props.onEdit(cocktail);
  };

  __deleteCocktail = async (id) => {
    const cocktail = await fetchJson(`${process.env.REACT_APP_BACK}/cocktails/${id}`, prepareAuthParams({}, 'DELETE'));
    if (cocktail.message === 'Removed') {
      this.props.onRemove();
    }
  };

  __renderCocktailsList() {
    return this.props.cocktails.map((cocktail, index) => (
      <div
        key={cocktail.id}
        className='cocktail'
        onClick={() => this.__fetchCocktail(cocktail.id)}
      >
        <Tag intent={Intent.SUCCESS} round>{index + 1}</Tag>
        <span>{cocktail.name}</span>
        <span>
          <Button
            icon='edit'
            intent={Intent.WARNING}
            minimal
            onClick={(e) => {
              e.stopPropagation();
              this.__editCocktail(cocktail.id);
            }}
          />
          <Button
            icon='remove'
            intent={Intent.DANGER}
            minimal
            onClick={(e) => {
              e.stopPropagation();
              this.__deleteCocktail(cocktail.id);
            }}
          />
        </span>
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
