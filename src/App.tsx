import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { useToggleTheme } from "./hooks/useToggleTheme";
import { AdminRoom } from "./pages/AdminRoom";

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from "./pages/Room";

import GlobalStyles from "./styles/globals";

function App() {
  const { theme } = useToggleTheme();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
          <GlobalStyles />
        </AuthenticationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
