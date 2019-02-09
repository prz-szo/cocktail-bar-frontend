import React from 'react';
import { Button, Intent, Divider } from "@blueprintjs/core";
import CocktailDetails from '../../components/CocktailDetails/CocktailDetails';
import CocktailsByMarks from '../../components/CocktailsByMarks/CocktailsByMarks';

import './HomePage.css';


class HomePage extends React.Component {
  render() {
    const cocktail = {
      id: 1,
      name: "The International",
      recipe: "Fill glass with ice. Add vermouths. Add club soda and stir. Add lemon twist.",
      ingredients: [
        {
          name: "dry vermouth",
          amount: 45,
          measure: "ml"
        },
        {
          name: "club soda",
          amount: 120,
          measure: "ml"
        },
        {
          name: "sweet vermouth",
          amount: 45,
          measure: "ml"
        }
      ],
      averageMark: 10
    };

    return (
      <div className="main">
        <div className='random-cocktail'>
          <CocktailDetails {...cocktail} />
          <Button icon="refresh" large intent={Intent.PRIMARY} text={"Random cocktail"}/>
        </div>
        <Divider/>
        <div className='top10-cocktails'>
          <CocktailsByMarks/>
        </div>
      </div>
    );
  }
}

export default HomePage;
