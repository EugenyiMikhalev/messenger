window.get = function (obj, path, defaultValue) {
  console.log("IN GET, path: ", path);
  const keys = path.split(".");

  let result = obj;
  for (let key of keys) {
    result = result[key];

    if (result === undefined) return defaultValue;
  }
  console.log("RESULT: ", result);
  return result ?? defaultValue;
};

window.attributeChunk = function (str) {
  console.log("IN attributeChunk");

  str = str.trim();

  const regExpName = /^([\w\-]+)/gi;
  let name = str.match(regExpName)[0];
  console.log("NAME: ", name);

  if (name.length === str) return { name: name, value: true, str: "" };
  let indexQuoOpen = str.indexOf(`'`);
  let indexDQuoOpen = str.indexOf(`"`);
  let sliceWClosingQuo;
  let indexQuoClose;
  if (indexQuoOpen !== -1 && indexDQuoOpen !== -1) {
    if (indexQuoOpen < indexDQuoOpen) {
      console.log("111111111111111111111111111");

      sliceWClosingQuo = str.slice(indexQuoOpen + 1);
      indexQuoClose = sliceWClosingQuo.indexOf(`'`) + indexQuoOpen + 1;
    } else {
      console.log("222222222222222222222222222222");

      sliceWClosingQuo = str.slice(indexDQuoOpen + 1);
      indexQuoClose = sliceWClosingQuo.indexOf(`"`) + indexDQuoOpen + 1;
      return {
        name,
        value: str.slice(indexDQuoOpen + 1, indexQuoClose),
        str: str.slice(indexQuoClose + 1),
      };
    }
  } else if (indexDQuoOpen === -1) {
    console.log("333333333333333333333333333333", str, str.slice(4 + 1));

    sliceWClosingQuo = str.slice(indexQuoOpen + 1);
    indexQuoClose = sliceWClosingQuo.indexOf(`'`) + indexQuoOpen + 1;
  } else {
    console.log("4444444444444444444444444444", str);

    sliceWClosingQuo = str.slice(indexDQuoOpen + 1);
    indexQuoClose = sliceWClosingQuo.indexOf(`"`) + indexDQuoOpen + 1;
    return {
      name,
      value: str.slice(indexDQuoOpen + 1, indexQuoClose),
      str: str.slice(indexQuoClose + 1),
    };
  }

  return {
    name,
    value: str.slice(indexQuoOpen + 1, indexQuoClose),
    str: str.slice(indexQuoClose + 1),
  };
};

