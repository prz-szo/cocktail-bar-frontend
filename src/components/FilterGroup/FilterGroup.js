import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Intent, HTMLSelect, Button, ButtonGroup, ControlGroup } from '@blueprintjs/core';
import { fetchRandomCocktail } from '../../utils/fetch';

import './FilterGroup.css';

const OPTIONS = ['Name', 'Number of ingredients', 'Specific ingredients', 'Average marks', 'Yours'];

class FilterGroup extends React.Component {
  static propTypes = {
    setCocktail: PropTypes.func.isRequired,
    setCocktailsList: PropTypes.func.isRequired,
    addNewCocktail: PropTypes.func.isRequired,
  };

  __randomCocktail = async () => {
    const cocktail = (await fetchRandomCocktail()).cocktail;
    this.props.setCocktail(cocktail);
  };

  render() {
    return (
      <div className='filter-group'>
        <ControlGroup fill>
          <InputGroup intent={Intent.PRIMARY} type={'text'}/>
          <HTMLSelect options={OPTIONS}/>
        </ControlGroup>
        <ButtonGroup fill>
          <Button text='Add new' icon='plus' onClick={this.props.addNewCocktail}/>
          <Button text='Random' icon='random' onClick={this.__randomCocktail}/>
          <Button text='By your bar' icon='shop' disabled/>
          <Button intent={Intent.PRIMARY} text='Filter' icon='filter-list'/>
        </ButtonGroup>
      </div>
    );
  }
}

export default FilterGroup;
