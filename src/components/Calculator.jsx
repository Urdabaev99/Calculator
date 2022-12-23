/* eslint no-eval:0 */
import React from "react";
import "./Calculator.css";

let store = {
  button: [
    { val: "1" },
    { val: "2" },
    { val: "3" },
    { val: "4" },
    { val: "5" },
    { val: "6" },
    { val: "7" },
    { val: "8" },
    { val: "9" },
    { val: "0" },
  ],
  signs: [{ val: "+" }, { val: "-" }, { val: "*" }, { val: "/" }],
  operations: [{ val: "C" }, { val: "=" }],
};

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      out: "0",
    };

    this.refOutput = React.createRef();
  }

  tepNumber(value) {
    let currentValue = value;
    let output = this.refOutput.current;

    this.setState({
      out: currentValue,
    });

    if (output.value === "0") {
      output.value = "";
    }
    output.value += currentValue;
  }

  tepOperation(value) {
    let output = this.refOutput.current;
    if (value === "C") {
      output.value = "0";
    } else if (value === "=") {
      try {
        output.value = eval(output.value);
      } catch {
        output.value = "Invalid value";
        setTimeout(() => {
          output.value = "0";
        }, 1500);
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="output">
          <input
            className="inputer"
            ref={this.refOutput}
            type="text"
            defaultValue={this.state.out}
          />
        </div>
        <div className="buttons">
          <div className="button">
            {store.button.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  this.tepNumber(item.val);
                }}
              >
                {item.val}
              </button>
            ))}
            {store.operations.map((item, j) => (
              <button
                key={j}
                onClick={() => {
                  this.tepOperation(item.val);
                }}
              >
                {item.val}
              </button>
            ))}
          </div>
          <div className="signs">
            {store.signs.map((item, i) => (
              <button
                className="signs_btn"
                key={i}
                onClick={() => {
                  this.tepNumber(item.val);
                }}
              >
                {item.val}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
