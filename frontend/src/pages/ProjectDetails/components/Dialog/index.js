import './styles.css';
import React from 'react';
import warningIcon from '../../../../assets/warning_alert.svg';

const Dialog = ({ setIsDialogOpen, type , performDelete }) => {

  function closeDialog(){
    setIsDialogOpen(false);
  }

  function triggerDelete(){
    performDelete();
  }


  return (
    <>
      <div className="dialog-wrapper"></div>
      <div className="dialog-container">
        <div className="dialog-box">
          <button className="close-btn btn" onClick={closeDialog}>x</button>
          <div className="dialog-header">
            <img src={warningIcon} alt="" />
            <h3 className="title">{ "Delete " + type }</h3>
          </div>

          <div className="dialog-body">
            <p className='message'>{`Do you really want to delete this ${ type } permanently?`}</p>
            <div className="btn-group">
              <button className="btn proceed-btn" onClick={triggerDelete}>Proceed</button>
              <button className="btn cancel-btn" onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DialogType = { 
  PROJECT: 'project',
  BOARD: 'board'
}

export default Dialog;
