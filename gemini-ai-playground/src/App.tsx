import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('Welcome to Gemini AI Playground!');
  const [mode, setMode] = useState('text-generation'); // Default mode

  const handleProcess = () => {
    // This is where the AI simulation logic will go
    // For now, it's a simple echo or predefined response
    let simulatedOutput = '';
    switch (mode) {
      case 'text-generation':
        simulatedOutput = `Generating creative text based on: "${input}"...\n\n[Simulated AI Response: A beautiful story about a brave knight.]`;
        break;
      case 'summarization':
        simulatedOutput = `Summarizing: "${input.substring(0, 50)}..."\n\n[Simulated AI Response: Key points extracted.]`;
        break;
      case 'translation':
        simulatedOutput = `Translating: "${input}"...\n\n[Simulated AI Response: Hola mundo!]`;
        break;
      case 'code-explanation':
        simulatedOutput = `Explaining code: "${input.substring(0, 50)}..."\n\n[Simulated AI Response: This code snippet initializes a variable.]`;
        break;
      default:
        simulatedOutput = "Please select a mode.";
    }
    setOutput(simulatedOutput);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini AI Playground</h1>
      </header>
      <div className="container">
        <nav className="sidebar">
          <h2>Modes</h2>
          <ul>
            <li className={mode === 'text-generation' ? 'active' : ''} onClick={() => setMode('text-generation')}>Text Generation</li>
            <li className={mode === 'summarization' ? 'active' : ''} onClick={() => setMode('summarization')}>Summarization</li>
            <li className={mode === 'translation' ? 'active' : ''} onClick={() => setMode('translation')}>Translation</li>
            <li className={mode === 'code-explanation' ? 'active' : ''} onClick={() => setMode('code-explanation')}>Code Explanation</li>
          </ul>
        </nav>
        <main className="main-content">
          <div className="input-section">
            <textarea
              placeholder={`Enter your text for ${mode.replace('-', ' ')}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button onClick={handleProcess}>Process with Gemini</button>
          </div>
          <div className="output-section">
            <pre>{output}</pre>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;