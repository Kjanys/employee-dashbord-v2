"use client";
import { Footer } from "@gravity-ui/navigation";

export default function AppFooter() {
  return (
    <Footer
      className="page-footer mt-auto"
      withDivider={true}
      moreButtonTitle="Show more"
      copyright={`© ${new Date().getFullYear()} Pivo technologies`}
      logo={{
        text: "Status Tracker",
      }}
      menuItems={[
        {
          text: "Powered by pivo",
          href: "",
          target: "blank",
        },
      ]}
    />
  );
}
