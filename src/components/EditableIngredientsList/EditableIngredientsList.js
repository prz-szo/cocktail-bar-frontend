import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, ControlGroup, HTMLSelect, InputGroup, Intent, Tag } from '@blueprintjs/core';
import { fetchAllIngredients } from '../../utils/fetch';
import measures from '../../utils/measures';

import './EditableIngredientsList.css';


class EditableIngredientsList extends React.Component {
  static propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      measure: PropTypes.string.isRequired,
    })),
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        measure: '',
        amount: 0
      },
      fullIngredientsList: []
    };

    this.__fetchAllIngredients();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({ value: { ...this.state.value, ingredients: this.props.ingredients } })
    }
  }

  __fetchAllIngredients = async () => {
    const fullIngredientsList = (await fetchAllIngredients()).ingredients;
    const list = fullIngredientsList.map(ing => ({ value: ing.id, label: ing.name }));
    this.setState({ fullIngredientsList: list });
  };

  __selectIngredient = (e) => {
    const ingValue = +e.target.value;
    const name = this.state.fullIngredientsList.find(ing => ing.value === ingValue).label;
    this.setState({ value: { ...this.state.value, name } });
  };

  __selectMeasure = (e) => {
    const measureValue = +e.target.value;
    const measure = measures.find(obj => obj.value === measureValue).label;
    this.setState({ value: { ...this.state.value, measure } });
  };

  __inputAmount = (e) => {
    this.setState({ value: { ...this.state.value, amount: +e.target.value } });
  };

  __addIngredient = () => {
    const { name, amount, measure } = this.state.value;
    const ingredients = [...this.props.ingredients];
    ingredients.push({ name, amount, measure });
    this.props.onChange(ingredients);
  };

  __deleteIngredient = (name) => {
    let ingredients = [...this.props.ingredients].filter(ing => ing.name !== name);
    this.props.onChange(ingredients);
  };


  render() {
    return (
      <div className='editable-ingredients-list'>
        <FormGroup className='add-ingredient-form' intent={Intent.PRIMARY}>
          <HTMLSelect
            fill
            options={this.state.fullIngredientsList}
            onChange={this.__selectIngredient}
          />
          <ControlGroup fill>
            <InputGroup
              type='number'
              intent={Intent.PRIMARY}
              onChange={this.__inputAmount}
            />
            <HTMLSelect
              options={measures}
              onChange={this.__selectMeasure}
            />
          </ControlGroup>
          <Button
            text='Add ingredient'
            icon='add-row-bottom'
            onClick={this.__addIngredient}
          />
        </FormGroup>
        {this.props.ingredients && this.props.ingredients.map((ingredient, index) =>
          <div className='ingredient' key={ingredient.name}>
            <span>{index + 1}</span>
            <span>{ingredient.name}</span>
            <div>
              <Tag round large intent={Intent.PRIMARY}>{ingredient.amount} {ingredient.measure}</Tag>
              <Button
                icon='remove'
                intent={Intent.DANGER}
                minimal
                onClick={() => this.__deleteIngredient(ingredient.name)}
              />
            </div>
          </div>)}
      </div>);
  }
}

export default EditableIngredientsList;
