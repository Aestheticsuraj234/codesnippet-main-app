interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-4xl font-semibold text-zinc-700 dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
    </div>
  );
};
