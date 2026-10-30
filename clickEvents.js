
import React from 'react';

function App() {

    // Normal Function
    function showDate() {

        var today = new Date();

        alert(today.toLocaleString());

    }


    // Arrow Function
    const showMessage = () => {

        alert("Good Bye");

    };


    return (
        <div>

            <h1>React Event Handling</h1>

            <button onClick={showDate}>
                Display Date and Time
            </button>

            <br /><br />

            <button onClick={showMessage}>
                Good Bye
            </button>

        </div>
    );

}

export default App;
