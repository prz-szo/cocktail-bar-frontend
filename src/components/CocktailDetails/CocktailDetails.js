import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Intent, OL, Callout, H3, Divider, Tag } from '@blueprintjs/core';
import Heading from '../Heading/Heading';

import './CocktailDetails.css';


class CocktailDetails extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    averageMark: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      measure: PropTypes.string.isRequired,
    })),
  };

  render() {
    return (
      <div className={classNames('cocktail-details')}>
        <Heading name={this.props.name}/>
        <Callout icon="book">{this.props.recipe}</Callout>
        <span className='ingredients-heading'>
          <H3>Ingredients:</H3>
          <Divider/>
        </span>
        <OL>{this.props.ingredients.map(ingredient =>
          <li key={ingredient.name}>
            {ingredient.name}
            <Tag round={true} intent={Intent.PRIMARY}>{ingredient.amount} {ingredient.measure}</Tag>
          </li>
        )}</OL>
      </div>);
  }
}


export default CocktailDetails;
