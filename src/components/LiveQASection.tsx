import React from 'react';
import { Shield, Calendar, MessageSquare, PieChart, Users, ChevronRight } from 'lucide-react';

const upcomingQASessions = [
  {
    id: 1,
    title: "Artist Spotlight: The Wood Brothers",
    date: "2023-12-08",
    time: "7:00 PM",
    host: "Reg",
    guests: "The Wood Brothers",
    description: "Join us for an intimate Q&A session with The Wood Brothers before their show."
  },
  {
    id: 2,
    title: "Behind the Music: Ben Folds",
    date: "2023-12-19",
    time: "6:00 PM",
    host: "Reg",
    guests: "Ben Folds",
    description: "Exclusive pre-show chat and Q&A with Ben Folds."
  }
];

const LiveQASection = () => {
  return (
    <section className="py-20 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Verify and Submit */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Live Q&A Sessions</h2>
              <p className="text-gray-400">Join exclusive Q&A sessions with your favorite artists.</p>
            </div>

            <div className="bg-neutral-900 rounded-xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-600/20 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Verify MINY</h3>
                  <p className="text-gray-400">Connect your MINY to access exclusive Q&A sessions</p>
                </div>
              </div>
              <button className="w-full btn btn-primary">Connect MINY Wallet</button>
            </div>

            <div className="bg-neutral-900 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Submit Your Question</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Your Question</label>
                  <textarea 
                    className="w-full bg-neutral-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    rows={4}
                    placeholder="Type your question here..."
                  />
                </div>
                <button type="submit" className="w-full btn btn-primary">Submit Question</button>
              </form>
            </div>
          </div>

          {/* Right Column - Sessions */}
          <div className="space-y-8">
            <div className="bg-neutral-900 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Upcoming Sessions</h3>
              <div className="space-y-6">
                {upcomingQASessions.map((session) => (
                  <div key={session.id} className="border-l-4 border-amber-600 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-white">{session.title}</h4>
                        <p className="text-gray-400">{session.description}</p>
                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {session.guests}
                          </span>
                        </div>
                      </div>
                      <button className="btn btn-secondary">
                        Join <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900 rounded-xl p-6 text-center">
                <MessageSquare className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="text-lg font-medium text-white">Live Chat</h4>
                <p className="text-sm text-gray-400">Interact with other fans</p>
              </div>
              <div className="bg-neutral-900 rounded-xl p-6 text-center">
                <PieChart className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="text-lg font-medium text-white">Live Polls</h4>
                <p className="text-sm text-gray-400">Vote on session topics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveQASection;