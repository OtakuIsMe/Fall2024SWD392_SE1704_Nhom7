import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import './AddBtn.css'

interface AddIcon {
  openModal: () => void;
}

const AddBtn:React.FC<AddIcon> = ({ openModal }) => {
  
  return (
    <>
        <div id='ad_add_btn' onClick={openModal}>
            <span><AddIcon/></span>
            Add
        </div>
    </>
  )
}

export default AddBtn