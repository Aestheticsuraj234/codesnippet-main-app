"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3, Trash2, CalendarIcon, Brain, NotebookPen, Youtube, StarIcon } from "lucide-react";
import { ContentStatus, DifficultyLevel } from "@prisma/client";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ProblemCheckbox from "./problem-solving-checkbox";
import { MarkedToggleButton } from "./markedToggle-btn";

export interface ProblemColumn {
  id: string;
  problemTitle: string;
  difficultyLevel: DifficultyLevel;
  problemLink?: string;
  articleLink?: string;
  youtubeLink?: string;
 markedForRevision: boolean;
 isSolved: boolean;
}

export const columns: ColumnDef<ProblemColumn>[] = [
  {
    accessorKey: "isSolved",
    header: ({ column }) => (
      <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
        Status
      </h2>
    ),
    cell: ({ row }) => (
        // TODO: MAKE IT A CHECK OR UNCHECK COMPONENT TO SAVE INTO DB
        <ProblemCheckbox checked={row.original.isSolved}  Probid={row.original.id}  />
    ),
  },
    {
        accessorKey: "problemTitle",
        header: ({ column }) => (
        <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
            Problem
        </h2>
        ),
        cell: ({ row }) => (
            <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
        {row.original.problemTitle}
      </h2>
        ),
    },
    {
        accessorKey: "difficultyLevel",
        header: ({ column }) => (
        <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
            Difficulty
        </h2>
        ),
        cell: ({ row }) => (
        <Badge
            variant={row.original.difficultyLevel}
        >
            {row.original.difficultyLevel}
        </Badge>
        ),
    },
    {
        accessorKey: "problemLink",
        header: ({ column }) => (
        <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
            Problem Link
        </h2>
        ),
        cell: ({ row }) => (
            <Link href={row.original.problemLink!} passHref>
            <Brain size={28} className="text-indigo-400 hover:underline" />
          </Link>
        ),
    },
    {
        accessorKey: "articleLink",
        header: ({ column }) => (
        <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
            Article Link
        </h2>
        ),
        cell: ({ row }) => (
            <Link href={row.original.articleLink!} passHref>
            <NotebookPen size={28} className="text-yellow-500 hover:underline" />
          </Link>
        ),
    },
    {
        accessorKey: "youtubeLink",
        header: ({ column }) => (
          <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
            YouTube Link
          </h2>
        ),
        cell: ({ row }) => (
          <Link href={row.original.youtubeLink!} passHref>
            <Youtube size={28} className="text-red-600 hover:underline" />
          </Link>
        ),
      },
      {
        accessorKey: "markedForRevision",
        header: ({ column }) => (
          <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
            Revision
          </h2>
        ),
        cell: ({ row }) => (
        //   TODO: ADD TOGGLE BUTTON TO MARK FOR REVISION
          <MarkedToggleButton markedForRevision={row.original.markedForRevision} id={row.original.id} />
        ),
      },
    

  
];
