import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../supabase/config';
import confetti from 'canvas-confetti';

const PurchaseSuccess = () => {
  const [searchParams] = useSearchParams();
  const purchaseId = searchParams.get('id');

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const particleCount = 50;
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setTimeout(() => clearInterval(interval), duration);

    const updatePurchaseStatus = async () => {
      if (!purchaseId) return;

      try {
        const { error } = await supabase
          .from('regs_coffee_merch_purchases')
          .update({ payment_status: 'confirmed' })
          .eq('id', purchaseId);

        if (error) throw error;
        
        // Show success message to user
        // Redirect to appropriate page after few seconds
      } catch (error) {
        console.error('Error updating purchase status:', error);
      }
    };

    updatePurchaseStatus();
  }, [purchaseId]);

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center bg-neutral-800 p-8 rounded-lg shadow-2xl transform animate-fadeIn">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-4xl font-bold text-white mb-4">Thank You for Your Purchase!</h1>
          <p className="text-gray-400 text-lg mb-8">Your order has been confirmed and is being processed.</p>
        </div>
        
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg
            hover:bg-green-600 transition-colors duration-200 transform hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default PurchaseSuccess; 