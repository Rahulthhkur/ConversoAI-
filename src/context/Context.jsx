import { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState(null); // Added state for errors

  const delayPara =(index , nextWord) =>{
        setTimeout (function () {
            setResultData(prev=> prev+nextWord);
        },75*index)
  }

  const newChat= ()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors
    setResultData("")
    setShowResult(true)
    setRecentPrompt(input)
    setInput("")
    setPrevPrompt(prev =>[...prev,input]) 

    try {
       
      const response = await runChat(input);
      let responseArray = response.split("**");
      let newResponse = ""
      for(let i=0; i < responseArray.length; i++ ){
        if(i ===0 || i % 2 !== 1){
            newResponse += responseArray[i];
        }
        else{
            newResponse += "<b>" +responseArray[i]+ "</b>";
        }

      }
      
      let newResponse2 = newResponse.split("*").join("</br>") 
      setRecentPrompt(prompt);
      
      let newResponseArray = newResponse2.split(" ");
      
      for(let i=0; i<newResponseArray.length; i++){
        const nextWord= newResponseArray[i];
        delayPara(i, nextWord + " ") 
      }

      setShowResult(true);
    } catch (error) {
      setError(error.message); // Set error state if an error occurs
      console.error("Error generating response:", error); // Log the error for debugging
    } finally {
      setLoading(false); // Set loading state to false after processing
    }
  };

  useEffect(() => {
    // Consider using a default prompt here if needed
  }, []);

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    error, // Added error state to context value
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
