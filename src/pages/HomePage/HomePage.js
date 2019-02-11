import React from 'react';
import { Button, Intent, Divider } from "@blueprintjs/core";
import CocktailDetails from '../../components/CocktailDetails/CocktailDetails';
import CocktailsByMarks from '../../components/CocktailsByMarks/CocktailsByMarks';
import { fetchJson, prepareParams, fetchAllCocktails } from '../../utils/fetch';
import { idbCocktails } from '../../utils/indexedDB';

import './HomePage.css';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomCocktail: {
        id: 0,
        name: '',
        recipe: '',
        ingredients: [],
      },
      top10Cocktails: [],
    };

    this.__fetchAndSaveIntoIDB().then(() => {
      this.__randomCocktail();
      this.__top10Cocktails();
    });
  }

  __fetchAndSaveIntoIDB = async () => {
    const allCocktails = (await fetchAllCocktails()).cocktails;
    allCocktails.map(async cocktail => {
      const cocktailDetails = (await fetchJson(`http://localhost:${process.env.REACT_APP_BACK_PORT}/cocktails/${cocktail.id}`, prepareParams())).cocktail;
      await idbCocktails.set(cocktail.id, cocktailDetails);
    });

    const top10Cocktails = (await fetchJson(`http://localhost:${process.env.REACT_APP_BACK_PORT}/cocktails/top10`, prepareParams())).cocktails;
    top10Cocktails.map(async cocktail => {
      const cocktailsDetail = (await idbCocktails.get(cocktail.id));
      idbCocktails.setTop10(cocktail.id, cocktailsDetail);
    })
  };

  __top10Cocktails = async () => {
    const cocktails = (await idbCocktails.getTop10All());
    this.setState({ top10Cocktails: cocktails });
  };

  __randomCocktail = async () => {
    const allCocktails = (await idbCocktails.getAll());
    const random = Math.floor(Math.random() * allCocktails.length);
    this.setState({ randomCocktail: allCocktails[random] });
  };

  __specificCocktail = async (id) => {
    const cocktail = (await idbCocktails.get(id));
    this.setState({ randomCocktail: cocktail });
  };

  render() {
    return (
      <div className="main">
        <div className='random-cocktail'>
          <CocktailDetails {...this.state.randomCocktail} />
          <Button
            icon="refresh"
            large
            intent={Intent.PRIMARY}
            text={"Random cocktail"}
            onClick={this.__randomCocktail}
          />
        </div>
        <Divider/>
        <div className='top10-cocktails'>
          <CocktailsByMarks fetchCocktail={this.__specificCocktail} cocktails={this.state.top10Cocktails}/>
        </div>
      </div>
    );
  }
}

export default HomePage;
