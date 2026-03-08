package com.casainterior.backend.service.impl;

import com.casainterior.backend.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * Sends branded HTML confirmation emails asynchronously.
 * Failures are logged but never propagated — a failed email must never
 * prevent an inquiry from being saved.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from-address}")
    private String fromAddress;

    @Value("${app.mail.from-name}")
    private String fromName;

    @Override
    @Async("emailExecutor")
    public void sendInquiryConfirmation(String toEmail, String customerName, String projectType) {
        log.warn("[EMAIL-DIAG] Async email method entered for {}", toEmail);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromAddress, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Thank You for Your Inquiry — Casa Interior");
            helper.setText(buildHtmlBody(customerName, projectType), true);

            mailSender.send(message);
            log.warn("[EMAIL-DIAG] Inquiry confirmation email SENT to {}", toEmail);
        } catch (MessagingException e) {
            log.error("[EMAIL-DIAG] Failed to send email to {}: {}", toEmail, e.getMessage(), e);
        } catch (Exception e) {
            log.error("[EMAIL-DIAG] Unexpected error sending email to {}: {}", toEmail, e.getMessage(), e);
        }
    }

    private String buildHtmlBody(String customerName, String projectType) {
        String projectDetail = StringUtils.hasText(projectType)
                ? "<p style=\"margin:0 0 8px;color:#b8a88a;font-size:14px;\">Project Type: <strong style=\"color:#e8d5b7;\">"
                        + escapeHtml(projectType) + "</strong></p>"
                : "";

        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Casa Interior — Inquiry Confirmation</title>
                </head>
                <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
                <tr><td align="center" style="padding:40px 20px;">

                <!-- Container -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);">

                <!-- Header -->
                <tr>
                <td style="background:linear-gradient(135deg,#1a1510 0%%,#2a2015 50%%,#1a1510 100%%);padding:48px 40px;text-align:center;border-bottom:1px solid #333;">
                    <h1 style="margin:0;font-size:32px;font-weight:300;letter-spacing:6px;color:#d4af37;text-transform:uppercase;">Casa Interior</h1>
                    <p style="margin:8px 0 0;font-size:12px;letter-spacing:4px;color:#8a7a5a;text-transform:uppercase;">Luxury Interior Design</p>
                </td>
                </tr>

                <!-- Body -->
                <tr>
                <td style="padding:48px 40px;">
                    <h2 style="margin:0 0 24px;font-size:22px;font-weight:400;color:#e8d5b7;">Dear %s,</h2>

                    <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#999;">
                        Thank you for sharing your interest in <strong style="color:#d4af37;">Casa Interior</strong>.
                        We have received your inquiry and our design team is reviewing your requirements.
                    </p>

                    <!-- Project Detail Card -->
                    <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                    <tr>
                    <td style="background-color:#111;border-left:3px solid #d4af37;border-radius:0 8px 8px 0;padding:20px 24px;">
                        <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#666;text-transform:uppercase;">Your Inquiry Details</p>
                        %s
                        <p style="margin:0;color:#b8a88a;font-size:14px;">Status: <strong style="color:#d4af37;">Received ✓</strong></p>
                    </td>
                    </tr>
                    </table>

                    <p style="margin:24px 0 0;font-size:15px;line-height:1.8;color:#999;">
                        A member of our team will reach out to you within <strong style="color:#e8d5b7;">24–48 hours</strong>
                        to discuss how we can bring your vision to life.
                    </p>
                </td>
                </tr>

                <!-- Divider -->
                <tr>
                <td style="padding:0 40px;">
                    <hr style="border:none;border-top:1px solid #2a2a2a;margin:0;">
                </td>
                </tr>

                <!-- Footer -->
                <tr>
                <td style="padding:32px 40px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:13px;color:#666;">
                        <strong style="color:#999;">Casa Interior</strong> — Crafting Timeless Spaces
                    </p>
                    <p style="margin:0 0 4px;font-size:12px;color:#555;">
                        ✉ contact@casainterior.in &nbsp;|&nbsp; ☎ +91-XXXXX-XXXXX
                    </p>
                    <p style="margin:16px 0 0;font-size:11px;color:#444;">
                        This is an automated confirmation. Please do not reply to this email.
                    </p>
                </td>
                </tr>

                </table>
                <!-- /Container -->

                </td></tr>
                </table>
                </body>
                </html>
                """
                .formatted(escapeHtml(customerName), projectDetail);
    }

    /**
     * Basic HTML entity escaping to prevent XSS in email content.
     */
    private String escapeHtml(String input) {
        if (input == null)
            return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
