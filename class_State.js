
import React from 'react';

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            date: new Date().toLocaleDateString()
        };

    }

    render() {

        return (
            <div>

                <h1>Current Date</h1>

                <h2>{this.state.date}</h2>

            </div>
        );

    }

}

export default App;
