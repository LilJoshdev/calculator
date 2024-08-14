import React, { useEffect, useState } from 'react'
import './Calculator.css'

const Calculator = () => {

    const [current, setCurrent] = useState("");
    const [previous, setPrevious] = useState("");
    const [operator, setOperator] = useState("");
    const [display, setDisplay] = useState("0");
    const [topDisplay, setTopDisplay] = useState("");

    useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [current]);

  useEffect(() => {
    //updateDisplay();
    console.log(current, previous, operator);
  
  }, [current, operator, previous]);


    const handleKeyDown = (e) => {
        if (validKeys.includes(e.key)) {
        handleClick(e.key);
        // console.log(e.key);
        }
    };

    const handleClick = (value) => {
        keyEntered(value);
    };



    const keyEntered = (value) => {
        if (previous === "" && display === "0" && value === "0") return;
        if (value === "Delete") return allClear();
        if (value === "." && current.includes(".")) return;
        if ((value === "Enter" || value === "Backspace") && (!previous || !current))
        return;
        if (value === "*") updateDisplay("×");
        else updateDisplay(value);
        if (value === "=" || value === "Enter") {
        setOperator(() => value);
        return compute(value);
        }
        if (["+", "-", "*", "/"].includes(value)) {
        if (previous !== "") {
            if (!current || current === "-") {
            if (value !== "-") {
                setCurrent("");
                return setOperator(() => value);
            } else return setCurrent("-");
            }
            compute();
            setOperator(() => value);
            return;
        }
        if (current) {
            setPrevious(() => current);
            setOperator(() => value);
            setCurrent(() => "");
        }
        if (!current && previous) setOperator(() => value);
        } else {
        setCurrent((prev) => {
            if (prev !== "0" && prev !== "")
            return prev.toString() + value.toString();
            else return value;
        });
        }
    };


    const compute = (value) => {
        let result = "";
        const a = parseFloat(previous);
        const b = parseFloat(current);
        if (operator === "+") result = a + b;
        else if (operator === "-") result = a - b;
        else if (operator === "*") result = a * b;
        else if (operator === "/") result = a / b;
        else return;

        if (value === "=" || value === "Enter") setDisplay(result);
        setCurrent("");
        setPrevious(() => result);
        setOperator((prev) => "");
    };

    const updateDisplay = (value) => {
        if (value)
        setDisplay((prev) => {
            if (prev !== "0") return prev + value;
            return value;
        });
    };


    const backSpace = () => {
        setCurrent((prev) => {
        return prev ? prev.slice(0, -1) : 0;
        });
    };

    const allClear = () => {
        setDisplay("0");
        setOperator("");
        setCurrent("0");
        setPrevious("");
    };

    const keys = [
    {
        id: "clear",
        value: "Delete",
        class: "span2 fs-3",
        show: "AC"
    },
    {
        id: "divide",
        value: "/"
    },
    {
        id: "multiply",
        value: "*",
        show: "×"
    },
    {
        id: "seven",
        value: "7"
    },
    {
        id: "eight",
        value: "8"
    },
    {
        id: "nine",
        value: "9"
    },
    {
        id: "subtract",
        value: "-"
    },
    {
        id: "four",
        value: "4"
    },
    {
        id: "five",
        value: "5"
    },
    {
        id: "six",
        value: "6"
    },
    {
        id: "add",
        value: "+"
    },
    {
        id: "one",
        value: "1"
    },
    {
        id: "two",
        value: "2"
    },
    {
        id: "three",
        value: "3"
    },
    {
        id: "equals",
        value: "=",
        class: "vspan2 fs-3"
    },
    {
        id: "zero",
        value: "0",
        class: "span2 fs-3"
    },
    {
        id: "decimal",
        value: "."
    }
    ];

const validKeys = [...keys.map((k) => k.value), "Enter", "Backspace"];
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="calculator shadow p-3 mb-5 bg-body-tertiary rounded">
         <div id="display" className="p-2 border bg-light fs-2">
           {display}
         </div>
         <div className="numbers border border-light ">
           {keys.map((k, idx) => {
            return (
              <div
                key={idx}
                id={k.id}
                className={
                  k.class
                    ? k.class
                    : "" +
                      " p-3 text-center bg-light border border-secondary fs-3 shadow p-3 bg-body-tertiary rounded"
                }
                onClick={() => handleClick(k.value)}
              >
                {k.show || k.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Calculator

