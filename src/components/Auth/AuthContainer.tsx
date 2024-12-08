import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../hooks/useAuth';
import { Auth } from './Auth';
import { toast } from 'react-hot-toast';

export function AuthContainer() {
  const location = useLocation();
  const { mode, navigateWithMode } = useNavigation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const returnPath = sessionStorage.getItem('returnPath');
      if (returnPath) {
        sessionStorage.removeItem('returnPath');
        navigate(returnPath);
      } else {
        navigate('/profile');
      }
      toast.success('Successfully signed in!');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Set initial mode based on URL
    const currentMode = location.pathname === '/signup' ? 'sign-up' : 'sign-in';
    if (mode !== currentMode) {
      navigateWithMode(currentMode);
    }
  }, [location.pathname, mode, navigateWithMode]);

  const handleModeSwitch = (newMode: 'signin' | 'signup') => {
    navigateWithMode(newMode === 'signup' ? 'sign-up' : 'sign-in');
  };

  return (
    <Auth 
      defaultMode={mode === 'sign-up' ? 'signup' : 'signin'} 
      onModeSwitch={handleModeSwitch}
    />
  );
}