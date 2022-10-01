import RoutesComp from "~/routes";
import './App.css';
import useToken from './hooks/useToken';
import LoginRegisterPage from "./views/LoginRegisterPage";
function App() {
  return (
    <div className="App">
      <RoutesComp />
    </div>
  );
}

export default App;
