import React from 'react'
import './Btn.css'

interface nameBtn{
  name: string;
}
const Btn:React.FC<nameBtn> = ({name}) => {
  return (
    <div id="ad_ban_btn">
      <div className={name}>
        <p>{name}</p>
      </div>
    </div>
  )
}

export default Btn