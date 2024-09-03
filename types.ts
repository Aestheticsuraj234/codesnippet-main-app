import { Community, Member, User } from "@prisma/client";

export type CommunityWithMemberWithUser = Community & {
  members: (Member & { user: User })[];
};
