import "./styles.css";

// initial todos
// DO NOT EDIT THIS ARRAY
// You may add props to objects if needed.
let todos = [
  {
    todoID: 0,
    todoText: "Finish Homework",
    todoComplete: false,
  },
  {
    todoID: 1,
    todoText: "Walk the dog",
    todoComplete: true,
  },
  {
    todoID: 2,
    todoText: "Clean my room",
    todoComplete: false,
  },
];

const input = document.querySelector<HTMLInputElement>("input");
const addBtn = document.querySelector<HTMLButtonElement>("button");
const listEl = document.querySelector<HTMLUListElement>(".todoList");

function render(): void {
  if (!listEl) return;

  listEl.innerHTML = "";
  for (const t of todos) {
    const li = document.createElement("li");
    li.dataset.id = String(t.todoID);
    if (t.todoComplete) li.classList.add("done");
    li.textContent = t.todoText;
    listEl.appendChild(li);
  }
}

function addTodo(): void {
  if (!input) return;

  const text = input.value.trim();
  if (text === "") return;

  const nextId = todos.length ? Math.max(...todos.map((t) => t.todoID)) + 1 : 0;

  const newTodo = {
    todoID: nextId,
    todoText: text,
    todoComplete: false,
  };

  todos.push(newTodo);
  input.value = "";
  render();
}

addBtn?.addEventListener("click", (): void => {
  addTodo();
});

input?.addEventListener("keydown", (e: KeyboardEvent): void => {
  if (e.key === "Enter") {
    addTodo();
  }
});

listEl?.addEventListener("click", (e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  const li = (target.closest("li") as HTMLLIElement) || null;
  if (!li) return;

  const id = Number(li.dataset.id);
  const todo = todos.find((t) => t.todoID === id);
  if (!todo) return;

  todo.todoComplete = !todo.todoComplete;
  render();
});

render();
