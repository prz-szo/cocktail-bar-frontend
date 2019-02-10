import React from 'react';
import Heading from '../../components/Heading/Heading';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import Bar from '../../components/Bar/Bar';
import CocktailsList from '../../components/CocktailsList/CocktailsList';
import CocktailForm from '../../components/CocktailForm/CocktailForm';
import CocktailDetails from '../../components/CocktailDetails/CocktailDetails';
import { fetchAllCocktails } from '../../utils/fetch';

import './BarPage.css';


const NEW_COCKTAIL_ID = 0;
const EMPTY_COCKTAIL_DATA = {
  id: NEW_COCKTAIL_ID,
  name: '',
  recipe: '',
  ingredients: [],
};

class BarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktailDetails: EMPTY_COCKTAIL_DATA,
      cocktails: [],
      isCocktailEditable: true
    };
    this.__fetchAllCocktails();
  }

  async __fetchAllCocktails() {
    const cocktails = (await fetchAllCocktails()).cocktails;
    this.setState({ cocktails });
  }

  __clearCocktail = () => {
    this.setState({ isCocktailEditable: true, cocktailDetails: EMPTY_COCKTAIL_DATA });
  };

  __setCocktailsList = (cocktails) => {
    this.setState({ cocktails });
  };

  __setCocktail = (cocktailDetails) => {
    this.setState({ isCocktailEditable: false, cocktailDetails });
  };

  render() {
    return (
      <div className="bar-page-content">
        <div className='cocktails'>
          <Heading name='Cocktails'/>
          <FilterGroup
            setCocktailsList={this.__setCocktailsList}
            setCocktail={this.__setCocktail}
            addNewCocktail={this.__clearCocktail}
          />
          <CocktailsList cocktails={this.state.cocktails} onClick={this.__setCocktail}/>
        </div>

        {this.state.isCocktailEditable
          ? <CocktailForm
            {...this.state.cocktailDetails}
            onChange={this.__setCocktail}
          />
          : <CocktailDetails {...this.state.cocktailDetails}/>
        }

        <div className='users-bar'>
          <Bar/>
        </div>

      </div>
    );
  }

}

export default BarPage;
