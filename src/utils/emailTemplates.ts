export interface EmailTemplateProps {
  title: string;
  previewText?: string;
  contentHtml: string;
}

export function generateEmailTemplate({ title, previewText, contentHtml }: EmailTemplateProps): string {
  // Brand Colors
  const colors = {
    bgLight: '#f6f8fb', // Whitish blue background
    ink: '#0f1120',     // Dark ink
    accent: '#2563eb',  // Blue
    white: '#ffffff',
    text: '#334155',
    textMuted: '#64748b'
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: ${colors.bgLight};
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: ${colors.bgLight};
      padding: 60px 0;
    }
    .main {
      background-color: ${colors.white};
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(15, 17, 32, 0.06);
    }
    .header {
      background-color: ${colors.ink};
      padding: 40px 30px;
      text-align: center;
    }
    .content {
      padding: 50px 40px;
      color: ${colors.text};
      font-size: 16px;
      line-height: 1.6;
    }
    .content h1, .content h2 {
      font-family: Georgia, "Times New Roman", serif;
      color: ${colors.ink};
      font-weight: normal;
      margin-top: 0;
    }
    .content h2 {
      font-size: 32px;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }
    .content h3 {
      font-size: 13px;
      margin-bottom: 12px;
      margin-top: 32px;
      color: ${colors.accent};
      font-weight: bold;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .content p {
      margin: 0 0 16px;
    }
    .content ul {
      margin: 0 0 24px;
      padding-left: 24px;
    }
    .content li {
      margin-bottom: 8px;
    }
    .content strong {
      color: ${colors.ink};
    }
    .footer {
      background-color: ${colors.ink};
      padding: 40px 30px;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;
      letter-spacing: 0.02em;
    }
    .footer p {
      margin: 0 0 8px;
    }
    .footer-logo {
      margin-bottom: 24px;
      opacity: 0.9;
    }
    @media screen and (max-width: 600px) {
      .wrapper { padding: 20px 10px; }
      .content { padding: 30px 20px; }
      .main { border-radius: 12px; }
      .content h2 { font-size: 26px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!--[if (gte mso 9)|(IE)]>
    <table width="600" align="center" style="border-spacing:0;font-family:sans-serif;color:#333333;" >
    <tr>
    <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
    <![endif]-->
    <table class="main" align="center" width="100%" style="max-width: 600px; margin: 0 auto;">
      <!-- HEADER -->
      <tr>
        <td class="header">
          <!-- Note: Assuming public/genie-logo.png is accessible via this domain -->
          <img src="https://geniedevstudios.com/genie-logo.png" width="140" alt="Genie Dev Studios" style="max-width: 100%; height: auto;" />
        </td>
      </tr>
      
      <!-- BODY -->
      <tr>
        <td class="content">
          ${contentHtml}
        </td>
      </tr>
      
      <!-- FOOTER -->
      <tr>
        <td class="footer">
          <img class="footer-logo" src="https://geniedevstudios.com/genie-logo.png" width="60" alt="Genie Dev Studios" style="max-width: 100%; height: auto;" />
          <p>Genie Dev Studios</p>
          <p>Building high-performance web and mobile solutions.</p>
        </td>
      </tr>
    </table>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </div>
</body>
</html>
  `;
}
