"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";;
import { RefferalColumn, columns } from "./columns";
import { DataTable } from "@/components/Global/data-table";

interface RefferalClientProps {
  data: RefferalColumn[];
};

export const RefferalClient: React.FC<RefferalClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <> 
      
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
     
     
    </>
  );
};
