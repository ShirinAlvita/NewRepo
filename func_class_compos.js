
import React from 'react';

// Functional Component
function Student(props) {

    return (
        <div>
            <h2>Functional Component</h2>
            <p>Name: {props.name}</p>
            <p>Branch: {props.branch}</p>
        </div>
    );

}


// Class Component
class StudentClass extends React.Component {

    render() {

        return (
            <div>
                <h2>Class Component</h2>
                <p>Name: {this.props.name}</p>
                <p>Branch: {this.props.branch}</p>
            </div>
        );

    }

}


// Main Component
function App() {

    return (
        <div>

            <Student name="Ananya" branch="CSE" />

            <StudentClass name="Rahul" branch="IT" />

        </div>
    );

}

export default App;
