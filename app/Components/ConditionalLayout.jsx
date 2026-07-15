'use client';

import { usePathname } from 'next/navigation';
import LayoutWrapper from './LayoutWrapper';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>
      <Footer />
    </>
  );
}
