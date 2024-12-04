import React, { useState } from 'react';
import { ShoppingCart, Heart, Gift, Star } from 'lucide-react';
import { supabase } from '../supabase/config';

const merchItems = [
  {
    id: 1,
    name: "Classic Coffee House Tee",
    price: 29.99,
    images: [
      "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/regtee.png",
    ],
    description: "100% organic cotton tee with vintage radio design",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Navy", "Heather Gray"],
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Limited Edition Vinyl",
    price: 34.99,
    images: [
      "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/rgvinyl.png",
    ],
    description: "Exclusive compilation of live sessions",
    rating: 5.0,
    reviews: 89
  },
  {
    id: 3,
    name: "Coffee House Hoodie",
    price: 49.99,
    images: [
      "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/regsweat.png",
    ],
    description: "Premium cotton blend hoodie with embroidered logo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    rating: 4.9,
    reviews: 156
  }
];

const MerchCard = ({ item }: { item: typeof merchItems[0] }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    
    const userEmail = localStorage.getItem('userEmail');
    
    try {
      // Create purchase record
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('regs_coffee_merch_purchases')
        .insert({
          user_email: userEmail || null,
          user_type: userEmail ? 'subscriber' : 'non_subscriber',
          item_id: item.id,
          item_name: item.name,
          item_price: item.price,
          payment_status: 'initiated'
        })
        .select()
        .single();

      if (purchaseError) throw purchaseError;

      // Call payment gateway
      const response = await fetch('http://127.0.0.1:8787/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: window.location.origin,
          amount: item.price,
          productName: item.name,
          productDescription: item.description,
          productImage: item.images[0],
          successUrl: `${window.location.origin}/purchase-success?id=${purchaseData.id}`,
          cancelUrl: `${window.location.origin}`,
          metadata: {
            purchaseId: purchaseData.id,
            userEmail: userEmail || 'guest'
          }
        })
      });

      const { url } = await response.json();
      if (url) window.location.href = url;

    } catch (error) {
      console.error('Purchase error:', error);
      // Show error notification to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 rounded-xl overflow-hidden group flex flex-col h-full">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-gray-400">{item.rating}</span>
          </div>
        </div>
        <p className="text-gray-400 mb-4 flex-1">{item.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-white">${item.price}</span>
          <div className="space-x-2">
            <button className="btn btn-secondary p-2" title="Add to Wishlist">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={handlePurchase}
              disabled={isLoading}
              className="btn btn-primary px-4 py-2 min-w-[100px]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </span>
              ) : (
                'Buy Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MerchSection = () => {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Official Merch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Show your support with exclusive Reg's Coffee House merchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchItems.map((item) => (
            <MerchCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-800 rounded-xl p-6 text-center">
            <Gift className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">MINY Rewards</h3>
            <p className="text-gray-400">Earn points with every purchase</p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Member Exclusives</h3>
            <p className="text-gray-400">Special items for MINY holders</p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-6 text-center">
            <ShoppingCart className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Free Shipping</h3>
            <p className="text-gray-400">On orders over $50</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchSection;