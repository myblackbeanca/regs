import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createThirdwebClient } from 'thirdweb';
import { ThirdwebProvider } from "thirdweb/react";
import { inAppWallet, getUserEmail } from 'thirdweb/wallets/in-app';
import { mainnet } from 'thirdweb/chains';
import { supabase } from '../supabase/config';

const CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID as string;

const client = createThirdwebClient({ 
  clientId: "796222d959dc0883ca0d6a5f48bc2cbd" 
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
}

const AuthModal = ({ isOpen, onClose, onSubmit }: AuthModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    password: 'hellominy'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const wallet = inAppWallet({
    auth: {
      mode: 'popup',
      options: {
        clientId: CLIENT_ID,
        providers: ['google']
      }
    }
  });

  const handleGoogleLogin = async () => {
    try {
      if (!formData.name.trim()) {
        setError('Please enter your name');
        return;
      }

      const account = await wallet.connect({ 
        client, 
        chain: mainnet,
        strategy: 'google'
      });

      const authenticatedEmail = await getUserEmail({ client });
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('walletAddress', account.address);
      localStorage.setItem('userEmail', authenticatedEmail);

      setIsSubmitted(true);

      const { data: existingUser, error: fetchError } = await supabase
        .from('regs_coffee_subscribers')
        .select()
        .eq('user_email', authenticatedEmail)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (!existingUser) {
        const { error: insertError } = await supabase
          .from('regs_coffee_subscribers')
          .insert([
            {
              user_email: authenticatedEmail,
              name: formData.name,
              wallet_address: account.address,
            }
          ]);

        if (insertError) throw insertError;
      } else {
        const { error: updateError } = await supabase
          .from('regs_coffee_subscribers')
          .update({ last_login: new Date().toISOString() })
          .eq('user_email', authenticatedEmail);

        if (updateError) throw updateError;
      }

      
      onSubmit({ name: formData.name });
      setIsSubmitted(false);
      navigate('/members');
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full mx-4">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
            <p className="text-gray-400">
              Verification successful! Redirecting to subscriber's area...
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Subscriber Access</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  disabled
                  className="w-full bg-neutral-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-sm text-gray-400 mt-1">Default password: hellominy</p>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;