import React from 'react';
import { Clock, Calendar, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const djs = [
  {
    name: "THE MORNING BLEND",
    schedule: "Monday – Friday",
    time: "6AM – 10AM",
    image: "https://bhammountainradio.com/img/reg-will-morning-blend.jpg",
    description: "Start your day with the perfect blend of music and conversation"
  },
  {
    name: "DRU",
    schedule: "Monday – Friday",
    time: "10AM – 2PM",
    image: "https://bhammountainradio.com/img/dru-hair.jpg",
    description: "Your midday music companion"
  },
  {
    name: "JOHN D",
    schedule: "Monday – Friday",
    time: "2PM – 6PM",
    image: "https://bhammountainradio.com/img/john-d-1.jpg",
    description: "Bringing you the afternoon drive soundtrack"
  },
  {
    name: "MICHAEL",
    schedule: "Saturday",
    time: "2PM – 6PM",
    image: "https://bhammountainradio.com/img/Michael.jpg",
    description: "Your weekend music curator"
  }
];

const DJCard = ({ dj }: { dj: typeof djs[0] }) => {
  const navigate = useNavigate();

  const handleListenLive = () => {
    navigate('/live');
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-neutral-800 transition-transform hover:scale-[1.02]">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={dj.image}
          alt={dj.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute bottom-0 p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white">{dj.name}</h3>
          <p className="text-gray-300">{dj.description}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400">
              <Calendar className="w-4 h-4" />
              <span>{dj.schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <Clock className="w-4 h-4" />
              <span>{dj.time}</span>
            </div>
          </div>
          <button 
            onClick={handleListenLive} 
            className="flex items-center gap-2 btn btn-primary mt-4"
          >
            <Headphones className="w-4 h-4" />
            Listen Live
          </button>
        </div>
      </div>
    </div>
  );
};

const DJSection = () => {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our DJs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The voices and personalities that bring Reg's Coffee House to life every day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {djs.map((dj) => (
            <DJCard key={dj.name} dj={dj} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DJSection;