window.Templator = (function () {
  class Templator {
    // TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
    TEMPLATE_REGEXP_TAG = /\<(.*?)\>/gi;
    TEMPLATE_REGEXP_CURLY = /\{\{(.*?)\}\}/gi;
    constructor(template) {
      this._template = template;
    }

    compile(ctx) {
      return this._compileTemplate(ctx);
    }

    _getChunk = function (str) {
      str = str.trim();

      if (
        str.match(this.TEMPLATE_REGEXP_TAG) ||
        str.match(this.TEMPLATE_REGEXP_CURLY)
      ) {
        switch (str[0]) {
          case "<":
            let REIndex = str.indexOf(">");
            let indexQuoOpen = str.indexOf(`'`);
            let indexDQuoOpen = str.indexOf(`"`);
            while (
              REIndex !== -1 &&
              ((indexQuoOpen < REIndex && indexQuoOpen !== -1) ||
                (indexDQuoOpen < REIndex && indexDQuoOpen !== -1))
            ) {
              console.log("IN WHILE REIndex", str, indexQuoOpen, indexDQuoOpen);

              let inside = false;

              if (indexQuoOpen !== -1 && indexDQuoOpen !== -1) {
                if (indexQuoOpen > REIndex && indexDQuoOpen > REIndex)
                  return {
                    chunk: str.slice(0, str.indexOf(">") + 1),
                    str: str.slice(str.indexOf(">") + 1),
                    type: "tag",
                  };
                if (indexQuoOpen < REIndex) {
                  while (indexQuoOpen !== -1 && indexQuoOpen < REIndex) {
                    console.log("IN WHILE indexQuoOpen", indexQuoOpen, REIndex);

                    let sliceWClosingQuo = str.slice(indexQuoOpen + 1);
                    let indexQuoClose =
                      sliceWClosingQuo.indexOf(`'`) + indexQuoOpen + 1;

                    if (indexQuoClose > REIndex) {
                      inside = true;
                      console.log("BREAK FROM indexQuoOpen");
                      break;
                    } else {
                      console.log("indexQuoClose <= REIndex");
                      console.log(indexQuoClose);
                      console.log(str.slice(indexQuoClose + 1).indexOf(`'`));

                      indexQuoOpen =
                        indexQuoClose +
                        str.slice(indexQuoClose + 1).indexOf(`'`) +
                        1;
                      console.log("new indexQuoOpen:", indexQuoOpen);

                      if (indexQuoOpen === indexQuoClose) {
                        return {
                          chunk: str.slice(0, str.indexOf(">") + 1),
                          str: str.slice(str.indexOf(">") + 1),
                          type: "tag",
                        };
                      }
                    }
                    if (inside) {
                      console.log("BREAK FROM REIndex");

                      break;
                    }
                  }
                }
              } else if (indexQuoOpen !== -1) {
                if ("IN WHILE IN IF (indexQuoOpen !== -1)")
                  if (indexQuoOpen > REIndex) {
                    return {
                      chunk: str.slice(0, str.indexOf(">") + 1),
                      str: str.slice(str.indexOf(">") + 1),
                      type: "tag",
                    };
                  } else if (indexQuoOpen < REIndex) {
                    while (indexQuoOpen !== -1 && indexQuoOpen < REIndex) {
                      console.log(
                        "IN WHILE indexQuoOpen",
                        indexQuoOpen,
                        REIndex,
                      );

                      let sliceWClosingQuo = str.slice(indexQuoOpen + 1);
                      let indexQuoClose =
                        sliceWClosingQuo.indexOf(`'`) + indexQuoOpen + 1;

                      if (indexQuoClose > REIndex) {
                        inside = true;
                        console.log("BREAK FROM indexQuoOpen");
                        break;
                      } else {
                        console.log("indexQuoClose < REIndex");
                        console.log(indexQuoClose);
                        console.log(
                          indexQuoClose +
                            str.slice(indexQuoClose + 1).indexOf(`'`) +
                            1,
                        );

                        indexQuoOpen =
                          indexQuoClose +
                          str.slice(indexQuoClose + 1).indexOf(`'`) +
                          1;
                        console.log("new indexQuoOpen:", indexQuoOpen);

                        if (indexQuoOpen === indexQuoClose) {
                          return {
                            chunk: str.slice(0, str.indexOf(">") + 1),
                            str: str.slice(str.indexOf(">") + 1),
                            type: "tag",
                          };
                        }
                      }
                      if (inside) {
                        console.log("BREAK FROM REIndex");

                        break;
                      }
                    }
                  }
              } else if (indexDQuoOpen !== -1) {
                if ("IN WHILE IN IF (indexDQuoOpen !== -1)")
                  if (indexDQuoOpen > REIndex) {
                    return {
                      chunk: str.slice(0, str.indexOf(">") + 1),
                      str: str.slice(str.indexOf(">") + 1),
                      type: "tag",
                    };
                  } else if (indexDQuoOpen < REIndex) {
                    while (indexDQuoOpen !== -1 && indexDQuoOpen < REIndex) {
                      console.log(
                        "IN WHILE indexDQuoOpen",
                        indexDQuoOpen,
                        REIndex,
                      );

                      let sliceWClosingDQuo = str.slice(indexDQuoOpen + 1);
                      let indexDQuoClose =
                        sliceWClosingDQuo.indexOf(`"`) + indexDQuoOpen + 1;

                      if (indexDQuoClose > REIndex) {
                        inside = true;
                        console.log("BREAK FROM indexDQuoOpen");
                        break;
                      } else {
                        console.log("indexDQuoClose < REIndex");
                        console.log(indexDQuoClose);
                        console.log(
                          indexDQuoClose +
                            str.slice(indexDQuoClose + 1).indexOf(`"`) +
                            1,
                        );

                        indexDQuoOpen =
                          indexDQuoClose +
                          str.slice(indexDQuoClose + 1).indexOf(`"`) +
                          1;
                        console.log("new indexDQuoOpen:", indexDQuoOpen);

                        if (indexDQuoOpen === indexDQuoClose) {
                          return {
                            chunk: str.slice(0, str.indexOf(">") + 1),
                            str: str.slice(str.indexOf(">") + 1),
                            type: "tag",
                          };
                        }
                      }
                      if (inside) {
                        console.log("BREAK FROM REIndex");

                        break;
                      }
                    }
                  }
              }
              if (inside) {
                REIndex = REIndex + str.slice(REIndex + 1).indexOf(">");
                console.log("NEW REIndex:", REIndex);
              }
            }
            console.log("AFTER REIndex WHILE");
            return {
              chunk: str.slice(0, str.indexOf(">") + 1),
              str: str.slice(str.indexOf(">") + 1),
              type: "tag",
            };
          case "{":
            return {
              chunk: str.slice(0, str.indexOf("}") + 2),
              str: str.slice(str.indexOf("}") + 2),
              type: "curly",
            };
          default:
            let curlyIndex = str.indexOf("{");

            let tagIndex = str.indexOf("<");

            let end =
              curlyIndex > 0 && curlyIndex < tagIndex ? curlyIndex : tagIndex;
            if (end === -1) end = str.length - 1;
            return {
              chunk: str.slice(0, end).trim(),
              str: str.slice(end),
              type: "string",
            };
        }
      } else {
        return { chunk: str, str: "", type: "string" };
      }
    };

    _compileTemplate(ctx) {
      console.log("IN COMPILE FUNCTION");

      let tmpl = this._template;

      const tags = [];

      let chunk = this._getChunk(tmpl);
      while (chunk.str !== "" || chunk.chunk !== "") {
        switch (chunk.type) {
          case "tag":
            console.log("tag: ", chunk.chunk);

            // Если незакрывающий тэг
            if (chunk.chunk[1] !== "/") {
              const VOID_TAGS = [
                "area",
                "base",
                "br",
                "col",
                "embed",
                "hr",
                "img",
                "input",
                "link",
                "meta",
                "source",
                "track",
                "wbr",
              ];
              let tagOnly = chunk.chunk.match(/\w+/)[0];
              console.log("tagOnly: ", tagOnly);
              let element = document.createElement(tagOnly);

              if (VOID_TAGS.indexOf(tagOnly) === -1) {
                tags.push({ element: element });
              } else {
                if (tags.length !== 1) {
                  console.log("VOID ELEMENT ");
                  console.log("[tags.length - 1]: ", tags[tags.length - 1]);
                  tags[tags.length - 1].element.appendChild(element);
                } else {
                  document.body.appendChild(element);
                }
              }

              if (tagOnly.length === chunk.chunk.trim().length - 2) break;

              console.log("TAG HAS ATTRIBUTES");
              const attrs = chunk.chunk
                .match(/(?:=>|[\w={}'"()_ ])+/)[0]
                .slice(tagOnly.length);

              console.log("ATTRS: ", attrs);

              if (attrs.length > 0) {
                let attr = attributeChunk(attrs);

                if (attr.value[0] + attr.value[1] === "{{") {
                  console.log("attr with context");
                  const tmplValue = attr.value.match(/\{\{(\w+)\}\}/)[1];
                  const data = get(ctx, tmplValue);
                  if (typeof data === "function") {
                    //  TODO: добавить обработку перезаписи методов window (если в разных контекстах одинаковые названия для методов)
                    window[tmplValue] = data;
                    element.setAttribute(attr.name, `window.${tmplValue}()`);
                  } else {
                    element.setAttribute(attr.name, data);
                  }
                } else {
                  element.setAttribute(attr.name, attr.value);
                }
                console.log("at1: ", JSON.stringify(attr));
                while (attr.str !== "") {
                  console.log("at: ", JSON.stringify(attr));
                  if (attr) console.log("at.str: ", attr.str);

                  attr = attributeChunk(attr.str);
                  if (attr.value[0] + attr.value[1] === "{{") {
                    console.log("attr with context");
                    const tmplValue = attr.value.match(/\{\{(\w+)\}\}/)[1];
                    const data = get(ctx, tmplValue);
                    if (typeof data === "function") {
                      //  TODO: добавить обработку перезаписи методов window (если в ранзных контекстах одинаковые названия для методов)
                      window[tmplValue] = data;
                      element.setAttribute(attr.name, `window.${tmplValue}()`);
                    } else {
                      element.setAttribute(attr.name, data);
                    }
                  } else {
                    element.setAttribute(attr.name, attr.value);
                  }
                }
              }
            } else {
              console.log("TAGS: ");
              tags.forEach((el) => console.log(el));
              if (tags.length !== 1) {
                console.log("In closing && parent in array");
                console.log("[tags.length - 2]: ", tags[tags.length - 2]);
                tags[tags.length - 2].element.appendChild(tags.pop().element);
              } else {
                document.body.appendChild(tags.pop().element);
              }
              console.log("TAGS AFTER CLOSING: ");
              tags.forEach((el) => console.log(el));
            }
            break;
          case "curly":
            console.log("curly: ", chunk.chunk.match(/\w+/)[0]);
            tags[tags.length - 1].element.innerHTML = get(
              ctx,
              chunk.chunk.match(/[\w.]+/)[0],
            );

            break;
          case "string":
            console.log("str: ", chunk.chunk);
            tags[tags.length - 1].element.innerHTML = chunk.chunk;
            break;
          default:
            throw new Error("Unknown type of chunk" + JSON.stringify(chunk));
        }

        console.log(JSON.stringify(chunk));
        chunk = { ...this._getChunk(chunk.str) };
        console.log("");
        console.log("");
        console.log("");
        console.log(
          "-----------------------------------------------------------------------------",
        );
      }

      return tmpl;
    }
  }

  return Templator;
})();
