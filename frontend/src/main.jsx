import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'
import Router from './routes'
import { UserProvider } from './UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <UserProvider>
            <Router />
        </UserProvider>
    </ThemeProvider>
)
