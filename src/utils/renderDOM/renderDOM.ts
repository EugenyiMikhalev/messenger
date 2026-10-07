import Block from "../../core/Block";

function render(query: string, block: Block): Element | null {
  const root = document.querySelector(query);
  if (!root) throw new Error(`Element with query ${query} was not found`);
  if (!block.getContent()) throw new Error("Block is empty");
  root.appendChild(block.getContent() as HTMLElement);
  block.dispatchComponentDidMount();
  return root;
}

export default render;
