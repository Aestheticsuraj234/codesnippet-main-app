import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

import { Community, Member, User } from "@prisma/client";

export type CommunityWithMemberWithUser = Community & {
  members: (Member & { user: User })[];
};


export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};