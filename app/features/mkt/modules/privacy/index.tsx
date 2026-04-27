export default function Privacy() {
  const h2Style: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 600,
    marginTop: "24px",
    marginBottom: "16px",
  };

  const pStyle: React.CSSProperties = {
    marginTop: "16px",
    lineHeight: 1.8,
  };

  const ulStyle: React.CSSProperties = {
    marginTop: "8px",
    paddingLeft: "24px",
    lineHeight: 1.8,
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 24px 48px" }}>
      <header style={{ textAlign: "center", padding: "24px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 600 }}>Privacy Policy</h1>
      </header>

      <main
        style={{
          margin: "32px auto",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <h2 style={h2Style}>1. Information We Collect</h2>
        <p style={pStyle}>We may collect the following types of information:</p>
        <ul style={ulStyle}>
          <li>Personal Identification Information: Name, email address, phone number, etc.</li>
          <li>Usage Data: Time of visit, page views, device information, etc.</li>
          <li>Cookies and Tracking Technologies: Used to enhance user experience.</li>
        </ul>

        <h2 style={h2Style}>2. How We Use Your Information</h2>
        <p style={pStyle}>The information we collect is used for the following purposes:</p>
        <ul style={ulStyle}>
          <li>To provide and improve our services.</li>
          <li>
            To communicate with you, including sending notifications or responding to queries.
          </li>
          <li>To analyze website usage and help improve website content and functionality.</li>
        </ul>

        <h2 style={h2Style}>3. How We Protect Your Information</h2>
        <p style={pStyle}>
          We implement various security measures to protect your personal information, including
          encryption and access controls. However, please note that no method of data transmission
          over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 style={h2Style}>4. Information Sharing and Disclosure</h2>
        <p style={pStyle}>
          We will not sell your personal information to third parties. However, we may disclose your
          information in the following circumstances:
        </p>
        <ul style={ulStyle}>
          <li>To comply with legal obligations or respond to government requests.</li>
          <li>To protect our legal rights or the safety of our users.</li>
          <li>To share with service providers that help us run our business.</li>
        </ul>

        <h2 style={h2Style}>5. Data Retention</h2>
        <p style={pStyle}>
          We will retain your information for as long as necessary to fulfill the purposes outlined
          in this Privacy Policy, or as required by law.
        </p>

        <h2 style={h2Style}>6. Your Rights</h2>
        <p style={pStyle}>
          Depending on your jurisdiction, you may have the right to access, correct, or delete your
          personal information. If you wish to exercise these rights, please contact us.
        </p>

        <h2 style={h2Style}>7. Updates and Changes</h2>
        <p style={pStyle}>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated &quot;Effective Date.&quot;
        </p>

        <h2 style={h2Style}>8. Contact Us</h2>
        <p style={pStyle}>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p style={{ ...pStyle, marginTop: "8px" }}>Email: privacy@example.com</p>
      </main>
    </div>
  );
}
