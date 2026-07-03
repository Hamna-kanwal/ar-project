import Image from 'next/image';

// Components/Cta.js mein ye change karein
export default function CTA() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '400px',
      marginBottom: '60px'
    }}>
      <Image
        src="/AR Cta.png" // Filename mein space na rakhein (cta-section.jpg behtar hai)
        alt="CTA section"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}