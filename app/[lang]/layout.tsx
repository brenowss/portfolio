import { i18n } from "../../i18n-config";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body
        className={clsx(
          "bg-slate-900 bg-gradient-radial from-slate-900 via-slate-800 to-gray-900 bg-no-repeat leading-relaxed text-slate-400 antialiased selection:bg-purple-800 selection:text-white",
          inter.className
        )}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
