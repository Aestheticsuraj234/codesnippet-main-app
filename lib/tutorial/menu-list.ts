import { GetAllTopicsByTechnologyId } from "@/action/tutorial";
import exp from "constants";
import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Folder,
  Boxes,
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
          href: "/dashboard/tutorials",
          label: "Tutorials",
          active: pathname.includes("/dashboard/tutorials"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/discussion",
          label: "Discussion",
          active: pathname.includes("/discussion"),
          icon: Boxes,
          submenus: [],
        }
      ],
    },
    {
      groupLabel: "Contents",
      menus: contentsMenu,
    },
  ];
}


