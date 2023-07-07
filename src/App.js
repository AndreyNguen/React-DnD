import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./Components/Board";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}

export default App;
