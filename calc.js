
import React, { useState } from 'react';

import './App.css';


// Calculator Button Component
function CalcButton(props) {

    return (
        <button onClick={props.click}>
            {props.value}
        </button>
    );

}


// Main Calculator Component
function App() {

    const [display, setDisplay] = useState("");


    // Number and operator input
    function addValue(value) {

        setDisplay(display + value);

    }


    // Clear display
    function clearDisplay() {

        setDisplay("");

    }


    // Calculate result
    function calculate() {

        try {

            if (!/^[0-9+\-*/().%\s]+$/.test(display)) {
                setDisplay("Error");
                return;
            }

            var result = Function(
                '"use strict"; return (' + display + ')'
            )();

            if (!Number.isFinite(result)) {
                setDisplay("Error");
            }
            else {
                setDisplay(String(result));
            }

        }
        catch(error) {

            setDisplay("Error");

        }

    }


    return (

        <div className="calculator">

            <h2>Calculator</h2>

            <input
                type="text"
                value={display}
                readOnly
            />

            <div className="buttons">

                <CalcButton value="7" click={() => addValue("7")} />
                <CalcButton value="8" click={() => addValue("8")} />
                <CalcButton value="9" click={() => addValue("9")} />
                <CalcButton value="/" click={() => addValue("/")} />

                <CalcButton value="4" click={() => addValue("4")} />
                <CalcButton value="5" click={() => addValue("5")} />
                <CalcButton value="6" click={() => addValue("6")} />
                <CalcButton value="*" click={() => addValue("*")} />

                <CalcButton value="1" click={() => addValue("1")} />
                <CalcButton value="2" click={() => addValue("2")} />
                <CalcButton value="3" click={() => addValue("3")} />
                <CalcButton value="-" click={() => addValue("-")} />

                <CalcButton value="0" click={() => addValue("0")} />
                <CalcButton value="." click={() => addValue(".")} />
                <CalcButton value="=" click={calculate} />
                <CalcButton value="+" click={() => addValue("+")} />

                <CalcButton value="C" click={clearDisplay} />

            </div>

        </div>

    );

}

export default App;
