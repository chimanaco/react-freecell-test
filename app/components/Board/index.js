import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { CascadeColumns, BG, CellWrapper, FreeCellArea, FoundationArea } from './theme';
import { Title } from '../H1/theme';
import Cascade from '../Cascade';
import Button from '../Button';
import FreeCell from '../FreeCell';
import Foundation from '../Foundation';

import spadesA from './img/cards/ace_of_spades.png';
import spades2 from './img/cards/2_of_spades.png';
import spades3 from './img/cards/3_of_spades.png';
import spades4 from './img/cards/4_of_spades.png';
import spades5 from './img/cards/5_of_spades.png';
import spades6 from './img/cards/6_of_spades.png';
import spades7 from './img/cards/7_of_spades.png';
import spades8 from './img/cards/8_of_spades.png';
import spades9 from './img/cards/9_of_spades.png';
import spades10 from './img/cards/10_of_spades.png';
import spadesJ from './img/cards/jack_of_spades2.png';
import spadesQ from './img/cards/queen_of_spades2.png';
import spadesK from './img/cards/king_of_spades2.png';

import heartsA from './img/cards/ace_of_hearts.png';
import hearts2 from './img/cards/2_of_hearts.png';
import hearts3 from './img/cards/3_of_hearts.png';
import hearts4 from './img/cards/4_of_hearts.png';
import hearts5 from './img/cards/5_of_hearts.png';
import hearts6 from './img/cards/6_of_hearts.png';
import hearts7 from './img/cards/7_of_hearts.png';
import hearts8 from './img/cards/8_of_hearts.png';
import hearts9 from './img/cards/9_of_hearts.png';
import hearts10 from './img/cards/10_of_hearts.png';
import heartsJ from './img/cards/jack_of_hearts2.png';
import heartsQ from './img/cards/queen_of_hearts2.png';
import heartsK from './img/cards/king_of_hearts2.png';

import clubsA from './img/cards/ace_of_clubs.png';
import clubs2 from './img/cards/2_of_clubs.png';
import clubs3 from './img/cards/3_of_clubs.png';
import clubs4 from './img/cards/4_of_clubs.png';
import clubs5 from './img/cards/5_of_clubs.png';
import clubs6 from './img/cards/6_of_clubs.png';
import clubs7 from './img/cards/7_of_clubs.png';
import clubs8 from './img/cards/8_of_clubs.png';
import clubs9 from './img/cards/9_of_clubs.png';
import clubs10 from './img/cards/10_of_clubs.png';
import clubsJ from './img/cards/jack_of_clubs2.png';
import clubsQ from './img/cards/queen_of_clubs2.png';
import clubsK from './img/cards/king_of_clubs2.png';

import diamondsA from './img/cards/ace_of_diamonds.png';
import diamonds2 from './img/cards/2_of_diamonds.png';
import diamonds3 from './img/cards/3_of_diamonds.png';
import diamonds4 from './img/cards/4_of_diamonds.png';
import diamonds5 from './img/cards/5_of_diamonds.png';
import diamonds6 from './img/cards/6_of_diamonds.png';
import diamonds7 from './img/cards/7_of_diamonds.png';
import diamonds8 from './img/cards/8_of_diamonds.png';
import diamonds9 from './img/cards/9_of_diamonds.png';
import diamonds10 from './img/cards/10_of_diamonds.png';
import diamondsJ from './img/cards/jack_of_diamonds2.png';
import diamondsQ from './img/cards/queen_of_diamonds2.png';
import diamondsK from './img/cards/king_of_diamonds2.png';

