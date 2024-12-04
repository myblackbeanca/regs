import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, useTexture } from '@react-three/drei';
import { Play } from 'lucide-react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const fallbackImage = "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/regslogo.jpg";

export const HexagonMesh = React.memo(({ imageUrl, isPlaying }) => {
  const meshRef = useRef(null);
  const [textureUrl, setTextureUrl] = useState(imageUrl);
  
  useEffect(() => {
    const img = new Image();
    img.onerror = () => {
      setTextureUrl(fallbackImage);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const texture = useTexture(textureUrl);

  const { shape, geometry } = useMemo(() => {
    const hexSize = 1;
    const hexShape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 2;
      const x = hexSize * Math.cos(angle);
      const y = hexSize * Math.sin(angle);
      i === 0 ? hexShape.moveTo(x, y) : hexShape.lineTo(x, y);
    }
    hexShape.closePath();

    const hexGeometry = new THREE.ExtrudeGeometry(hexShape, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3
    });

    const pos = hexGeometry.attributes.position;
    const uvs = new Float32Array(pos.count * 2);
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.array[i * 3];
      const y = pos.array[i * 3 + 1];
      
      uvs[i * 2] = (x + hexSize) / (1.97 * hexSize);
      uvs[i * 2 + 1] = (y + hexSize) / (2.02 * hexSize);
    }
    
    hexGeometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    return { shape: hexShape, geometry: hexGeometry };
  }, []);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (isPlaying && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[0, 0, 0]}>
      <meshStandardMaterial
        map={texture}
        metalness={0.3}
        roughness={0.4}
        envMapIntensity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});

const MixtapeCard = React.memo(({ mixtape }) => {
  return (
    <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-neutral-900 rounded-xl overflow-hidden shadow-xl group transform transition-transform hover:scale-[1.02]">
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
        <Suspense fallback={null}>
          <HexagonMesh
            imageUrl={mixtape.imageUrl}
            isPlaying={true}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white capitalize mb-2">
              {mixtape.name}
            </h3>
            <a
              href={mixtape.shortenedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Play className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

interface MixtapeGridProps {
  mixtapes: Array<{
    name: string;
    imageUrl: string;
    shortenedLink: string;
  }>;
  singleDisplay?: boolean;
}

const MixtapeGrid = ({ mixtapes, singleDisplay = false }: MixtapeGridProps) => {
  return (
    <section id="featured-mixtapes" className={singleDisplay ? "" : "py-20 bg-neutral-800"}>
      <div className="max-w-7xl mx-auto px-6">
        {!singleDisplay && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Mixtapes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our curated collection of exclusive mixtapes
            </p>
          </div>
        )}
        <div className={`grid grid-cols-1 ${singleDisplay ? '' : 'md:grid-cols-2 xl:grid-cols-3'} gap-16`}>
          {mixtapes.map((mixtape) => (
            <MixtapeCard key={mixtape.name} mixtape={mixtape} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixtapeGrid;