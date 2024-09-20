"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { askRedeem } from '@/action/campus-ambassador';

interface Props {
    points: number;
}

const PointCard = ({ points }: Props) => {
    const [isRedeeming, setIsRedeeming] = useState(false);  // To disable button when redeeming
    const MAX_POINTS = 250;
    const REDEEM_AMOUNT = 200;
    const params = useParams();

    const onAskRedeem = async () => {
       try {
        setIsRedeeming(true);
        const response = await askRedeem(params?.id as string)
        console.log(response)
        toast.success("Redeem request sent successfully");
       } catch (error) {
        console.error("Error asking for redeem:", error);
        toast.error("Error asking for redeem");
       }finally{
        setIsRedeeming(false);
       }
    };

    return (
        <Card className="mb-8 bg-[#F3F4F6] border-[#DDE2EC] dark:bg-[#27272A] dark:border-[#27272A]">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
                    Your Points
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold mb-2">{points} points</div>
                <Progress value={(points / MAX_POINTS) * 100} className="mb-4" />
                <div className="text-sm text-gray-500 mb-4">{points} / {MAX_POINTS} points</div>
                {points >= MAX_POINTS && (
                    <Button onClick={onAskRedeem} disabled={isRedeeming}>
                        {isRedeeming ? 'Processing...' : `Ask For Redeem ₹${REDEEM_AMOUNT}`}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default PointCard;
