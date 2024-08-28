import ServerMenu from "./server-menu";

interface MenuWrapperProps{
    params: {
        technologyId: string
    },
    isOpen: boolean,
    pathname: string


}

export default function MenuWrapper({ params , isOpen  , pathname}: MenuWrapperProps) {

  return <ServerMenu pathname={pathname} technologyId={params.technologyId} isOpen={isOpen} />;
}
