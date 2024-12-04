import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { HexagonMesh } from '../MixtapeGrid';
import { Play, ExternalLink } from 'lucide-react';

interface Mixtape {
  name: string;
  imageUrl: string;
  shortenedLink: string;
}

const mixtapes: Mixtape[] = [
  {
    name: "reg's eclectic",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-5de45442-f132-48a9-ac48-e8c0ce109b84?alt=media&token=4614cda2-e94c-466d-b7be-47d2c00794cf",
    shortenedLink: "https://go.minyvinyl.com/regeclec"
  },
  {
    name: "ksmr flow",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-ee61ea4a-eddd-4c3c-9a76-39d790938ef5?alt=media&token=edcc7e23-43aa-4461-858b-1b5388683615",
    shortenedLink: "https://go.minyvinyl.com/kshmrmix"
  },
  {
    name: "for the culture: sept",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-9e9b48ca-b7df-4169-99cd-7a4ded9f1b3f?alt=media&token=187baa9a-4013-4624-8718-6bff6ed3ed67",
    shortenedLink: "https://go.minyvinyl.com/fortheculture"
  }
];

const MixtapeCard: React.FC<{ mixtape: Mixtape }> = ({ mixtape }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative h-[400px] bg-neutral-800 rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas 
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        shadows 
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3]} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.25}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <Environment preset="studio" />
        <HexagonMesh imageUrl={mixtape.imageUrl} isPlaying={isHovered} />
      </Canvas>

      <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-xl font-bold text-white mb-4 capitalize">{mixtape.name}</h3>
        <div className="flex gap-4">
          <button className="btn btn-primary flex items-center gap-2">
            <Play className="w-4 h-4" />
            Play
          </button>
          <a
            href={mixtape.shortenedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </a>
        </div>
      </div>
    </div>
  );
};

const MixtapeViewer: React.FC = () => {
  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-white mb-8">Featured Mixtapes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mixtapes.map((mixtape, index) => (
          <MixtapeCard key={index} mixtape={mixtape} />
        ))}
      </div>
    </div>
  );
};

export default MixtapeViewer;