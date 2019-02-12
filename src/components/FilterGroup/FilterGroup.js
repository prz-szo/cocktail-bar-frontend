import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Intent, HTMLSelect, Button, ButtonGroup, ControlGroup } from '@blueprintjs/core';
import { fetchJson, fetchRandomCocktail } from '../../utils/fetch';

import './FilterGroup.css';

const OPTIONS = {
  all: 'All',
  name: 'Exact name',
  ingredients: 'Number of ingredients',
  specificIngredients: 'Specific ingredients',
  marks: 'Average marks',
};

class FilterGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: OPTIONS.all,
      value: null
    }
  }

  static propTypes = {
    setCocktail: PropTypes.func.isRequired,
    setCocktailsList: PropTypes.func.isRequired,
    addNewCocktail: PropTypes.func.isRequired,
  };

  __randomCocktail = async () => {
    const cocktail = (await fetchRandomCocktail()).cocktail;
    this.props.setCocktail(cocktail);
  };

  __changeCocktailsQuery = (e) => {
    this.setState({ query: e.target.value })
  };

  __fetchCocktails = async () => {
    switch (this.state.query) {
      case OPTIONS.name:
        const result = (await fetchJson(`${process.env.REACT_APP_BACK}/cocktails?name=${this.state.value}`));
        if (result.cocktail) {
          this.props.setCocktail(result.cocktail);
        }
        break;
      case OPTIONS.ingredients:
        const cocktailsByIngredients = (await fetchJson(`${process.env.REACT_APP_BACK}/cocktails?ingredients=${this.state.value}`)).cocktails;
        if (cocktailsByIngredients) {
          this.props.setCocktailsList(cocktailsByIngredients);
        }
        break;
      case OPTIONS.marks:
        const cocktailsByMarks = (await fetchJson(`${process.env.REACT_APP_BACK}/cocktails?mark=${this.state.value}`)).cocktails;
        if (cocktailsByMarks) {
          this.props.setCocktailsList(cocktailsByMarks);
        }
        break;
      default:
        const cocktails = (await fetchJson(`${process.env.REACT_APP_BACK}/cocktails`)).cocktails;
        if (cocktails) {
          if (this.state.value) {
            return this.props.setCocktailsList(this.__filterCocktailsByPhrase(cocktails, this.state.value));
          }
          this.props.setCocktailsList(cocktails);
        }
        break;
    }
  };

  __filterCocktailsByPhrase = (cocktails, phrase) => {
    return cocktails.filter(cocktail => cocktail.name.includes(phrase));
  };

  __getInputType = () => {
    switch (this.state.query) {
      case OPTIONS.marks:
      case OPTIONS.ingredients:
        return 'number';
      case OPTIONS.name:
      default:
        return 'text';
    }
  };

  render() {
    return (
      <div className='filter-group' onKeyDown={e => {
        if (e.key === 'Enter')
          this.__fetchCocktails();
        }
      }>
        <ControlGroup fill>
          <InputGroup intent={Intent.PRIMARY} type={this.__getInputType()}
                      onChange={(e) => this.setState({ value: e.target.value })}
          />
          <HTMLSelect options={Object.values(OPTIONS)} onChange={this.__changeCocktailsQuery}/>
        </ControlGroup>
        <ButtonGroup fill>
          <Button text='Add new' icon='plus' onClick={this.props.addNewCocktail}/>
          <Button text='Random' icon='random' onClick={this.__randomCocktail}/>
          <Button text='By your bar' icon='shop' disabled/>
          <Button intent={Intent.PRIMARY} text='Fetch' icon='filter-list'
                  onClick={this.__fetchCocktails}
          />
        </ButtonGroup>
      </div>
    );
  }
}

export default FilterGroup;
