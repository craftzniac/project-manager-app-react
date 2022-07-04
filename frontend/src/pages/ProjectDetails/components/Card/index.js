import React, { useState, useRef, useEffect } from "react";
import editIcon from "../../../../assets/edit-btn.svg";
import deleteIcon from "../../../../assets/delete-btn.svg";
import  {  Link  } from 'react-router-dom'
import './styles.css'

const Card = ({ card }) => {
     // const { card } = cardContainer;

     const [isChecked, setIsChecked] = useState(false);
     // console.log(card)
     const checkBoxRefContainer = useRef(null);

     const todoCompleted = (card) => {
          if (card.isChecked == true) {
               checkBoxRefContainer.current.checked = true;
          } else {
               checkBoxRefContainer.current.checked = false;
          }
     };

     useEffect(() => {
          todoCompleted(card);
     });

     return (
          <div className="card">
               <input
                    type="checkbox"
                    className="card-completed"
                    ref={checkBoxRefContainer}
                    // onChange={() => todoCompleted(card)}
               />

               <p className="card-description">{card.description}</p>

               <div className="card-settings">
                    <button className="card-edit-btn btn" type='button'>
                         <img className="svg svg-icon-sm  p-top" src={editIcon} />
                    </button>
                    <button className="card-delete-btn btn" type="button">
                         <img className="svg svg-icon-sm p-top" src={deleteIcon} />
                    </button>
               </div>
          </div>
     );
};

export default Card;
