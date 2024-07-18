import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      height={150}
      width={150}
      alt="logo"
      src="/logo.svg"
    />
  )
}