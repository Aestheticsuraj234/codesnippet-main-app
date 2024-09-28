"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from "date-fns";
import { useModal } from "@/zustand/use-modal";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import toast from "react-hot-toast";

const MeetingModal = () => {
  const user = useCurrentUser();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]); // Manage available slots locally

  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "MEETING_OPEN";

  // Initialize available slots from the passed data
  useEffect(() => {
    if (data?.availableSlots) {
      setAvailableSlots(data.availableSlots);
    }
  }, [data]);

  const { price, id } = data;

  const dates = Array.from(
    new Set(availableSlots?.map((slot) => new Date(slot.date).toDateString()))
  ).map((dateStr) => new Date(dateStr));

  // Filter available times based on the selected date
  const availableTimes = selectedDate
    ? availableSlots
        .filter(
          (slot) =>
            new Date(slot.date).toDateString() ===
              selectedDate.toDateString() && !slot.isBooked
        )
        .map((slot) => format(new Date(slot.time), "HH:mm"))
    : [];

  useEffect(() => {
    if (selectedDate) {
      const availableTimes = availableSlots
        .filter(
          (slot) =>
            new Date(slot.date).toDateString() ===
              selectedDate.toDateString() && !slot.isBooked
        )
        .map((slot) => format(new Date(slot.time), "HH:mm"));

      setSelectedTime(availableTimes[0] || null);
    }
  }, [selectedDate, selectedTime]);

  const handleClose = () => {
    onClose();
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const createOrderId = async () => {
    try {
      const amount = price * 100; // Convert to the smallest currency unit
      const response = await fetch("/api/meeting-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a valid date and time.");
      return;
    }

    setIsPaymentLoading(true);

    try {
      const orderId: string = await createOrderId();

      const selectedSlot = availableSlots.find(
        (slot) =>
          new Date(slot.date).toDateString() === selectedDate?.toDateString() &&
          format(new Date(slot.time), "HH:mm") === selectedTime
      );

      if (!selectedSlot) {
        toast.error("Selected slot is no longer available.");
        setIsPaymentLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: "INR",
        name: "CodeSnippet",
        description: `Payment for Meeting at ${selectedTime} with price of ₹${price}.`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const paymentData = {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              userId: user?.id,
              selectedDate: selectedDate,
              selectedTime: selectedTime,
              availableSlotsId: selectedSlot.id,
              meetingId: id,
            };

            // Optimistic UI Update: Mark the slot as booked in the local state
            setAvailableSlots((prevSlots) =>
              prevSlots.map((slot) =>
                slot.id === selectedSlot.id
                  ? { ...slot, isBooked: true } // Optimistically update the slot
                  : slot
              )
            );

            const result = await fetch("/api/meeting-order/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(paymentData),
            });

            const res = await result.json();

            if (res.isOk) {
              toast.success("Payment successful");
              handleClose();
            } else {
              toast.error("Payment verification failed. Please try again.");
            }
          } catch (error) {
            toast.error("Payment verification error. Please contact support.");
            console.error(error);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#212121",
          mode: "dark",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        toast.error("Payment failed. Please try again.");
        console.error(response.error);
      });
      paymentObject.open();
    } catch (error) {
      toast.error("Error during payment initialization.");
      console.error("Payment Error: ", error);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#F3F4F6] border-[#DDE2EC] dark:bg-[#27272A] dark:border-[#27272A]">
        <DialogHeader>
          <DialogTitle className="text-[#1A1818] dark:text-[#ffffff]">
            Meeting Booking
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Select a Date</h3>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent className="-ml-2">
              {dates.map((date, index) => (
                <CarouselItem key={index} className="pl-2 basis-1/3">
                  <Card
                    className={`cursor-pointer transition-colors ${
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString()
                        ? "bg-[#08BD80] text-[#1A1818] dark:text-[#ffffff] "
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-2">
                      <span className="text-sm font-semibold">
                        {format(date, "EEE")}
                      </span>
                      <span className="text-2xl font-bold">
                        {format(date, "d")}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {selectedDate && (
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2">Available Times</h3>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={
                      selectedTime === time
                        ? "bg-[#08BD80] text-[#1A1818] dark:text-[#ffffff] "
                        : ""
                    }
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))
              ) : (
                <p className="col-span-3 text-center text-sm text-muted-foreground">
                  No available times for this date
                </p>
              )}
            </div>
          </div>
        )}
        <Button
          className="w-full bg-[#08BD80] text-[#1A1818] hover:bg-[#07a96f]"
          onClick={processPayment}
          disabled={!selectedDate || !selectedTime || isPaymentLoading}
        >
          {isPaymentLoading ? "Processing..." : `Pay ₹${price}`}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
