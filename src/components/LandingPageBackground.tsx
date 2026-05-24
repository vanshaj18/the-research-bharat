import Image from "next/image";

export default function LandingPageBackground() {
  return (
    <div className="site-page-bg pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Image
        src="/background_image.png"
        alt=""
        fill
        className="object-cover opacity-50"
        sizes="100vw"
        priority
      />
    </div>
  );
}
