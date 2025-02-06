"use client";

import React, { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/action/auth/new-verification";

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { FormError } from "../Global/Froms/FormError";
import { FormSuccess } from "../Global/Froms/FormSuccess";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams?.get("token");

  const onSubmit = useCallback(() => {

    if(success || error) return;

    if (!token) {
      setError("Invalid Token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((error) => {
        console.log(error.message);
        setError("Something went wrong");
      });
  }, [token , success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming Your Verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex  items-center w-full justify-center">
        {(!success && !error) && <BeatLoader color="#03DC7A" /> }
        <FormSuccess message={success} />
        {!success &&  <FormError message={error} />}
       
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
