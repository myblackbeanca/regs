import React from 'react';
import { Crown, Download, Video, Calendar, MessageSquare, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MembersPageProps {
  userName: string;
}

const MembersPage = ({ userName }: MembersPageProps) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-600 to-amber-800">
      <div className="max-w-7xl mx-auto px-6 py-20 pt-32">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Reg's Coffee House, {userName}!
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Your MINY holder experience unlocks a world of exclusive content and perks.
          </p>
          <button 
            onClick={handleExplore}
            className="btn bg-white text-amber-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Start Exploring
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Download,
              title: "Mixtapes Access",
              description: "Stream, download, and collect exclusive mixtapes"
            },
            {
              icon: Video,
              title: "Exclusive Videos",
              description: "Behind-the-scenes footage and extended interviews"
            },
            {
              icon: Calendar,
              title: "VIP Events",
              description: "Priority access and special perks at live shows"
            },
            {
              icon: MessageSquare,
              title: "Live Q&A",
              description: "Interactive sessions with artists and hosts"
            },
            {
              icon: ShoppingBag,
              title: "Member Merch",
              description: "Exclusive merchandise and early access"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 hover:bg-white/20 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersPage;