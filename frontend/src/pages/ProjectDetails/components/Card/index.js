import React, { useState, useRef, useEffect } from "react";
import editIcon from "../../../../assets/edit-btn.svg";
import deleteIcon from "../../../../assets/delete-btn.svg";
import './styles.css'
import baseUrl from "../../../baseUrl"

const Card = ( props ) => {
     // const { card } = cardContainer;
     const {id, boardId, setCards} = props;
     console.log("boardId: ", boardId)
     const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(Boolean(props.isCompleted))
     const [description, setDescription] = useState(props.description)

     const descriptionRef = useRef(null)

     function strikeThrough(){
          console.log(descriptionRef)
          if (isCheckBoxChecked) {
               descriptionRef.current.style.textDecoration = "line-through"
          }else{
               descriptionRef.current.style.textDecoration = "none"
          }
     }

      
     useEffect(() => {
          updateCard()   
     }, [isCheckBoxChecked, description]);

     const updateCard = async() => {
          const response = await(await fetch(baseUrl + '/projects/boards/cards', {
               method: 'PUT',
               headers: {
                    "Content-Type": "application/json",  
               },
               body: JSON.stringify({ id, isCompleted: isCheckBoxChecked, description})
          })).json();

          if (response.status === 'success'){
               setCards((prevValue) => {
                    for(let card of prevValue){
                         if (card.id === response.card.id){
                              card = response.card
                              break;
                         }
                    }
                    return prevValue
               })
          }

          strikeThrough()
     }


     const deleteCard = async () => {
          const response = await(await fetch(baseUrl + '/projects/boards/cards', {
               method: 'DELETE',
               headers: {
                    "Content-Type": "application/json",  
               },
               body: JSON.stringify({ id })
          })).json();

          console.log(response)

          if(response.status === 'success'){
               setCards((prevValue) => {
                   return prevValue.filter((card) => {
                         return card.id !== response.id
                   })
               })
          }
     }

     const makeEditable = () => {
          descriptionRef.current.contentEditable = true;
          descriptionRef.current.classList.add("highlight");
     }

     const undoMakeEditable = () => {
          descriptionRef.current.contentEditable = false;
          descriptionRef.current.classList.remove("highlight");
          setDescription(descriptionRef.current.textContent)
     }

     // TODO: WHY IS descriptionRef.current null?
     useEffect(() => {
          if (descriptionRef.current != null){
               descriptionRef.current.addEventListener("focusout", undoMakeEditable)

               return () => {
                    if (descriptionRef.current != null){
                         descriptionRef.current.removeEventListener("focusout", undoMakeEditable)
                    }
               }
          }
     }, [descriptionRef])

     return (
          <div className="card">
               <input
                    type="checkbox"
                    className="card-completed"
                    onChange={(e) => setIsCheckBoxChecked(e.target.checked)}
                    checked={isCheckBoxChecked}
               />

               <p className="card-description" ref={descriptionRef}>{description}</p>

               <div className="card-settings">
                    <button className="card-edit-btn btn" type='button' onClick={makeEditable}>
                         <img className="svg svg-icon-sm  p-top" src={editIcon} />
                    </button>
                    <button className="card-delete-btn btn" type="button" onClick={deleteCard}>
                         <img className="svg svg-icon-sm p-top" src={deleteIcon} />
                    </button>
               </div>
          </div>
     );
};

export default Card;
