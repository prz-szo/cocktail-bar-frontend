import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, HTMLSelect, InputGroup, Intent, TextArea } from '@blueprintjs/core';
import Heading from '../../components/Heading/Heading';
import EditableIngredientsList from '../../components/EditableIngredientsList/EditableIngredientsList';

import './CocktailForm.css';

const MARKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


class CocktailForm extends React.Component {
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
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.name || '',
      recipe: props.recipe || '',
      mark: 0,
      ingredients: props.ingredients || [],
    }
  }

  __changeName = (e) => {
    this.props.onChange({ ...this.props, name: e.target.value })
  };
  __changeRecipe = (e) => {
    this.props.onChange({ ...this.props, recipe: e.target.value });
  };
  __changeIngredients = (ingredients) => {
    this.props.onChange({ ...this.props, ingredients });
  };

  __submitCocktail = () => {
    const {id, ingredients, name, recipe} = this.props;
    this.props.onSubmit({id, ingredients, name, recipe})
  };

  render() {
    return (
      <div className='cocktail-info'>
        <Heading name={this.props.id === 0 ? 'Add new cocktail' : 'Edit cocktail'}/>

        <div className='cocktail-form'>
          <InputGroup
            fill
            large
            intent={Intent.PRIMARY}
            value={this.props.name}
            leftIcon='edit'
            onChange={this.__changeName}
            placeholder='Provide cocktail name...'
          />
          <HTMLSelect
            large
            options={MARKS}
          />
          <FormGroup
            helperText="Provide your cocktail recipe..."
            label="Recipe"
            labelFor="recipe"
            labelInfo="(required)"
            intent={Intent.PRIMARY}
          >
            <TextArea
              large
              intent={Intent.PRIMARY}
              onChange={this.__changeRecipe}
              value={this.props.recipe}
              fill
            />
          </FormGroup>
          <EditableIngredientsList
            ingredients={this.props.ingredients}
            onChange={this.__changeIngredients}
          />
          <div className='control-buttons'>
            <Button
              text='Submit'
              fill
              icon='plus'
              intent={Intent.PRIMARY}
              onClick={this.__submitCocktail}
            />
          </div>
        </div>
      </div>);
  }
}

export default CocktailForm;