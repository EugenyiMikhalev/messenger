const testTempl = `
  <div>
    {{ field1 }}
    <span>{{field2}}</span>
    <span>{{ field3.info.name }}</span>
  </div>
`;
const tmpl = new window.Templator(testTempl);

const context = {
  field1: "Text 1",
  field2: 42,
  field3: {
    info: {
      name: "Simon",
    },
  },
};

const renderedTemplate = tmpl.compile(context);

document.body.innerHTML = renderedTemplate;

const testTemp2 = `
<button onClick={{handleClick}}>{{buttonText}}</button>
`;

const context2 = {
  handleClick: () => {
    alert("Clicked!");
  },
  buttonText: "click me",
};
const tmpl2 = new window.Templator(testTemp2);

const renderedTemplate2 = tmpl2.compile(context2);

document.body.innerHTML += renderedTemplate2;
