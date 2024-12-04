import React, { useState, useEffect } from 'react';
import { Calendar, Users, ShoppingBag } from 'lucide-react';
import MixtapeGrid from './MixtapeGrid';
import { supabase } from '../supabase/config';

interface PersonalizedDashboardProps {
  userName: string;
}

const exclusiveMixtapes = [
  {
    name: "reg's october selects",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-d0ea7c9a-9fb5-4b15-9e59-920d87a3c4f7?alt=media&token=567fc641-5996-457f-86e3-0b2b74d381e2",
    shortenedLink: "https://go.minyvinyl.com/octselect"
  },
  {
    name: "reg's eclectic",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-5de45442-f132-48a9-ac48-e8c0ce109b84?alt=media&token=4614cda2-e94c-466d-b7be-47d2c00794cf",
    shortenedLink: "https://go.minyvinyl.com/regeclec"
  },
  {
    name: "reg's annie edition",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-92fda9e1-d7b6-4263-9ce8-4a64e40491c9?alt=media&token=74b13d16-17d0-4bf6-bc3c-beaddd317c4d",
    shortenedLink: "https://go.minyvinyl.com/regannie"
  }
];

const merchItems = [
  {
    id: 1,
    name: "Reg's Artisanal Coffee",
    price: 19.99,
    image: "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/regcoffee.png",
    description: "Premium roasted coffee blend"
  },
  {
    id: 2,
    name: "Reg's Coffee House Tote Bag",
    price: 24.99,
    image: "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/regtote.png",
    description: "Eco-friendly canvas tote"
  },
  {
    id: 3,
    name: "Reg's Xmas Mystery Box",
    price: 49.99,
    image: "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/rgxmas.png",
    description: "Limited edition holiday surprise (Pre-order)"
  }
];

const upcomingEvents = [
  {
    id: 1,
    name: "Birmingham Bulls vs. Pensacola Ice Flyers",
    date: "Dec 5",
    time: "7:00 PM",
    venue: "The Pelham Civic Complex",
    image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 2,
    name: "Birmingham Bulls vs Evansville Thunderbolts",
    date: "Dec 6",
    time: "7:00 PM",
    venue: "Birmingham Barons",
    image: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: 3,
    name: "The Wood Brothers",
    date: "Dec 8",
    time: "8:00 PM",
    venue: "Iron City",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
  }
];

