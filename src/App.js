import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Timeline from './components/Timeline';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [averageDurations, setAverageDurations] = useState('');
  const [processVariants, setProcessVariants] = useState([]); // Add this line
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleDataParsed = (content, avgDurations, variants) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Received file content length:', content.length);
      console.log('Received average durations:', avgDurations);
      console.log('Received process variants:', variants);
      setFileContent(content);
      setAverageDurations(avgDurations);
      setProcessVariants(JSON.parse(variants));
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Error processing file. Please ensure it\'s a valid CSV.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      {!user ? (
        <LandingPage onSignIn={handleSignIn} />
      ) : (
        <div className="main-content">
          <h1>Audit Log Timeline Viewer</h1>
          <p>Please upload your CSV file to begin:</p>
          <FileUpload onDataParsed={handleDataParsed} />
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {fileContent && !isLoading && (
            <Timeline 
              data={fileContent} 
              averageDurations={averageDurations} 
              processVariants={processVariants}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;