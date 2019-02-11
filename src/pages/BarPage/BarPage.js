import React from 'react';
import Heading from '../../components/Heading/Heading';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import Bar from '../../components/Bar/Bar';
import CocktailsList from '../../components/CocktailsList/CocktailsList';
import CocktailForm from '../../components/CocktailForm/CocktailForm';
import CocktailDetails from '../../components/CocktailDetails/CocktailDetails';
import { fetchAllCocktails, fetchJson, prepareAuthParams } from '../../utils/fetch';

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

  __fetchAllCocktails = async () => {
    const cocktails = (await fetchAllCocktails()).cocktails;
    cocktails.sort((a, b) => a.id - b.id);
    this.setState({ cocktails });
  };

  __clearCocktail = () => {
    this.setState({ isCocktailEditable: true, cocktailDetails: EMPTY_COCKTAIL_DATA });
  };
  __setCocktailsList = (cocktails) => {
    this.setState({ cocktails });
  };
  __previewCocktail = (cocktailDetails) => {
    this.setState({ isCocktailEditable: false, cocktailDetails });
  };
  __enableEditingCocktail = (cocktailDetails) => {
    this.setState({ isCocktailEditable: true, cocktailDetails });
  };
  __submitCocktail = (cocktailDetails) => {
    console.log('Submit cocktail');
    if (cocktailDetails.id === 0){
      this.__sendCocktailToDB(cocktailDetails).then(() => {
        this.__fetchAllCocktails();
        this.setState({ isCocktailEditable: false, cocktailDetails });
      });
    } else {
      this.__updateCocktailInDB(cocktailDetails).then(() => {
        this.__fetchAllCocktails();
        this.setState({ isCocktailEditable: false, cocktailDetails });
      });
    }
    // this.setState({ isCocktailEditable: false, cocktailDetails });
  };

  __sendCocktailToDB = async (cocktail) => {
    const toSend = {...cocktail};
    delete toSend.id;
    const cocktailId = (await fetchJson(
      `http://localhost:${process.env.REACT_APP_BACK_PORT}/cocktails`,
      prepareAuthParams(toSend, 'POST'))).cocktail;
    cocktail.id = +cocktailId;
  };

  __updateCocktailInDB = async (cocktail) => {
    const message = (await fetchJson(
      `http://localhost:${process.env.REACT_APP_BACK_PORT}/cocktails/${cocktail.id}`,
      prepareAuthParams(cocktail, 'PUT'))).message;
    console.log(message);
  };

  render() {
    return (
      <div className="bar-page-content">
        <div className='cocktails'>
          <Heading name='Cocktails'/>
          <FilterGroup
            setCocktailsList={this.__setCocktailsList}
            setCocktail={this.__previewCocktail}
            addNewCocktail={this.__clearCocktail}
          />
          <CocktailsList
            cocktails={this.state.cocktails}
            onClick={this.__previewCocktail}
            onEdit={this.__enableEditingCocktail}
            onRemove={this.__fetchAllCocktails}
          />
        </div>

        {this.state.isCocktailEditable
          ? <CocktailForm
            {...this.state.cocktailDetails}
            onChange={this.__enableEditingCocktail}
            onSubmit={this.__submitCocktail}
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
