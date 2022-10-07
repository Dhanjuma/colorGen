import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [details, setDetails] = useState({ color: "#f15025", quantity: 5 });
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#f15025").all(5));

  const handleChange = (name, value) => {
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(details.color).all(parseInt(details.quantity));
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  // console.log(list);
  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="color">
            <h4>Color : </h4>
          </label>
          <input
            id="color"
            name="color"
            type="text"
            value={details.color}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
            className={`${error ? "error" : null}`}
          />
          <label htmlFor="quantity">
            <h4>Quantity : </h4>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            max="50"
            value={details.quantity}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              colors={list}
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
