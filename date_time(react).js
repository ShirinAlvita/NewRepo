
import React from 'react';

function App() {

    var today = new Date();

    return (
        <div>

            <h1>Current Date and Time</h1>

            <h3>Date: {today.toLocaleDateString()}</h3>

            <h3>Time: {today.toLocaleTimeString()}</h3>

        </div>
    );

}

export default App;
