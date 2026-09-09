import { AuthProvider } from '../context/AuthContext';
import { ContentProvider } from '../context/ContentContext';
import { PlayerProvider } from '../context/PlayerContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ContentProvider>
        <PlayerProvider>
          <Component {...pageProps} />
        </PlayerProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default MyApp;