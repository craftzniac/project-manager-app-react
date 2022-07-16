import React , {useState} from "react";
import './styles.css'
import Card from '../Card/'

const Cards = (props) => {
    
     return <div className="cards">
     
        {props.cards.map((card) => {
            return <Card key={card.id}  {...card} setCards = {props.setCards}/>
        })}
        
     </div>;
};

export default Cards;
