import React from 'react';
import { Button, Intent, Divider } from "@blueprintjs/core";
import CocktailDetails from '../../components/CocktailDetails/CocktailDetails';
import CocktailsByMarks from '../../components/CocktailsByMarks/CocktailsByMarks';

import './HomePage.css';
import { fetching, fetchJson, prepareParams, fetchRandomCocktail } from '../../utils/fetch';


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
    this.__randomCocktail();
    this.__top10Cocktails();
  }

  __fetchTop10Cocktails = fetching(`http://localhost:${process.env.REACT_APP_BACK_PORT}/cocktails/top10`, prepareParams());
  __top10Cocktails = async () => {
    const cocktails = (await this.__fetchTop10Cocktails()).cocktails;
    this.setState({ top10Cocktails: cocktails })
  };

  __randomCocktail = async () => {
    const randomCocktail = (await fetchRandomCocktail()).cocktail;
    this.setState({ randomCocktail });
  };

  __specificCocktail = async (id) => {
    const cocktail = (await fetchJson(`http://localhost:${process.env.REACT_APP_BACK_PORT}/cocktails/${id}`, prepareParams())).cocktail;
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
