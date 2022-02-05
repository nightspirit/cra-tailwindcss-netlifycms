import { Provider } from "use-http";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <Provider url="/data">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
