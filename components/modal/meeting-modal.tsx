"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { format } from 'date-fns'
import { useModal } from '@/zustand/use-modal'

const MeetingModal = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === "MEETING_OPEN"
  
  const { availableSlots } = data

  // Extract unique dates from availableSlots
  const dates = Array.from(
    new Set(availableSlots.map(slot => new Date(slot.date).toDateString()))
  ).map(dateStr => new Date(dateStr))

  // Filter available times based on the selected date
  const availableTimes = selectedDate
    ? availableSlots
        .filter(slot => new Date(slot.date).toDateString() === selectedDate.toDateString() && !slot.isBooked)
        .map(slot => format(new Date(slot.time), 'HH:mm'))
    : []

  const handleClose = () => {
    onClose()
    setSelectedDate(null)
    setSelectedTime(null)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Meeting Booking</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Select a Date</h3>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent className="-ml-2">
              {dates.map((date, index) => (
                <CarouselItem key={index} className="pl-2 basis-1/3">
                  <Card 
                    className={`cursor-pointer transition-colors ${
                      selectedDate && date.toDateString() === selectedDate.toDateString()
                        ? 'bg-[#08BD80] text-[#1A1818] dark:text-[#ffffff] '
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-2">
                      <span className="text-sm font-semibold">{format(date, 'EEE')}</span>
                      <span className="text-2xl font-bold">{format(date, 'd')}</span>
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
                    className={selectedTime === time ? "bg-[#08BD80] text-[#1A1818] dark:text-[#ffffff] " : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))
              ) : (
                <p className="col-span-3 text-center text-sm text-muted-foreground">No available times for this date</p>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button 
          variant={"brand"}
            disabled={!selectedDate || !selectedTime} 
            onClick={() => {
              console.log('Booking:', { date: selectedDate, time: selectedTime })
              handleClose()
            }}
          >
            Book Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
