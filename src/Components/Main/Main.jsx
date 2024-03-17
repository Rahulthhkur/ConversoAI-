import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent, // Function to send prompts to the AI model
    recentPrompt, // Stores the most recently sent prompt
    showResult, // Indicates whether to display the AI response
    loading, // Indicates whether the AI model is processing the prompt
    resultData, // Holds the AI response data
    setInput, // Function to update the user input
    input, // Current user input text
    error, // Stores any errors encountered during interaction with the AI model
  } = useContext(Context);

  const handleSendPrompt = () => {
    if (input.trim()) { // Check for non-empty input
      onSent(input);
      setInput(''); // Clear input after sending
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Converso AI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p> {recentPrompt}</p>
            </div>
            <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
                {loading ?
                <div className='loader'>
                 <hr />
                 <hr />
                 <hr />
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                
                
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p><span>Hello, Buddy</span></p>
              <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
              {/* Pre-defined cards can be managed from the context or another data source */}
              <div className="card">
                <p>Suggest Beautiful places to see on upcoming trips</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Breifly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activites for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readibility of following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
              {/* ... Add more cards as needed */}
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Enter a prompt here  '
            />
            <div>
              <img src={assets.gallery_icon} alt="" /> {/* Functionality for this icon can be added later */}
              <img src={assets.mic_icon} alt="" /> {/* Functionality for this icon can be added later */}
              <img onClick={handleSendPrompt} src={assets.send_icon} alt="Send Prompt" />
            </div>
          </div>
          {error && <p className="error">Error: {error}</p>} {/* Display errors if encountered */}
          <p className="bottom-info">
          ConversoAI may display inaccurate info, including about people, so double-check its responses. Your privacy and ConversoAI 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
