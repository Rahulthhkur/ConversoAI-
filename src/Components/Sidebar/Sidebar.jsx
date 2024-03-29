import React, { useContext, useState } from 'react'
import './sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'

const sidebar = () => {

    const [extended, setExtended]= useState(false)
    
   

  return (
      <div className='sidebar'>
        <div className="top">
        <img onClick={()=> setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
        <div className='button-container'>
        <a href="https://rahulthhkur.github.io/profile.github.io/" className="developers-link" target="_blank" rel="noopener noreferrer">
      <button className="developers-button">Developers</button>
      </a>
         </div>
        <div className='new-chat'>
          <img  src={assets.plus_icon} alt="" />
          {extended? <p>New Chat</p>:null}
        </div>
         
          {extended
           ?<div className="recent">
           <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p> What is React</p>
            </div>
         </div>
            :null
          }
          
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
             {extended?<p> Help</p>:null} 
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
           {extended?<p> Actitvity</p>:null} 
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p> Settings</p>:null} 
          </div>

        </div>
      </div>
    )
  }

export default sidebar
