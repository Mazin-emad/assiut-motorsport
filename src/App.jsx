import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
import { TeamMembersProvider } from "./context/teamMembersContext";
import AuthProvider from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GalleryProvider } from "./context/galaryContext";
import { UpdateGalleryProvider } from "./context/updatGallery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GalleryProvider>
          <UpdateGalleryProvider>
            <TeamMembersProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </TeamMembersProvider>
          </UpdateGalleryProvider>
        </GalleryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
