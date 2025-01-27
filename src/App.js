import React from 'react';
import Calculator from './components/Calculator'; // Assuming Calculator is in the same directory
import Pattern from './components/Pattern'; // Import the Pattern component

const App = () => {
  return (
    <Pattern>
      <div className="app-content">
        <Calculator />
      </div>
    </Pattern>
  );
};

export default App;
