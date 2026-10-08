import Button from "./button";
import render from "../../utils/renderDOM/renderDOM";

const initialProps = {
  text: "Click me",
  events: {
    click: [(event) => console.log("Button clicked", event.target)],
    mouseover: [(event) => console.log("Button hover")],
  },
};

const button = new Button(initialProps);

render(".app", button);

let test = {
  events: {
    click: [() => console.log("1"), (event) => console.log(event)],
    mouseover: [() => console.log("mouse over!!")],
  },
};

for (let event in test.events) {
  console.log(event);
  console.log(test.events[event]);
}
setTimeout(() => {
  button.props.text = "Click me NEW";
  button.props.events = {
    click: [(event) => console.log("new event", event.target)],
    mouseover: [(event) => console.log("Button hover")],
  };
}, 2000);
