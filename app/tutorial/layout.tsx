import TutorialLayout from "@/components/tutorial/tutorial-layout";


export default function TutorialMainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <TutorialLayout>{children}</TutorialLayout>;
}
