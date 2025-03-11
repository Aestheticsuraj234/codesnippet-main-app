import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type RefferalColumn = {
  name: string;
  image:string;
  email: string;
  createdAt: Date;
  referralType: string; // Add referralType field
};

export const columns: ColumnDef<RefferalColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
        <div className="flex flex-row justify-start items-center  gap-3">
        <Image
          src={
            row.original.image ||
            `https://avatar.iran.liara.run/username?username=${row.original.name}`
          }
          alt="user"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h2 className="inline-flex uppercase font-semibold truncate text-zinc-700 dark:text-zinc-100">
          {row.original.name}
        </h2>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
        {row.original.email}
      </h2>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Registered",
    cell: ({ row }) => (
      <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
        {row.original.createdAt.toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )}
      </h2>
    ),
  },
  {
    accessorKey: "referralType", // Add this line
    header: "Referral Type", // Add this line
    cell: ({ row }) => (
      <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
        {row.original.referralType || 'N/A'}
      </h2>
    ),
  },
];
