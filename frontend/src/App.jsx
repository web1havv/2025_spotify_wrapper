import { useState } from 'react';
import LandingPage from './components/LandingPage';
import WrappedView from './components/WrappedView';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [username, setUsername] = useState('');
  const [wrappedData, setWrappedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchWrapped = async (leetcodeUsername) => {
    setLoading(true);
    setError(null);
    setUsername(leetcodeUsername);

    try {
      const response = await fetch(`/api/leetcode/wrapped/${leetcodeUsername}?year=2025`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      setWrappedData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUsername('');
    setWrappedData(null);
    setError(null);
  };

  if (loading) {
    return <LoadingScreen username={username} />;
  }

  if (wrappedData) {
    return <WrappedView data={wrappedData} onReset={handleReset} />;
  }

  return <LandingPage onSubmit={handleFetchWrapped} error={error} />;
}

export default App;

