import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { initTheme } from './theme';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;