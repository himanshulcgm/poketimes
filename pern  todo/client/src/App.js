import './App.css';
import InputTodo from './components/inputTodo';
import ListTodo from './components/listTodo';
function App() {
  return (
    <>
    <div className="container">
    <InputTodo></InputTodo>
    <ListTodo></ListTodo>
    </div>
    </>
  );
}

export default App;
