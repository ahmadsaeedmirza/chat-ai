import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { marked } from 'marked';

function App() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      GenerateAnswer(question);
    }
  };

  async function GenerateAnswer (question) {
    setAnswer("loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyChk9rAkt-PN92NM3-AGQPeblDnCp9GtVk",
      method: "post",
      data: {
        contents: [
          { parts: [{ text: question }] },
        ],
      },
    });
    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  } 

  const handleClick = () => {
    GenerateAnswer(question);
  };

  return (
    <div>

      <div className="input-area">
        <h1>Chat AI</h1>
        <textarea value={question} onChange={handleChange} onKeyPress={handleKeyPress} rows="3" placeholder='Message Chat AI' ></textarea> <br />
        <button className='button-27' onClick={handleClick}>Generate Answer</button>
      </div>

      <div className={`abc ${answer ? 'output-area' : ''}`}>
        <div dangerouslySetInnerHTML={{ __html: marked(answer) }} /> 
      </div>       

      </div>
    
  );
}

export default App;
