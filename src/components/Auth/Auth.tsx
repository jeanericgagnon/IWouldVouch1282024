import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthForm } from './AuthForm';
import { toast } from 'react-hot-toast';

interface AuthProps {
  defaultMode: 'signin' | 'signup';
  onModeSwitch: (mode: 'signin' | 'signup') => void;
}

export function Auth({ defaultMode, onModeSwitch }: AuthProps) {
  const [error, setError] = useState('');
  const { signInWithLinkedIn } = useAuth();

  const handleLinkedInAuth = async () => {
    try {
      await signInWithLinkedIn();
    } catch (err) {
      console.error('LinkedIn auth error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AuthForm
        mode={defaultMode}
        onModeSwitch={() => onModeSwitch(defaultMode === 'signin' ? 'signup' : 'signin')}
        onLinkedInAuth={handleLinkedInAuth}
        error={error}
      />
    </div>
  );
}