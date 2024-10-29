import React from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';
import './LoadingComp.css'

const LoadingComp = () => {
  return (
    <div id='loading'>
        <div>
            <RefreshIcon sx={{fontSize: "64px"}}/>
        </div>
    </div>
  )
}

export default LoadingComp