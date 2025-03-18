import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | CodeSnippet",
  description: "Learn about how CodeSnippet collects, uses, and protects your personal information.",
}

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <section id="introduction" className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to CodeSnippet. We are committed to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy outlines how we collect, use, and protect your data.
          </p>
        </section>

        <section id="information-we-collect" className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>

          <div className="pl-4 space-y-4">
            <div>
              <h3 className="text-xl font-medium">a. Personal Information:</h3>
              <p>
                When you register for an account, subscribe to our services, or contact us, we may collect personal
                information such as your name, email address, phone number, and payment details.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">b. Usage Data:</h3>
              <p>
                We collect information on how you access and use the CodeSnippet website, including your IP address,
                browser type, pages visited, time spent on pages, and other usage statistics.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">c. Cookies:</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain
                information. You can control the use of cookies at the individual browser level.
              </p>
            </div>
          </div>
        </section>

        <section id="how-we-use-information" className="space-y-4">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>

          <div className="pl-4 space-y-4">
            <div>
              <h3 className="text-xl font-medium">a. To Provide and Maintain Our Services:</h3>
              <p>
                We use your personal information to create and manage your account, provide customer support, and
                process transactions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">b. To Improve Our Services:</h3>
              <p>Usage data helps us understand how our services are being used and allows us to make improvements.</p>
            </div>

            <div>
              <h3 className="text-xl font-medium">c. To Communicate with You:</h3>
              <p>
                We may use your information to send newsletters, promotional materials, and other information that may
                be of interest to you. You can opt out of these communications at any time by following the unsubscribe
                link in the emails or by contacting us at
                <Link href="mailto:codesnippet003@gmail.com" className="text-primary hover:underline">
                  {" "}
                  codesnippet003@gmail.com
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">d. To Enforce Our Terms:</h3>
              <p>
                We use your information to enforce our terms and conditions, including detecting and preventing fraud or
                other unauthorized activities.
              </p>
            </div>
          </div>
        </section>

        <section id="sharing-information" className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>

          <div className="pl-4 space-y-4">
            <div>
              <h3 className="text-xl font-medium">a. Third-Party Service Providers:</h3>
              <p>
                We may share your information with third-party service providers who perform services on our behalf,
                such as payment processing, data analysis, email delivery, hosting services, and customer service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">b. Legal Requirements:</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests by public
                authorities (e.g., a court or a government agency).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">c. Business Transfers:</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your personal information may be transferred
                to the new entity.
              </p>
            </div>
          </div>
        </section>

        <section id="data-security" className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. However, no
            method of transmission over the internet or electronic storage is 100% secure. While we strive to use
            commercially acceptable means to protect your personal information, we cannot guarantee its absolute
            security.
          </p>
        </section>

        <section id="data-retention" className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Data Retention</h2>
          <p>
            We will retain your personal information only for as long as necessary to fulfill the purposes for which it
            was collected or to comply with legal obligations.
          </p>
        </section>

        <section id="your-rights" className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Your Rights</h2>

          <div className="pl-4 space-y-4">
            <div>
              <h3 className="text-xl font-medium">a. Access and Update:</h3>
              <p>
                You have the right to access and update your personal information. You can do this through your account
                settings or by contacting us at
                <Link href="mailto:codesnippet003@gmail.com" className="text-primary hover:underline">
                  {" "}
                  codesnippet003@gmail.com
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">b. Deletion:</h3>
              <p>
                You have the right to request the deletion of your personal information. We will comply with your
                request, subject to certain exceptions prescribed by law.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium">c. Opt-Out:</h3>
              <p>
                You have the right to opt-out of receiving promotional communications from us. You can do this by
                following the unsubscribe link in the emails or by contacting us at
                <Link href="mailto:codesnippet003@gmail.com" className="text-primary hover:underline">
                  {" "}
                  codesnippet003@gmail.com
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section id="childrens-privacy" className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Children Privacy</h2>
          <p>
            Our services are not intended for use by individuals under the age of 18. We do not knowingly collect
            personal information from children under 18. If you become aware that a child has provided us with personal
            information, please contact us, and we will take steps to remove such information and terminate the child
            account.
          </p>
        </section>

        <section id="changes-to-policy" className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section id="contact-us" className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at
            <Link href="mailto:codesnippet003@gmail.com" className="text-primary hover:underline">
              {" "}
              codesnippet003@gmail.com
            </Link>
            .
          </p>
        </section>

        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            By using CodeSnippet services, you acknowledge that you have read and understand this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}

