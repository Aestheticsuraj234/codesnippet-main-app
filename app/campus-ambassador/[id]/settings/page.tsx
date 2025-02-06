import React from "react";
import { db } from "@/lib/db/db";
import SettingsForm from "./_components/settings-form";

const Settings = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const ambassador = await db.campusAmbassador.findUnique({
    where: {
      id: params.id,
    },
    select: {
      fullName: true,
      campusName: true,
      mobileNumber: true,
      upiId: true,
    },
  });

  if (!ambassador) {
    return (
      <div className="px-4 py-4 mt-5 flex flex-col">
        <p>Campus Ambassador not found.</p>
      </div>
    );
  }

  return (
    <div className='px-4 py-4 mt-5 flex flex-col'>
      <SettingsForm
        ambassador={ambassador}
      />
    </div>
  );
};

export default Settings;
