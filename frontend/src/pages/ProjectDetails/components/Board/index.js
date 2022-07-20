import React , {useState, useEffect, useRef}from "react";
import "./styles.css";
import editIcon from '../../../../assets/edit-btn.svg'
import deleteIcon from "../../../../assets/delete-btn.svg"
import Cards from '../Cards/'
import AddCardForm from '../AddCardForm/'
import baseUrl from '../../../baseUrl'

export const Board = (props) => {

     const { id, title, projectId, dateCreated, setProjBoardCount, setBoards} = props
     const titleRef =  useRef(null)
     const [cards, setCards] = useState([]);


     useEffect(() => {
          setCards(props.cards)
     }, [cards])


     const deleteBoard = async () => {
          const response = await(await fetch(baseUrl + '/projects/boards', {
               method: 'DELETE',
               headers: {
                    "Content-Type": "application/json",  
               },
               body: JSON.stringify({ boardId: id, projectId: projectId })
          })).json();

          if (response.status === "success"){
               setBoards((prevValue) => {
                    return prevValue.filter((board) => {
                         return board.id !== id
                    })
               })

               setProjBoardCount(response.projectBoardCount) 
          }
     }

     const makeBoardEditable  =  () => {
          titleRef.current.classList.add('highlight')
          titleRef.current.contentEditable = true;          
     }

     const undoMakeBoardEditable = () => {
          titleRef.current.classList.remove("highlight")
          titleRef.current.contentEditable = false;

          editBoardTitle()
     }

     const editBoardTitle  = async () => {
          try{

               const response = await(await fetch(baseUrl + '/projects/boards', {
                    method: 'PUT',
                    headers: {
                         "Content-Type": "application/json",  
                    },
                    body: JSON.stringify({ boardId: id, projectId: projectId, newTitle: titleRef.current.textContent })
               })).json();
     
               if (response){
                    if (response.oldTitle !== response.newTitle){
                         setBoards((prevValue) => {
                              for(let board of prevValue){
                                   if (board.id === id){
                                        board.title = response.newTitle
                                        break;
                                   }
                              }
                              return prevValue
                         })
                    }
               }
          }catch(err){
               console.log(err)
          }

     }

     useEffect(() => {
          if (titleRef.current != null){

               titleRef.current.addEventListener('focusout', undoMakeBoardEditable)
     
               return () => {
                    if (titleRef.current != null){
                         titleRef.current.removeEventListener("focusout",undoMakeBoardEditable);
                    }
               }
          }

     }, [titleRef.current])

     return (
          <div className="board">
               <div className="board-header">
                    <h3 className="board-title" ref={titleRef} > {title} </h3>
                    <div className="board-header-settings">
                         <button className="edit-board-title btn" to="#" onClick={makeBoardEditable}>
                              <img
                                   src={editIcon}
                                   className="svg svg-icon-md p-top"
                              />
                         </button>
                         <button className="delete-board btn" to="#" onClick={deleteBoard}>
                              <img
                                   className="svg svg-icon-md p-top"
                                   src={deleteIcon}
                              />
                         </button>      
                    </div>
               </div>
               <div className="board-body">
                    <Cards cards={cards} setCards={setCards}/>
               </div>
               <div className="board-footer">
                    <AddCardForm boardId={id} setCards={setCards}/>
               </div>
          </div>
     );
};