/* eslint-disable react/prefer-stateless-function */
class Board extends React.Component {
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      cards: [],
      cardsArray: [],
      freeCellArray: [],
      foundationArray: [],
      currentNumber: 0,
      currentCol: 0,
      currentType: '',
      currentArea: '',
      status: 'start',
      isFirst: true,
      debug: false,
    };

    this.TOTAL_NUMBER = 4;
    // this.TOTAL_NUMBER = 1; // debug

    this.foundationDone = 0;

    this.refresh = this.refresh.bind(this);
    this.updateCurrentCard = this.updateCurrentCard.bind(this);
    this.updateCascade = this.updateCascade.bind(this);
    this.addObjectOnFreeCell = this.addObjectOnFreeCell.bind(this);
    this.addObjectOnFoundation = this.addObjectOnFoundation.bind(this);
    this.foundationResetDone = this.foundationResetDone.bind(this);
    this.foundationMoveDone = this.foundationMoveDone.bind(this);
    this.undo = this.undo.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://raw.githubusercontent.com/chimanaco/react-freecell/master/columns.json?token=ABryAs1XPIijuJsal12l32503oshRTkBks5cPf6cwA%3D%3D`
      )
      .then(res => {
        const cards = res.data;
        this.setState({ cards });
      })
    this.init();
  }

  init() {
    const spades = [
      spadesA,
      spades2,
      spades3,
      spades4,
      spades5,
      spades6,
      spades7,
      spades8,
      spades9,
      spades10,
      spadesJ,
      spadesQ,
      spadesK,
    ];

    const hearts = [
      heartsA,
      hearts2,
      hearts3,
      hearts4,
      hearts5,
      hearts6,
      hearts7,
      hearts8,
      hearts9,
      hearts10,
      heartsJ,
      heartsQ,
      heartsK,
    ];

    const clubs = [
      clubsA,
      clubs2,
      clubs3,
      clubs4,
      clubs5,
      clubs6,
      clubs7,
      clubs8,
      clubs9,
      clubs10,
      clubsJ,
      clubsQ,
      clubsK,
    ];

    const diamonds = [
      diamondsA,
      diamonds2,
      diamonds3,
      diamonds4,
      diamonds5,
      diamonds6,
      diamonds7,
      diamonds8,
      diamonds9,
      diamonds10,
      diamondsJ,
      diamondsQ,
      diamondsK,
    ];

    const SpadesObjects = this.createObjects(spades, 'spades');
    const HeartsObjects = this.createObjects(hearts, 'hearts');
    const ClubsObjects = this.createObjects(clubs, 'clubs');
    const DiamondsObjects = this.createObjects(diamonds, 'diamonds');
    this.allCardsObjects = SpadesObjects.concat(
      HeartsObjects,
      ClubsObjects,
      DiamondsObjects,
    );
  }

  createObjects(array, type) {
    const objects = [];
    const len = array.length;
    for (let i = 0; i < len; i += 1) {
      const card = { img: array[i], number: i, type };
      objects.push(card);
    }
    return objects;
  }

  shuffleObjects(array) {
    const shuffledByLodash = _.shuffle(array);
    // console.log(shuffledByLodash); // ['b', 'c']
    return shuffledByLodash;
  }

  refresh() {
    this.setState({
      cardsArray: [],
      freeCellArray: [],
      foundationArray: [],
      foundationReset: true,
      status: 'game',
    });

    this.init();

    this.setState({
      isFirst: true,
    });

    const newArray = this.shuffleObjects(this.allCardsObjects);
    const tempArray = [];
    let start = 0;
    let end = 0;
    for (let i = 0; i < this.state.cards.length; i += 1) {
      end += this.state.cards[i].number;
      const all = newArray.slice(start, end);
      tempArray.push(all);
      start = end;
    }

    this.setState({
      cardsArray: tempArray,
    });
  }

  updateCurrentCard(e) {
    this.setState({
      currentType: e.type,
      currentNumber: e.number,
      currentCol: e.col,
      currentArea: e.area,
      isFirst: false,
    });
  }

  updateCascade(obj) {
    // Backup
    this.state.lastCardArray = this.state.cardsArray;
    this.state.lastFreeCellArray = this.state.freeCellArray;

    const tempArray = this.state.cardsArray;
    let object;

    if (this.state.currentArea === 'cascade') {
      object = tempArray[obj.removeCol].pop();
    } else if (this.state.currentArea === 'free') {
      const tempFreeArray = this.state.freeCellArray;
      object = tempFreeArray[this.state.currentCol];
      tempFreeArray[this.state.currentCol] = undefined;
      this.setState({
        freeCellArray: tempFreeArray,
      });
    }
    tempArray[obj.addCol].push(object);
    this.setState({
      cardsArray: tempArray,
    });
  }

  addObjectOnFreeCell(index) {
    // Backup
    this.state.lastCardArray = this.state.cardsArray;
    this.state.lastFreeCellArray = this.state.freeCellArray;

    const tempFreeArray = this.state.freeCellArray;
    let object;

    if (this.state.currentArea === 'cascade') {
      const tempArray = this.state.cardsArray;
      object = tempArray[this.state.currentCol].pop();

      this.setState({
        cardsArray: tempArray,
      });
    } else if (this.state.currentArea === 'free') {
      object = tempFreeArray[this.state.currentCol];
      tempFreeArray[this.state.currentCol] = undefined;
    }
    tempFreeArray[index] = object;
    this.setState({
      freeCellArray: tempFreeArray,
    });
  }

  addObjectOnFoundation(index) {
    const tempFoundationArray = this.state.foundationArray;
    let object;

    if (this.state.currentArea === 'cascade') {
      const tempArray = this.state.cardsArray;
      object = tempArray[this.state.currentCol].pop();
      this.setState({
        cardsArray: tempArray,
      });
    } else if (this.state.currentArea === 'free') {
      const tempFreeArray = this.state.freeCellArray;
      object = tempFreeArray[this.state.currentCol];
      tempFreeArray[this.state.currentCol] = undefined;
      this.setState({
        freeCellArray: tempFreeArray,
      });
    }
    tempFoundationArray[index] = object;
    this.setState({
      foundationArray: tempFoundationArray,
    });
  }

  foundationResetDone() {
    this.setState({
      foundationReset: false,
    });
  }

  foundationMoveDone() {
    this.foundationDone += 1;

    // console.log('Board', this.state.status, this.TOTAL_NUMBER);

    if (
      this.state.status === 'game' &&
      this.foundationDone === this.TOTAL_NUMBER
    ) {
      this.setState({
        status: 'end',
      });
      this.foundationDone = 0;
    }
  }

  undo() {
    this.foundationDone += 1;
    if (
      this.state.status === 'game' &&
      this.foundationDone === this.TOTAL_NUMBER
    ) {
      this.setState({
        status: 'end',
      });
      this.foundationDone = 0;
    }
  }

  render() {
    /* <-- debug --> */
    const tempArray = [];
    let allLength = 0;
    for (let i = 0; i < this.state.cardsArray.length; i += 1) {
      if (this.state.cardsArray[i] !== undefined) {
        // console.log(this.state.cardsArray[i][0].number);
        const tm2 = [];
        for (let j = 0; j < this.state.cardsArray[i].length; j += 1) {
          if (this.state.cardsArray[i][j] !== undefined) {
            // console.log(this.state.cardsArray[i][j].number);
            tm2.push(this.state.cardsArray[i][j].number);
            tm2.push(',');
          }
          allLength += 1;
        }
        tempArray.push(tm2);
      }
    }

    const tempFreeArray = [];
    for (let i = 0; i < this.state.freeCellArray.length; i += 1) {
      if (this.state.freeCellArray[i] !== undefined) {
        // console.log("freeCellArray");
        // console.log(this.state.freeCellArray[0].number);
        // console.log("freeCellArray2");
        if (typeof this.state.freeCellArray[i] === 'undefined') {
          tempFreeArray.push(this.state.freeCellArray[i].number);
        }
        tempFreeArray.push(',');
      }
    }
    /* <-- debug --> */

    const FreeCells = [];
    for (let i = 0; i < 4; i += 1) {
      FreeCells[i] = (
        <FreeCell
          index={i}
          key={`free${i}`}
          obj={this.state.freeCellArray[i]}
          addObject={this.addObjectOnFreeCell}
          updateCurrentCard={this.updateCurrentCard}
          currentNumber={this.state.currentNumber}
          currentCol={this.state.currentCol}
          currentType={this.state.currentType}
          currentArea={this.state.currentArea}
        />
      );
    }

    const Foundations = [];
    const FoundationType = ['hearts', 'spades', 'diamonds', 'clubs'];
    for (let i = 0; i < 4; i += 1) {
      Foundations[i] = (
        <Foundation
          index={i}
          key={FoundationType[i]}
          type={FoundationType[i]}
          obj={this.state.foundationArray[i]}
          addObject={this.addObjectOnFoundation}
          currentNumber={this.state.currentNumber}
          currentCol={this.state.currentCol}
          currentType={this.state.currentType}
          currentArea={this.state.currentArea}
          reset={this.state.foundationReset}
          resetDone={this.foundationResetDone}
          moveDone={this.foundationMoveDone}
        />
      );
    }

    return (
      <BG>
        {(this.state.status === "start") ?
          (
            <div>
              <Title>FreeCell</Title>
              <Button onClick={this.refresh} text="Game Start!"/>
            </div>
          ) : null
        }

        {(this.state.status === "game") ?
          (
            <div>
              <CellWrapper>
                <FreeCellArea>
                  {FreeCells}
                </FreeCellArea>

                {/*<button onClick={this.undo}>Undo</button>*/}

                <FoundationArea>
                  {Foundations}
                </FoundationArea>
              </CellWrapper>

              <CascadeColumns>
                {this.state.cardsArray.map((card, index) =>
                  <Cascade
                    array={card}
                    col={index}
                    updateCurrentCard={this.updateCurrentCard}
                    updateCascade={this.updateCascade}
                    currentNumber={this.state.currentNumber}
                    currentCol={this.state.currentCol}
                    currentType={this.state.currentType}
                    currentArea={this.state.currentArea}
                    first={this.state.isFirst}
                  />)}
              </CascadeColumns>
            </div>
          ) : null
        }

        {(this.state.status === "end") ?
          (
            <div>
              <Title>Good Job!</Title>
              <Button onClick={this.refresh} text="Play Again?"/>
            </div>
          ) : null
        }

        {(this.state.debug) ?
          (
            <div>
              {allLength}
              {this.state.status}
              {this.state.currentCol}
              {tempArray[0]} <br/>
              {tempArray[1]} <br/>
              {tempArray[2]} <br/>
              {tempArray[3]} <br/>
              {tempArray[4]} <br/>
              {tempArray[5]} <br/>
              {tempArray[6]} <br/>
              {tempArray[7]} <br/>
              {tempFreeArray[0]} {tempFreeArray[1]} {tempFreeArray[2]} {tempFreeArray[3]}
            </div>
          ) : null
        }
      </BG>
    );
  }
}

export default Board;
