const registrationStr = `
      <main class='{{pageClasses}}'>
        <h1 class='{{pageTitleClasses}}'>404</h1>
        <h2 class='{{pageSubtitleClasses}}'>Похоже такой страницы не существует.
<br/><a href='{{backHref}}'>Вернуться назад</a></h2>
      </main>
`;

const registrationTmpl = new window.Templator(registrationStr);
// console.log(loginTmpl);

const context = {
  pageClasses: "page page_layout_vertical",
  pageTitleClasses: "title title_theme_dark",
  pageSubtitleClasses: "title",

  backHref: "/login",
};

const renderedTemplate = registrationTmpl.compile(context);
console.log(registrationTmpl);
renderedTemplate.forEach((element) => document.body.append(element));
