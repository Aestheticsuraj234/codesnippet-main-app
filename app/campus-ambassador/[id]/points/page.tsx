import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PointCard from "./_components/point-card";
import { db } from "@/lib/db/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyStateComponent } from "@/components/Global/empty-state";

const REDEEM_AMOUNT = 200;

export default async function PointsAndEarnings(
  props: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const params = await props.params;
  const ambassador = await db.campusAmbassador.findUnique({
    where: {
      id: params.id,
    },
    select: {
      points: true,
      pointTransactions: {
        select: {
          transactionType: true,
          createdAt: true,
          reason: true,
        },
      },
    },
  });

  const transactions = await db.pointTransaction.findMany({
    where: {
      ambassadorId: params.id,
    },
    select: {
      transactionType: true,
      createdAt: true,
      reason: true,
      points: true,
      status: true,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Points & Earnings Dashboard</h1>

      {/* @ts-ignore */}
      <PointCard points={ambassador?.points} />

      {/* {redeemStatus && (
        <Card className="mb-8">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">💵 Redeemed ₹{REDEEM_AMOUNT}</h3>
              <p className="text-sm text-gray-500">Status: {redeemStatus}</p>
            </div>
            <p className="text-sm text-gray-500">UPI ID: user@upi</p>
          </CardContent>
        </Card>
      )} */}

      <Card className="bg-[#F3F4F6] border-[#DDE2EC] dark:bg-[#27272A] dark:border-[#27272A] ">
        <CardHeader>
          <CardTitle>Point History</CardTitle>
        </CardHeader>
       { 
        transactions?.length === 0 ?<EmptyStateComponent  title="No Points History" imageUrl="/empty-points-ca.svg" description={"Points shows after you are having successfull referal"} /> :( <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {transaction.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="flex items-center">
                    {transaction.points > 0 ? (
                      <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    {Math.abs(transaction.points)}
                  </TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>{transaction.reason}</TableCell>
                  <TableCell>
                    {
                      <Badge
                        variant={transaction.status}
                        className="
                    inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {transaction.status}
                      </Badge>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>)
       }
      </Card>
    </div>
  );
}
