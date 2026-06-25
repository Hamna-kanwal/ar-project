import Image from 'next/image';

// Components/Cta.js mein ye change karein
export function CTA() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '400px',
      marginBottom: '60px' // Yahan 100vh ki jagah fixed height dein
    }}>
      <Image
        src="/cta section.jpg" // Filename mein space na rakhein (cta-section.jpg behtar hai)
        alt="CTA section"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}