"use client";


import { useParams, useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";;
import { ProblemColumn, columns } from "./columns";
import { DataTable } from "@/components/Global/data-table";

interface ProblemClientProps {
  data: ProblemColumn[];
};

export const DsaProblemClient: React.FC<ProblemClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <> 
      <DataTable searchKey="problemTitle" columns={columns} data={data} />    
    </>
  );
};
