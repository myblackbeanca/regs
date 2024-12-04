import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, X } from 'lucide-react';
import { supabase } from '../supabase/config';

const upcomingEvents = [
  {
    id: 1,
    name: "RSD Black Friday",
    date: "Nov 29",
    time: "10:00 AM",
    venue: "Seasick Records",
    type: "Special Event",
    status: "Request Invite"
  },
  {
    id: 2,
    name: "Blvck Friday Blvck Market",
    date: "Nov 29",
    time: "4:00 PM",
    venue: "The Woodlawn Theatre",
    type: "Market",
    status: "Request Invite"
  },
  {
    id: 3,
    name: "Birmingham Squadron vs. Memphis Hustle",
    date: "Nov 30",
    time: "11:00 AM",
    venue: "The BJCC Legacy Arena",
    type: "Sports",
    status: "Request Invite"
  }
];

const VideoSection = () => {
  const [rsvpStatus, setRsvpStatus] = useState<{ [key: number]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null);
  const [phone, setPhone] = useState('');

  const handleRSVP = (event: typeof upcomingEvents[0]) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (selectedEvent) {
      const { data, error } = await supabase
        .from('regs_coffee_event_invites')
        .insert({
          event_id: selectedEvent.id,
          event_name: selectedEvent.name,
          event_date: selectedEvent.date,
          event_time: selectedEvent.time,
          event_venue: selectedEvent.venue,
          phone_number: phone,
          subscriber_type: 'non-subscriber'
        });

      if (error) {
        console.error('Error inserting invite:', error);
      } else {
        setRsvpStatus({
          ...rsvpStatus,
          [selectedEvent.id]: "On Waitlist"
        });
      }
    }
    setShowModal(false);
    setPhone('');
  };

  return (
    <section id="upcoming-events" className="py-20 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join us for exclusive live shows, special events, and unforgettable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="bg-neutral-900 rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-600/20 text-amber-400 rounded-full text-sm">
                    {event.type}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => handleRSVP(event)}
                    className={`btn ${
                      rsvpStatus[event.id] === "On Waitlist"
                        ? "bg-green-500 hover:bg-green-600" 
                        : "btn-primary"
                    }`}
                  >
                    {rsvpStatus[event.id] || event.status}
                  </button>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300"
                  >
                    More Info
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RSVP Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Request Invite</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full btn btn-primary"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;