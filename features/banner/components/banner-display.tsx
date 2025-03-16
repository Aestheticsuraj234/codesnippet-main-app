import { Banner, type BannerProps } from "./banner";
import { getLiveBanner } from "../actions";
import { BannerStatus } from "@prisma/client";

export async function BannerDisplay() {
  const banner = await getLiveBanner() as { id: string; title: string; description: string; endDate: Date; status: BannerStatus; createdAt: Date; updatedAt: Date } | null;

  if (!banner) {
    return null;
  }

  return (
    <div
      className="sticky top-20 w-full z-50 bg-white shadow-md"
     
    >
      <Banner
        key={banner.id}
        id={banner.id}
        title={banner.title}
        description={banner.description}
        endDate={new Date(banner.endDate)}
      />
    </div>
  );
}