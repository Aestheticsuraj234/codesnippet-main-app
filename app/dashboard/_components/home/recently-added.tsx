import { Card, CardContent } from "@/components/ui/card";

export interface RecentlyAddedProps {
  Date: string;
  Category: string;
  Title: string;
  Description: string;
}

export const RecentlyAdded = ({
  Date,
  Category,
  Title,
  Description,
}: RecentlyAddedProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="inline-block rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-primary-foreground">
            {Category}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {Date}
          </div>
        </div>
        <h3 className="text-lg font-bold mt-2">{Title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{Description}</p>
      </CardContent>
    </Card>
  );
};
