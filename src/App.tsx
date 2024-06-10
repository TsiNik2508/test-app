import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import TestPage from './pages/TestPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router basename="/test-app">
          <Routes>
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<Navigate to="/test" replace />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
