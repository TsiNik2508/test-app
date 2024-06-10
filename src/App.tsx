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
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/test" />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