const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({ userName }) => {
  const [rsvpStatus, setRsvpStatus] = useState<{ [key: number]: boolean }>({});
  const [cartItems, setCartItems] = useState<{ [key: number]: boolean }>({});
  const [loadingPurchases, setLoadingPurchases] = useState<{ [key: number]: boolean }>({});
  const [loadingRSVPs, setLoadingRSVPs] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const checkExistingRSVPs = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        const { data, error } = await supabase
          .from('regs_coffee_event_invites')
          .select('event_id')
          .eq('user_email', userEmail);

        if (error) {
          console.error('Error fetching RSVPs:', error);
        } else if (data) {
          const rsvpObject = data.reduce((acc, curr) => ({
            ...acc,
            [curr.event_id]: true
          }), {});
          setRsvpStatus(rsvpObject);
        }
      }
    };

    checkExistingRSVPs();
  }, []);

  const handleRSVP = async (eventId: number) => {
    setLoadingRSVPs(prev => ({ ...prev, [eventId]: true }));
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        const { data: userInfo, error } = await supabase
          .from('regs_coffee_subscribers')
          .select('*')
          .eq('user_email', userEmail)
          .single();

        if (error) {
          console.error('Error fetching user info:', error);
        } else {
          const event = upcomingEvents.find(e => e.id === eventId);
          if (event) {
            // Insert into regs_coffee_event_invites for subscribers
            const { data, error } = await supabase
              .from('regs_coffee_event_invites')
              .insert({
                event_id: event.id,
                event_name: event.name,
                event_date: event.date,
                event_time: event.time,
                event_venue: event.venue,
                user_email: userInfo.user_email,
                subscriber_type: 'subscriber'
              });

            if (error) {
              console.error('Error inserting invite:', error);
            } else {
              setRsvpStatus(prev => ({
                ...prev,
                [eventId]: true
              }));
            }
          }
        }
      }
    } finally {
      setLoadingRSVPs(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const handlePurchase = async (itemId: number) => {
    setLoadingPurchases(prev => ({ ...prev, [itemId]: true }));
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) return;

      const { data: userInfo, error: userError } = await supabase
        .from('regs_coffee_subscribers')
        .select('id')
        .eq('user_email', userEmail)
        .single();

      if (userError) throw userError;

      const item = merchItems.find(i => i.id === itemId);
      if (!item) throw new Error('Item not found');

      // Create purchase record
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('regs_coffee_merch_purchases')
        .insert({
          user_email: userEmail,
          user_type: 'subscriber',
          item_id: itemId,
          item_name: item.name,
          item_price: item.price,
          payment_status: 'initiated',
          subscriber_id: userInfo.id
        })
        .select()
        .single();

      if (purchaseError) throw purchaseError;

      // Call payment gateway
      const response = await fetch(' https://payment-test.alet8891.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: window.location.origin,
          amount: item.price,
          productName: item.name,
          productDescription: item.description,
          productImage: item.image,
          successUrl: `${window.location.origin}/purchase-success?id=${purchaseData.id}`,
          cancelUrl: `${window.location.origin}/dashboard`,
          metadata: {
            purchaseId: purchaseData.id,
            userEmail,
            subscriberId: userInfo.id
          }
        })
      });

      const { url } = await response.json();
      if (url) window.location.href = url;

    } catch (error) {
      console.error('Purchase error:', error);
      // Show error notification to user
    } finally {
      setLoadingPurchases(prev => ({ ...prev, [itemId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-black py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Welcome, {userName}!</h1>
          <p className="text-lg sm:text-xl text-gray-400">Your Coffee & Music Journey Starts Here.</p>
          <p className="text-gray-400">Personalized just for you, {userName}, to elevate your subscriber experience.</p>
        </div>
      </section>

      {/* Subscriber Only Mixtapes */}
      <section id="miny-exclusives" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Subscriber Only Mixtapes</h2>
          <p className="text-gray-400 mb-8">Dive into the Heart of Reg's Music</p>
          <p className="text-gray-400 mb-12">Explore curated mixtapes crafted to pair perfectly with your coffee moments.</p>
          <MixtapeGrid mixtapes={exclusiveMixtapes} />
        </div>
      </section>

      {/* Exclusive Videos */}
      <section id="exclusive-videos" className="py-12 sm:py-20 bg-neutral-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Exclusive Videos for Subscribers Only</h2>
          <p className="text-gray-400 mb-4">Behind the Beans and Beats</p>
          <p className="text-gray-400 mb-12">Discover stories, sessions, and more from Reg's Coffee House.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="aspect-video bg-neutral-900 rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://player.vimeo.com/video/1034035101?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Experience Reg's Coffee House: A Journey Through Music"
              ></iframe>
            </div>
            <div className="aspect-video bg-neutral-900 rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://player.vimeo.com/video/1033249955?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Subscriber Insights Dashboard: Connecting Artists to Their Top 1000 Fans"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Events */}
      <section id="vip-events" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">VIP Events</h2>
          <p className="text-gray-400 mb-12">Experience Music Live, Beyond the Screen.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-neutral-800 rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{event.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                          <Users className="w-4 h-4" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRSVP(event.id)}
                    disabled={loadingRSVPs[event.id] || rsvpStatus[event.id]}
                    className={`w-full btn ${
                      rsvpStatus[event.id] 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'btn-primary'
                    }`}
                  >
                    {loadingRSVPs[event.id] ? 'Processing...' : 
                      rsvpStatus[event.id] ? 'Thank you, your seat has been reserved' : 'RSVP'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Merch */}
      <section id="member-merch" className="py-12 sm:py-20 bg-neutral-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Member-Exclusive Merch</h2>
          <p className="text-gray-400 mb-12">Your Reg's Coffee House Essentials</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {merchItems.map((item) => (
              <div key={item.id} className="bg-neutral-900 rounded-xl overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="space-y-4">
                    <span className="block text-2xl font-bold text-white">${item.price}</span>
                    <button 
                      onClick={() => handlePurchase(item.id)}
                      disabled={loadingPurchases[item.id]}
                      className="w-full btn btn-primary flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {loadingPurchases[item.id] ? 'Processing...' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalizedDashboard;