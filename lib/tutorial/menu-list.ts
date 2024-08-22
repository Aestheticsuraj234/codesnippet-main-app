import { GetAllTopicsByTechnologyId } from "@/action/tutorial";
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Folder,
  FolderArchive,
  FolderCheck,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon?: LucideIcon;
  submenus: Submenu[];
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export async function getMenuList(pathname: string, technologyId: any): Promise<Group[]> {
  // Fetch topics by technology ID
  const topics = await GetAllTopicsByTechnologyId(technologyId);

  // Transform topics into menu structure
  const contentsMenu = topics.map((topic) => ({
    href: `/topics/${topic.id}`, // Adjust the path according to your routing
    label: topic.title,
    active: pathname.includes(`/topics/${topic.id}`),
    icon: FolderCheck,
    submenus: topic.subTopics.map((subTopic) => ({
      href: `/topics/${topic.id}/subtopics/${subTopic.id}`, // Adjust the path according to your routing
      label: subTopic.title,
      active: pathname === `/topics/${topic.id}/subtopics/${subTopic.id}`,
    })),
  }));

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: contentsMenu,
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
