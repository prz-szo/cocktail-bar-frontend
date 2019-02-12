import React from 'react';
import { Button, Intent, Divider, Spinner } from "@blueprintjs/core";
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
  }

  async componentDidMount() {
    const cocktails = await idbCocktails.getAll();
    if (cocktails.length === 0) {
      this.__fetchAndSaveIntoIDB().then(async () => {
        await this.__randomCocktail();
        await this.__top10Cocktails();
      });
    } else {
      this.__randomCocktail();
      this.__top10Cocktails();
    }
  }

  __fetchAndSaveIntoIDB = async () => {
    const allCocktails = (await fetchAllCocktails()).cocktails;
    allCocktails.map(async cocktail => {
      const cocktailDetails = (await fetchJson(`${process.env.REACT_APP_BACK}/cocktails/${cocktail.id}`, prepareParams())).cocktail;
      await idbCocktails.set(cocktail.id, cocktailDetails);
    });

    const top10Cocktails = (await fetchJson(`${process.env.REACT_APP_BACK}/cocktails/top10`, prepareParams())).cocktails;
    top10Cocktails.map(async cocktail => {
      const cocktailsDetail = (await idbCocktails.get(cocktail.id));
      idbCocktails.setTop10(cocktail.id, cocktailsDetail);
    })
  };

  __top10Cocktails = async () => {
    const cocktails = (await idbCocktails.getTop10All());
    cocktails.sort((a, b) => b.averageMark - a.averageMark);
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
          { this.state.randomCocktail.id === 0
            ? <Spinner intent={Intent.PRIMARY}/>
            : <CocktailDetails {...this.state.randomCocktail} />}
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
          {this.state.top10Cocktails.length === 0
            ? <Spinner intent={Intent.PRIMARY}/>
            : <CocktailsByMarks fetchCocktail={this.__specificCocktail} cocktails={this.state.top10Cocktails}/>}
        </div>
      </div>
    );
  }
}

export default HomePage;
