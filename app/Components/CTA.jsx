import Image from 'next/image';

export default function CTA() {
  return (
    <div style={{ marginBottom: '60px', width: '100%' }}>
      <Image
        src="/AR Cta.png" // Space ki jagah hyphens (-) use karein
        alt="CTA section"
        width={1920} // Apni image ki original width yahan likhein
        height={400} // Apni image ki original height yahan likhein
        style={{ 
          width: '100%', 
          height: 'auto' // Ye line lazmi hai taake image distort na ho
        }}
      />
    </div>
  );
}