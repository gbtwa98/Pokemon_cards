import React from 'react';
import logo from './logo.svg';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      cards : [],
      myList: [],
    }
  }

  addToMyList = (card) => {
    this.setState({
      myList:[...this.state.myList , card]
    }, () => console.log(this.state.myList) )
  }
  
  removeFromMyList = (card) =>{
    let cloneList = [...this.state.myList];
    const newList = cloneList.filter( _card => _card.id !== card.id);
    this.setState({
      myList: newList
    }, () => console.log(this.state.myList))
  }

  isInMyList = (card) => {
   const index= this.state.myList.findIndex( _card => _card.id === card.id);
   return index > -1 
  }

  componentDidMount(){
    const api = "https://api.pokemontcg.io/v1/cards";
    fetch(api)
    .then((data) => {
    return data.json()
    })
    .then( jsonData => {

      this.setState({
        cards:jsonData.cards
      })
      console.log(this.state.cards)
    }
    ).catch( error => console.log(error))
  }
  
  render(){
    const {cards} = this.state;
    return(
      <div className="cards">
        {
          cards.map(( card, index) => {
            return(
              <PokemonCard
              isInMyList={this.isInMyList(card)}
                card={card}
                addToMyList = {this.addToMyList}
                removeFromMyList = {this.removeFromMyList}
                key={index} />
            )
          })
        }

      </div>
    )
  }
}

export default App;

const PokemonCard = (props) => {
  return(
    <div className={`pokemon-card ${props.isInMyList ? "in" : ""}`}>
      <h3>{ props.card.name }</h3>
      <div className="pokemon-img">
        <img src={ props.card.imageUrl } />
        <div className="buttons">
          {
            !props.isInMyList ? 
            <button onClick={() => props.addToMyList(props.card)}>ADD</button>
            :
            <button onClick={() => props.removeFromMyList(props.card)}>REMOVE</button>
          }
        </div>
      </div>
    </div>
  )
}