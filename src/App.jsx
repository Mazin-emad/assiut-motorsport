import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
import { TeamMembersProvider } from "./context/teamMembersContext";
import AuthProvider from "./context/authContext";
function App() {
  return (
    <TeamMembersProvider>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </TeamMembersProvider>
  );
}

export default App;
