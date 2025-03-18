import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Refund Policy | CodeSnippet",
  description: "Learn about CodeSnippet cancellation and refund policies.",
};

export default function RefundPolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="flex items-center gap-1">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cancellation & Refund Policy</h1>
          <p className="text-muted-foreground">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* No Refund for Opt-Outs */}
        <section id="no-refund" className="space-y-4">
          <h2 className="text-2xl font-semibold">1. No Refund for Opt-Outs</h2>
          <p>
            If you decide to opt out of your subscription, please note that the company will not issue any refunds. Once
            you have committed to a subscription and made the payment, it is considered final.
          </p>
          <p>
            In the event of an abrupt shutdown, CodeSnippet will not be obligated to provide refunds for any fees,
            subscriptions, or payments made by users. This includes, but is not limited to, payments for subscriptions,
            course fees, and any other paid services.
          </p>
          <p>
            We do not allow cancellations of subscriptions once they have been activated. This policy is in place to
            ensure fairness and consistency for all our users.
          </p>
        </section>

        {/* Liability Limitation */}
        <section id="liability" className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Liability Limitation</h2>
          <p>
            CodeSnippet will not be liable for any direct, indirect, incidental, consequential, or punitive damages
            arising out of the use or inability to use our services in the event of an abrupt shutdown. This limitation
            of liability applies to all users, including those with paid subscriptions.
          </p>
        </section>

        {/* Multiple IP Usage */}
        <section id="multiple-ip" className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Multiple IP Usage</h2>
          <p>
            Accounts that are found to be accessed from an excessive number of different IP addresses will be suspended
            without a refund. This measure is to prevent misuse and protect the integrity of our services.
          </p>
        </section>

        {/* Serious Actions for Blacklisted Accounts */}
        <section id="blacklisted" className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Serious Actions for Blacklisted Accounts</h2>
          <p>
            Accounts that are blacklisted due to violations of our terms and conditions will face serious consequences.
            These may include permanent suspension and further actions to prevent any future misuse.
          </p>
        </section>

        {/* Legal Actions */}
        <section id="legal-actions" className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Legal Actions</h2>
          <p>
            We reserve the right to pursue legal actions against accounts that have been blacklisted for serious
            violations. This includes, but is not limited to, fraud, abuse, or any other activities that harm the
            service or other users.
          </p>
        </section>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            For any questions regarding our refund policy, please contact us at{" "}
            <Link
              href="mailto:codesnippet003@gmail.com"
              className="text-primary hover:underline"
              aria-label="Contact us via email"
            >
              codesnippet003@gmail.com
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}