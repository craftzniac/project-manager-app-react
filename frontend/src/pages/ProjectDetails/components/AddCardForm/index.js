import './styles.css'
import React, {useState} from 'react'
import baseUrl from '../../../baseUrl'

const AddCardForm = ({ boardId, setCards}) => {
    const [text, setText] = useState("")

    const addNewCard = async () => {
        if (text !== ''){
            const response = await(await fetch(baseUrl + '/projects/boards/cards', {
                method: 'POST',
                headers: {
                     "Content-Type": "application/json",  
                },
                body: JSON.stringify({ boardId: boardId, description: text })
           })).json();
 
           console.log(response)
           if(response.status == 'success'){
                setCards((prevValue) => {
                    return [...prevValue, response.card]
                })

                setText("")
           }
        }
    }

    return (
        <div className="add-card-form">
            <input
                className="new-card-text"
                type="text"
                placeholder="New todo"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />

            <button
                className="add-card-btn btn"
                type="submit"
                value="submit-new-card"
                onClick={addNewCard}
            >
                +
            </button>
        </div>
    )
}

export default AddCardForm