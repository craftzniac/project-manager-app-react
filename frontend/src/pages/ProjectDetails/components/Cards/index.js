import React from "react";
import './styles.css'
import Card from '../Card/'

const Cards = (cards) => {
    // converting the cards object to an array for convenience
    cards = Object.values(cards);

     return <div className="cards">
     
        {cards.map((card) => {
            return <Card key={card.id}  card={card}/>
        })}
        
     </div>;
};

export default Cards;
