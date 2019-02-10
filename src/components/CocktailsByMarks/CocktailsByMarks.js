import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tag, Intent, Classes } from '@blueprintjs/core';
import Heading from '../Heading/Heading';

import './CocktailsByMarks.css';


class CocktailsByMarks extends React.Component {
  static propTypes = {
    cocktails: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avg_mark: PropTypes.number.isRequired,
    })),
    fetchCocktail: PropTypes.func.isRequired
  };

  __renderCocktails(cocktails) {
    return cocktails.map((cocktail, index) => (
      <tr key={cocktail.id} className='cocktail' onClick={() => this.props.fetchCocktail(cocktail.id)}>
        <td><Tag intent={Intent.SUCCESS} large>{index + 1}</Tag></td>
        <td>{cocktail.name}</td>
        <td><Tag round intent={Intent.PRIMARY} large>{cocktail.avg_mark}</Tag></td>
      </tr>
    ));
  }

  render() {
    return (
      <div className='cocktails-by-mark'>
        <Heading name={'Top 10 Cocktails'}/>
        <table className={classNames(Classes.interactive, Classes.stripped, 'cocktails-by-mark-list')}>
          <tbody>
          {this.__renderCocktails(this.props.cocktails)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CocktailsByMarks;
