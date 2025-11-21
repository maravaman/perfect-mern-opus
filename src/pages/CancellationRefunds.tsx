const CancellationRefunds = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Cancellation & Refunds Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Cancellation Policy</h2>
          <p className="text-muted-foreground mb-4">
            At Digi Hub, we understand that circumstances may change. Our cancellation policy is designed to be fair to both our clients and our team.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Services can be cancelled within 48 hours of order placement for a full refund</li>
            <li>After work has commenced, cancellation will be subject to a review of work completed</li>
            <li>Monthly service packages can be cancelled with 15 days notice</li>
            <li>Custom project cancellations will be evaluated on a case-by-case basis</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Refund Policy</h2>
          <p className="text-muted-foreground mb-4">
            We strive for 100% client satisfaction. If you're not satisfied with our services, we offer the following refund options:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Full Refund:</strong> Available if cancelled within 48 hours before any work begins</li>
            <li><strong>Partial Refund:</strong> Based on work completed if cancelled after project commencement</li>
            <li><strong>Monthly Services:</strong> Refund for unused portion of the month if cancelled with proper notice</li>
            <li><strong>Course Enrollments:</strong> Refund available within 7 days if less than 20% of content accessed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Refund Processing Time</h2>
          <p className="text-muted-foreground">
            Once your refund request is approved, please allow 7-10 business days for the refund to be processed. 
            The amount will be credited to the original payment method used during purchase.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Non-Refundable Services</h2>
          <p className="text-muted-foreground mb-4">
            The following services are non-refundable:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Completed projects that have been delivered and approved</li>
            <li>Domain registration and hosting fees paid to third parties</li>
            <li>Custom development work that has been completed to specifications</li>
            <li>Marketing campaigns that have already been executed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How to Request a Refund</h2>
          <p className="text-muted-foreground mb-4">
            To request a refund or cancellation, please contact us at:
          </p>
          <ul className="list-none space-y-2 text-muted-foreground">
            <li><strong>Email:</strong> knight21digihub@gmail.com</li>
            <li><strong>Phone:</strong> +91 8187007475</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Please include your order number and reason for cancellation in your request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about our cancellation and refunds policy, please contact us at knight21digihub@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default CancellationRefunds;
