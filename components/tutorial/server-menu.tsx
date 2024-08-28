import { getMenuList, Group } from "@/lib/tutorial/menu-list";
import { ClientMenu } from "./client-menu";

interface ServerMenuProps {
  pathname: string;
  technologyId: string;
    isOpen: boolean;
}

export default async function ServerMenu({
  pathname,
  technologyId,
  isOpen
}: ServerMenuProps) {
  const menuList = await getMenuList(pathname, technologyId);
  return <ClientMenu menuList={menuList} isOpen={isOpen} />;
}
