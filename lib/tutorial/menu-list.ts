import { GetAllTopicsByTechnologyId } from "@/action/tutorial";
import exp from "constants";
import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Folder,
} from "lucide-react";


type Submenu = {
  id: string
  href: string;
  label: string;
  active: boolean;
  done: boolean; // Already included from server-side
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export async function getMenuList(
  pathname: string,
  technologyId: any
): Promise<Group[]> {

  
  // Fetch topics by technology ID
  const topics = await GetAllTopicsByTechnologyId(technologyId);

  // re-fetch the done status of the subtopics

  const subTopics = topics.flatMap((topic) => topic.subTopics.map((subTopic) => subTopic.done));

  // Transform topics into menu structure
  const contentsMenu = topics.map((topic) => ({
    href: `/topics/${topic.id}`, // Adjust the path according to your routing
    label: topic.title,
    active: pathname.includes(`/topics/${topic.id}`),
    icon: Folder,
    submenus: topic.subTopics.map((subTopic) => ({
      id: subTopic.id,
      href: `/tutorial/${technologyId}/learn/${subTopic.id}`, // Adjust the path according to your routing
      label: subTopic.title,
      active: pathname === `/tutorial/${technologyId}/learn/${subTopic.id}`,
      done: subTopic.done, // Directly use the 'done' status from the server
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


