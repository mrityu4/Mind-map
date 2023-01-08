import DnDFlow from "./components/flow";
import { ReactFlowProvider } from "react-flow-renderer";

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <DnDFlow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
