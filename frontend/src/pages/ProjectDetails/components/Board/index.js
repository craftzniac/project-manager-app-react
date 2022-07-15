import React , {useEffect, useRef}from "react";
import "./styles.css";
import editIcon from '../../../../assets/edit-btn.svg'
import deleteIcon from "../../../../assets/delete-btn.svg"
import Cards from '../Cards/'
import baseUrl from '../../../baseUrl'

export const Board = ({
     id,
     title,
     projectId,
     dateCreated,
     cards,
     setBoards,
     setProjBoardCount
}) => {
     const titleRef =  useRef(null)
     // console.log("cards drom board : %o", cards)
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
               console.log('event added')
     
               return () => {
                    if (titleRef.current != null){

                         console.log("remove event")
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
               {/* {console.log(cards)} */}
                    <Cards {...cards}/>
               </div>
               <div className="board-footer">
                    <div className="add-card-form" action="#" method="POST">
                         <input
                              className="new-card-text"
                              type="text"
                              placeholder="New todo"
                         />
                         <button
                              className="add-card-btn btn"
                              type="submit"
                              value="submit-new-card"
                         >
                              +
                         </button>
                    </div>
               </div>
          </div>
     );
};
