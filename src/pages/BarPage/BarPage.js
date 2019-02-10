import React from 'react';
import { Divider } from '@blueprintjs/core';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import Bar from '../../components/Bar/Bar';
import CocktailsList from '../../components/CocktailsList/CocktailsList';

import './BarPage.css';

class BarPage extends React.Component {
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

  render() {
    return (
      <div className="bar-page-content">
        <div className='cocktails'>
          <FilterGroup/>
          <CocktailsList {...this.state.cocktails} />
        </div>
        <Divider/>
        <div className='ingredients'>
          <Bar />
        </div>
      </div>
    );
  }

}

export default BarPage;
