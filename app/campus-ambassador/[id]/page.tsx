import { getCampusAmbassadorRefferalsById } from '@/action/campus-ambassador';
import { Header } from '@/components/Global/header';
import { currentUser } from '@/lib/auth/data/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { InfoCard } from '../_components/overview/info-card';
import { Share2, Trophy } from 'lucide-react';
import ReferalCode from '../_components/overview/referal-codeinput';

const CampusAmbassadorIdPage = async({ params }: { params: { id: string } }) => {

  const user = await currentUser();

  if (!user) {
    return redirect('/')
  }
  
  const overviewData = await getCampusAmbassadorRefferalsById(params.id);

  return (
    <main className="px-4 py-4 flex flex-col">
      {/* Header and Referral Code */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-6">
        <Header 
          title={`Hey👋 ${overviewData?.fullName}!`}
          description='Here are your referrals overview and stats.'
        />
        <div className="flex-1 lg:flex-none">
          <ReferalCode overviewData={overviewData} />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2 mt-10 mx-10 mb-5">
        <InfoCard
          Icon={Trophy}
          backgroundColor="#FFD700"
          iconHexColor="#9b731e"
          title="Total Points"
          total={overviewData?.points!}
        />
        <InfoCard
          Icon={Share2}
          backgroundColor="#FF6347"
          iconHexColor="#9b3a2a"
          title="Total Referrals"
          total={overviewData?._count.referrals!}
        />
      </div>
    </main>
  )
}

export default CampusAmbassadorIdPage;
