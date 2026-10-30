
import React from 'react';

class Student extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            count: 0
        };

        console.log("Constructor called");

    }

    componentDidMount() {

        console.log("Component Mounted");

    }

    componentDidUpdate() {

        console.log("Component Updated");

    }

    componentWillUnmount() {

        console.log("Component Unmounted");

    }

    render() {

        console.log("Render called");

        return (
            <div>

                <h2>React Lifecycle</h2>

                <p>Count: {this.state.count}</p>

                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1
                    });
                }}>
                    Update
                </button>

            </div>
        );

    }

}


class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            show: true
        };

    }

    render() {

        return (
            <div>

                <h1>Component Lifecycle Demo</h1>

                <button onClick={() => {
                    this.setState({ show: !this.state.show });
                }}>
                    Show / Hide
                </button>

                {this.state.show && <Student />}

            </div>
        );

    }

}

export default App;
