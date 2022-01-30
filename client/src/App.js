import { Container } from "react-bootstrap";
import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <>
      <Container>
        <InputTodo />
        <ListTodos />
      </Container>
    </>
  );
}

export default App;
