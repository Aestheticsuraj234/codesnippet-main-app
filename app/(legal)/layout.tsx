import { Footer } from "@/components/Global/Footer";
import { Navbar } from "../(root)/_components/navbar";

interface Props {
  children: React.ReactNode;
}
const LegalLayout = ({ children }: Props) => {
  return (
    <>
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <main className="my-32">{children}</main>
    
    </>
  );
};

export default LegalLayout;
