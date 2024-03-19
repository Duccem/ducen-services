import '@fontsource/nunito';
import '@shared/ui-web/src/utils/theme/theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { PrincipalContextProvider } from './modules/shared/PrincipalContext.tsx';
import { router } from './sections/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrincipalContextProvider configurations={{
      baseUrl: import.meta.env.VITE_BASE_URL,
      citiesUrl: import.meta.env.VITE_CITIES_API_URL,
      countriesUrl: import.meta.env.VITE_COUNTRIES_API_URL,
    }}>
      <RouterProvider router={router} />
    </PrincipalContextProvider>
  </React.StrictMode>,
)
