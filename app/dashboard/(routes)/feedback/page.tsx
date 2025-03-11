import { Header } from '@/components/Global/header'
import React from 'react'
import AddFeedbackForm from './_components/add-feedback-form'

const Feedback = () => {
  return (
    <section className="px-4 py-4 flex flex-col h-screen">
          <Header
                title="Feedback and Suggestions"
                description="We value your feedback and suggestions."
              />
              <AddFeedbackForm />
    </section>
  )
}

export default Feedback