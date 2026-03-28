import { Outlet, useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import { storage } from '../utils/storage';

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    
    // If no user, redirect to payment page
    if (!currentUser && location.pathname !== '/') {
      navigate('/');
    }
    
    // If user hasn't paid, redirect to payment page
    if (currentUser && !currentUser.hasPaid && location.pathname !== '/') {
      navigate('/');
    }
    
    // If user paid but hasn't completed onboarding, redirect to onboarding
    if (currentUser && currentUser.hasPaid && !currentUser.name && location.pathname !== '/onboarding') {
      navigate('/onboarding');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900">
      <Outlet />
    </div>
  );
}