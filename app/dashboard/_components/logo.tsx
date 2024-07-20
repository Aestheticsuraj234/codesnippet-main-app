import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-2 ">
    <Image
      height={65}
      width={65}
      alt="logo"
      src="/logo-new.svg"
    />
    <span className="text-xl font-bold text-zinc-700 dark:text-white">
      SigmaCoders
    </span>
    </div>
  )
}