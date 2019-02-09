import React from 'react';
import Heading from '../Heading/Heading';
import { Tag, Intent, HTMLTable } from '@blueprintjs/core';

import './CocktailsByMarks.css';

const cocktails = [
  {
    "id": 1,
    "name": "Addington",
    "avg_mark": 10
  },
  {
    "id": 13,
    "name": "Apple Eden",
    "avg_mark": 6.8
  },
  {
    "id": 14,
    "name": "Apple Pie",
    "avg_mark": 6.6
  },
  {
    "id": 2,
    "name": "Affinity Cocktail",
    "avg_mark": 6.33
  },
  {
    "id": 200,
    "name": "Poker",
    "avg_mark": 5.73
  },
  {
    "id": 100,
    "name": "Fogcutter",
    "avg_mark": 5.6
  },
  {
    "id": 23,
    "name": "Bacardi",
    "avg_mark": 5
  },
  {
    "id": 28,
    "name": "Bentley",
    "avg_mark": 4.93
  },
  {
    "id": 120,
    "name": "Grand Slam",
    "avg_mark": 4.8
  }
];

class CocktailsByMarks extends React.Component {
  __renderCocktails(cocktails) {
    return cocktails.map((cocktail, index) => (
      <tr key={cocktail.id} className='cocktail'>
        <td><Tag intent={Intent.SUCCESS}>{index + 1}</Tag></td>
        <td>{cocktail.name}</td>
        <td><Tag round={true} intent={Intent.PRIMARY}>{cocktail.avg_mark}</Tag></td>
      </tr>
    ));
  }

  render() {
    return (
      <div className='cocktails-by-mark'>
        <Heading name={'Top 10 Cocktails'}/>
        <HTMLTable interactive={true} condensed={true} striped={true} className='cocktails-list'>
          <tbody>
          {this.__renderCocktails(cocktails)}
          </tbody>
        </HTMLTable>
      </div>
    );
  }
}

export default CocktailsByMarks;
