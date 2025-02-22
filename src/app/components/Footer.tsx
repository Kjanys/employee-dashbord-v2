// src/app/components/Footer.tsx
'use client';
import { Footer } from '@gravity-ui/navigation';

export default function AppFooter() {
  return (
    <Footer
      className="page-footer mt-auto" // Добавим mt-auto для прижатия футера к низу
      withDivider={true}
      moreButtonTitle="Show more"
      copyright={`© ${new Date().getFullYear()} Pivo technologies`}
      logo={{
        text: 'Status Tracker',
      }}
      menuItems={[
        {
            text: 'Powered by pivo',
            href: '',
            target: 'blank',
        },
    ]}
    />
  );
}