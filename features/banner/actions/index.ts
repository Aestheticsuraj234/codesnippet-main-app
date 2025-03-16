
import { db } from "@/lib/db/db"

export async function getLiveBanner() {
  try {
    const banners = await db.banner.findFirst({
      where: {
        status: "LIVE",
        endDate: {
          gte: new Date(), // Only fetch banners that haven't expired
        },
      },
    })

    return banners
  } catch (error) {
    console.error("Error fetching live banners:", error)
    return []
  }
}