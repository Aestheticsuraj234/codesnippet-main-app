import Image from "next/image";

interface EmptyStateComponentProps{
    title: string;
    description: string;
    imageUrl: string;
}


export const EmptyStateComponent: React.FC<EmptyStateComponentProps> = ({title, description, imageUrl}) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 mx-4 mb-10">
            <Image src={imageUrl || "/empty-steps.svg"} alt="empty state" className="object-contain" width={350} height={350} />
            <h2 className="text-2xl font-bold text-zinc-600 dark:text-zinc-200  mt-4">{title}</h2>
            <p className="text-center mt-2 font-semibold text-zinc-500 dark:text-zinc-100">{description}</p>
        </div>
    )
}