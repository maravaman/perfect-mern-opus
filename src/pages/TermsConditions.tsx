export default function TermsConditions() {
  return (
    <div className="font-outfit">
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p>By accessing and using Knight21's services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Services</h2>
                <p>Knight21 provides digital marketing services including but not limited to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Website design and development</li>
                  <li>Search Engine Optimization (SEO)</li>
                  <li>Google Ads management</li>
                  <li>Social media marketing</li>
                  <li>Content marketing</li>
                  <li>Mobile app development</li>
                  <li>Digital marketing training</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is due as per the agreed payment schedule</li>
                  <li>All prices are in Indian Rupees (INR) and inclusive of applicable taxes</li>
                  <li>Refunds are subject to our refund policy</li>
                  <li>Late payments may result in service suspension</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Client Responsibilities</h2>
                <p>As a client, you agree to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Respond to communications in a timely manner</li>
                  <li>Provide necessary access and materials</li>
                  <li>Make payments according to agreed terms</li>
                  <li>Review and approve deliverables promptly</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
                <p>Upon full payment, you will own the rights to the final deliverables. However, Knight21 retains the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Display work in our portfolio</li>
                  <li>Use as case studies</li>
                  <li>Reference in marketing materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Confidentiality</h2>
                <p>We respect the confidentiality of your business information and will not disclose it to third parties without your consent, except as required by law.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <p>Knight21 shall not be liable for any indirect, incidental, special, or consequential damages arising out of the use of our services.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Termination</h2>
                <p>Either party may terminate services with written notice. Upon termination, you will be billed for work completed up to the termination date.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Modifications</h2>
                <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Information</h2>
                <p>For questions about these Terms and Conditions, contact us:</p>
                <ul className="list-none mt-2 space-y-2">
                  <li>Email: knight21digihub@gmail.com</li>
                  <li>Phone: +91 8187007475</li>
                  <li>Address: Near MSN Charities, Mahalaxmi Nagar, Jaganaikpur, Kakinada, 522003</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
