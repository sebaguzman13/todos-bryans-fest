import './App.css';
import TodosList from './components/TodosList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        TODOS
      </header>
      <main>
        <TodosList />
      </main>
    </div>
  );
}

export default App;
