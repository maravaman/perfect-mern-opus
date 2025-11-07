const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Shipping & Delivery Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Digital Services Delivery</h2>
          <p className="text-muted-foreground mb-4">
            Knight21 primarily offers digital marketing and web development services. As such, our "delivery" is digital in nature and does not involve physical shipping.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Service Delivery Timeline</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Website Development:</strong> 2-6 weeks depending on project complexity</li>
            <li><strong>Logo Design:</strong> 3-7 business days with up to 3 revisions</li>
            <li><strong>Social Media Marketing:</strong> Ongoing service with daily/weekly deliverables</li>
            <li><strong>SEO Services:</strong> Initial setup within 1 week, ongoing optimization monthly</li>
            <li><strong>Content Creation:</strong> 3-5 business days per piece</li>
            <li><strong>Digital Marketing Courses:</strong> Instant access upon enrollment</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How You'll Receive Your Deliverables</h2>
          <p className="text-muted-foreground mb-4">
            All project deliverables will be provided through the following methods:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Email notifications with download links</li>
            <li>Secure cloud storage access (Google Drive, Dropbox, etc.)</li>
            <li>Direct access to websites/platforms created</li>
            <li>Online course platform access for educational content</li>
            <li>Project management dashboard for tracking progress</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Physical Materials (If Applicable)</h2>
          <p className="text-muted-foreground mb-4">
            In rare cases where physical materials are required (such as promotional materials or printed designs):
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Shipping charges will be communicated separately and agreed upon in advance</li>
            <li>Delivery time depends on your location (typically 3-7 business days within India)</li>
            <li>International shipping may take 10-15 business days</li>
            <li>Tracking information will be provided once the item is shipped</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Delays & Communication</h2>
          <p className="text-muted-foreground">
            We strive to meet all agreed-upon deadlines. If any delays are anticipated, we will:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Notify you immediately via email or phone</li>
            <li>Provide a revised delivery timeline</li>
            <li>Explain the reason for the delay</li>
            <li>Work to minimize any impact on your business</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Acceptance & Revisions</h2>
          <p className="text-muted-foreground mb-4">
            Upon delivery of digital services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>You will have 7 days to review and provide feedback</li>
            <li>Minor revisions are included as per the agreed scope</li>
            <li>Major changes may require additional time and cost</li>
            <li>Final approval must be provided in writing or email</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact for Delivery Issues</h2>
          <p className="text-muted-foreground mb-4">
            If you experience any issues with receiving your deliverables, please contact us immediately:
          </p>
          <ul className="list-none space-y-2 text-muted-foreground">
            <li><strong>Email:</strong> knight21digihub@gmail.com</li>
            <li><strong>Phone:</strong> +91 8187007475</li>
            <li><strong>Address:</strong> Near MSN Charities, Mahalaxmi Nagar, Jaganaikpur, Kakinada, 522003</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Questions?</h2>
          <p className="text-muted-foreground">
            If you have any questions about our shipping and delivery policy, please don't hesitate to reach out to us at knight21digihub@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
