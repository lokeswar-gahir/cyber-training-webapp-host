const trainingModules = {
    phishing: {
        id: "phishing",
        title: "Phishing Awareness",
        description:
            "Learn how to identify suspicious emails, avoid phishing attacks, and report them correctly.",
        icon: "🎣",
        intro:
            "Learn how to spot the warning signs of phishing emails, understand the tricks attackers use, and practice what to do when you spot something suspicious — including how and when to report it.",


        questions: [
            {
                question:
                    "You receive an email asking you to urgently verify your company password using a link. What should you do?",
                options: [
                    "Click the link and verify immediately",
                    "Reply to the email asking if it is legitimate",
                    "Report the email as phishing without clicking the link",
                    "Forward the email to a colleague",
                    "Enter a fake password to test the website"
                ],
                correctAnswer: 2,
                explanation:
                    "Urgent password requests containing links are common phishing techniques. Report the email using your organization's phishing reporting process and avoid clicking the link."
            },

            {
                question:
                    "Which sender address is most suspicious?",
                options: [
                    "it-support@yourcompany.com",
                    "security@yourcompany.com",
                    "helpdesk@yourcompany.com",
                    "security@yourcompany-support.com",
                    "hr@yourcompany.com"
                ],
                correctAnswer: 3,
                explanation:
                    "Attackers often use lookalike domains that contain the company name but are actually controlled by the attacker."
            },

            {
                question:
                    "You receive an unexpected email with an attachment named Invoice.zip. What should you do?",
                options: [
                    "Open the attachment to see what is inside",
                    "Download it and scan it later",
                    "Ask a colleague to open it",
                    "Report the email and avoid opening the attachment",
                    "Forward it to your personal email"
                ],
                correctAnswer: 3,
                explanation:
                    "Unexpected attachments can contain malware. Do not open them and report the suspicious email."
            },

            {
                question:
                    "An email says your account will be deleted within 30 minutes unless you click a link. What is this urgency most likely trying to do?",
                options: [
                    "Help you protect your account",
                    "Encourage you to act without thinking",
                    "Confirm your account is active",
                    "Provide a routine security reminder",
                    "Improve your email security"
                ],
                correctAnswer: 1,
                explanation:
                    "Attackers often create a sense of urgency to make people act quickly without checking whether the request is legitimate."
            },

            {
                question:
                    "You receive an email from your manager asking you to purchase gift cards immediately. What should you do?",
                options: [
                    "Buy the gift cards immediately",
                    "Reply with the gift card numbers",
                    "Verify the request through another trusted communication method",
                    "Forward the email to another employee",
                    "Click any link included in the email"
                ],
                correctAnswer: 2,
                explanation:
                    "Business email compromise often impersonates managers or executives. Verify unusual requests using a trusted communication method."
            },

            {
                question:
                    "What is the safest way to check where an email link will take you?",
                options: [
                    "Click it and see what happens",
                    "Hover over the link and inspect the destination",
                    "Forward the link to a friend",
                    "Copy it into an unknown website",
                    "Open it on your phone"
                ],
                correctAnswer: 1,
                explanation:
                    "Hovering over a link can reveal its destination without opening it. If the destination looks suspicious, do not click it."
            },

            {
                question:
                    "An email appears to come from your bank, but the sender's domain contains a small spelling mistake. What should you do?",
                options: [
                    "Click the link because the logo looks correct",
                    "Reply to confirm the account",
                    "Ignore the spelling mistake",
                    "Treat the email as suspicious and report it",
                    "Download any attached document"
                ],
                correctAnswer: 3,
                explanation:
                    "Small spelling differences in domains are a common phishing technique. Treat the message as suspicious."
            },

            {
                question:
                    "A colleague sends you an unexpected message containing a shortened URL. What should you do?",
                options: [
                    "Click it because it came from a colleague",
                    "Forward it to another colleague",
                    "Ask the colleague through a trusted channel whether they sent it",
                    "Open it on your personal device",
                    "Disable your antivirus before opening it"
                ],
                correctAnswer: 2,
                explanation:
                    "A compromised colleague's account can be used to send malicious links. Verify unexpected messages through another trusted channel."
            },

            {
                question:
                    "Which of the following is a common warning sign of a phishing email?",
                options: [
                    "A normal internal announcement",
                    "A routine calendar invitation",
                    "Unexpected urgency combined with a request for sensitive information",
                    "A message from a known colleague about a meeting",
                    "A company newsletter"
                ],
                correctAnswer: 2,
                explanation:
                    "Urgency combined with requests for passwords, financial information, or other sensitive data is a common phishing warning sign."
            },

            {
                question:
                    "You receive an email requesting your MFA verification code. What should you do?",
                options: [
                    "Send the code because the request appears to be from IT",
                    "Send the code only if the email looks professional",
                    "Never share the code and report the suspicious request",
                    "Reply asking which code they need",
                    "Post the code in the company chat"
                ],
                correctAnswer: 2,
                explanation:
                    "MFA codes are sensitive authentication information and should never be shared with another person."
            },

            {
                question:
                    "A phishing email uses your company's logo and branding. Does this prove that it is legitimate?",
                options: [
                    "Yes, company logos cannot be copied",
                    "Yes, if the email looks professional",
                    "No, attackers can easily copy logos and branding",
                    "Yes, if the email contains your name",
                    "Only government organizations can copy logos"
                ],
                correctAnswer: 2,
                explanation:
                    "Attackers can copy logos, colors, signatures, and other branding. Visual appearance alone does not prove an email is legitimate."
            },

            {
                question:
                    "You receive an email saying you have won a prize you never entered for. It asks you to provide your bank details. What should you do?",
                options: [
                    "Provide the information to claim the prize",
                    "Reply and ask for more information",
                    "Click the link to verify the prize",
                    "Report the message as suspicious or phishing",
                    "Forward it to your friends"
                ],
                correctAnswer: 3,
                explanation:
                    "Unexpected prize notifications requesting financial information are a common social engineering and phishing technique."
            },

            {
                question:
                    "What should you do if you accidentally click a suspicious link in an email?",
                options: [
                    "Ignore it if nothing happened immediately",
                    "Continue browsing the website",
                    "Report the incident to the IT/security team immediately",
                    "Delete your browser history",
                    "Tell nobody unless your computer stops working"
                ],
                correctAnswer: 2,
                explanation:
                    "Report accidental clicks immediately so the IT/security team can investigate and take protective action."
            },

            {
                question:
                    "An email asks you to bypass the normal approval process because a payment is urgent. What should you do?",
                options: [
                    "Process the payment immediately",
                    "Follow the normal approval process and verify the request",
                    "Send the payment details to the sender",
                    "Ignore all company procedures",
                    "Ask the sender for your password"
                ],
                correctAnswer: 1,
                explanation:
                    "Attackers often use urgency to bypass normal business controls. Follow established approval and verification procedures."
            },

            {
                question:
                    "You receive an email from an unknown sender asking you to enable macros in a Microsoft Office document. What should you do?",
                options: [
                    "Enable macros immediately",
                    "Open the document several times",
                    "Ask the sender for your password",
                    "Do not enable macros and report the suspicious email",
                    "Forward the document to everyone"
                ],
                correctAnswer: 3,
                explanation:
                    "Malicious documents can use macros to execute harmful code. Do not enable macros in unexpected documents."
            },

            {
                question:
                    "Which action is safest when you receive an unexpected password-reset email?",
                options: [
                    "Click the reset link immediately",
                    "Use the link in the email to check your account",
                    "Access the official service directly using a known address",
                    "Reply to the email with your current password",
                    "Forward the email to your personal account"
                ],
                correctAnswer: 2,
                explanation:
                    "Instead of using links in unexpected emails, access the official service directly through a trusted address or application."
            },

            {
                question:
                    "A suspicious email appears to come from the CEO and asks you to keep a financial request confidential. What is the safest response?",
                options: [
                    "Keep it secret and complete the request",
                    "Reply to the email asking for bank details",
                    "Verify the request through a trusted communication channel",
                    "Forward it outside the organization",
                    "Delete the email without reporting it"
                ],
                correctAnswer: 2,
                explanation:
                    "Requests for secrecy combined with financial actions are strong warning signs of business email compromise. Verify independently."
            },

            {
                question:
                    "What information should you generally avoid providing through an unexpected email link?",
                options: [
                    "The weather",
                    "A meeting time",
                    "Passwords, MFA codes, or financial information",
                    "The office location",
                    "A public company announcement"
                ],
                correctAnswer: 2,
                explanation:
                    "Never provide sensitive authentication or financial information through unexpected email requests."
            },

            {
                question:
                    "You notice that an email's display name says 'IT Support,' but the actual sender address is unrelated to your organization. What should you do?",
                options: [
                    "Trust the display name",
                    "Reply to the sender",
                    "Treat the email as suspicious and report it",
                    "Click the links to investigate",
                    "Forward it to other employees"
                ],
                correctAnswer: 2,
                explanation:
                    "Display names can easily be spoofed. Always pay attention to the actual sender address and domain."
            },

            {
                question:
                    "What is the best reason to report a suspected phishing email even if you are not completely sure it is malicious?",
                options: [
                    "It guarantees the sender will be blocked",
                    "It allows the security team to investigate and protect others",
                    "It deletes every copy of the email",
                    "It prevents all future phishing attacks",
                    "It means you will never receive another email"
                ],
                correctAnswer: 1,
                explanation:
                    "Reporting suspicious messages allows the security team to investigate potential threats and protect other employees."
            }
        ]
    },

    cybersecurity: {
        id: "cybersecurity",
        title: "General Cybersecurity",
        description:
            "Learn basic security practices that help protect company systems, devices, accounts, and information.",
        icon: "🛡️",
        intro:
            "Build everyday security habits: stronger passwords, multi-factor authentication, safe Wi-Fi and devices, spotting malware and suspicious activity, protecting data, and knowing how to report incidents.",


        questions: [
            {
                question:
                    "What is the strongest password practice?",
                options: [
                    "Use the same password everywhere",
                    "Use your birthday",
                    "Use a long and unique password for each important account",
                    "Use your company name",
                    "Use a short password that is easy to remember"
                ],
                correctAnswer: 2,
                explanation:
                    "Long, unique passwords reduce the risk that one compromised password will expose multiple accounts."
            },

            {
                question:
                    "You receive an unexpected MFA approval request on your phone. What should you do?",
                options: [
                    "Approve it so the notification disappears",
                    "Ignore it completely",
                    "Deny the request and report the suspicious activity",
                    "Approve it and change your password next month",
                    "Ask someone else to approve it"
                ],
                correctAnswer: 2,
                explanation:
                    "An unexpected MFA request may indicate someone is attempting to access your account. Deny it and report the activity."
            },

            {
                question:
                    "What should you do before leaving your computer unattended?",
                options: [
                    "Leave all applications open",
                    "Lock your computer",
                    "Turn off the monitor only",
                    "Ask a colleague to watch it",
                    "Leave your password on a note"
                ],
                correctAnswer: 1,
                explanation:
                    "Always lock your computer when stepping away to prevent unauthorized access."
            },

            {
                question:
                    "You find an unknown USB drive in the office parking area. What should you do?",
                options: [
                    "Plug it into your computer to identify the owner",
                    "Take it home",
                    "Give it to a friend",
                    "Hand it to the appropriate IT/security team",
                    "Open the files using your personal computer"
                ],
                correctAnswer: 3,
                explanation:
                    "Unknown USB devices can contain malware. Do not connect them to a computer. Report them to IT/security."
            },

            {
                question:
                    "Why are software updates important for cybersecurity?",
                options: [
                    "They only change the appearance of applications",
                    "They can fix security vulnerabilities",
                    "They make passwords unnecessary",
                    "They prevent every cyberattack",
                    "They remove the need for antivirus software"
                ],
                correctAnswer: 1,
                explanation:
                    "Software updates often include security fixes that address vulnerabilities attackers could exploit."
            },

            {
                question:
                    "You need to work with sensitive company information while using public Wi-Fi. What is the safest approach?",
                options: [
                    "Use any available network",
                    "Disable all security software",
                    "Use an organization-approved secure connection such as a VPN",
                    "Share your computer with strangers",
                    "Turn off MFA"
                ],
                correctAnswer: 2,
                explanation:
                    "Use organization-approved secure connectivity when accessing sensitive company information from public networks."
            },

            {
                question:
                    "A coworker asks you to share your password because they need to access your account temporarily. What should you do?",
                options: [
                    "Share it if you trust the coworker",
                    "Send it through chat",
                    "Share it verbally",
                    "Do not share your password; use an approved access process",
                    "Write it on a piece of paper"
                ],
                correctAnswer: 3,
                explanation:
                    "Passwords should not be shared. Use approved access-management procedures to provide someone with the access they need."
            },

            {
                question:
                    "You receive a notification that your account password was changed, but you did not change it. What should you do?",
                options: [
                    "Ignore the notification",
                    "Wait until tomorrow",
                    "Report it immediately and follow your organization's account-security procedure",
                    "Share the notification publicly",
                    "Try random passwords until one works"
                ],
                correctAnswer: 2,
                explanation:
                    "An unexpected password change can indicate account compromise. Report it immediately to the appropriate security team."
            },

            {
                question:
                    "What is the safest way to store your work passwords?",
                options: [
                    "Write them on a sticky note",
                    "Store them in a personal spreadsheet",
                    "Use an organization-approved password manager",
                    "Save them in an email draft",
                    "Use the same password everywhere"
                ],
                correctAnswer: 2,
                explanation:
                    "An organization-approved password manager provides a safer way to create and store unique passwords."
            },

            {
                question:
                    "You notice your computer is suddenly running very slowly and unfamiliar applications are appearing. What should you do?",
                options: [
                    "Ignore it",
                    "Install random software to fix it",
                    "Report the unusual behavior to IT/security",
                    "Continue entering sensitive information",
                    "Disable security software"
                ],
                correctAnswer: 2,
                explanation:
                    "Unexpected system behavior can indicate malware or another security issue. Report it to IT/security."
            },

            {
                question:
                    "What should you do if you accidentally send confidential information to the wrong person?",
                options: [
                    "Delete the sent email and say nothing",
                    "Ignore it if the recipient is internal",
                    "Report the incident immediately through the organization's process",
                    "Ask the recipient to forward it elsewhere",
                    "Post a correction on social media"
                ],
                correctAnswer: 2,
                explanation:
                    "Accidental disclosure of sensitive information should be reported promptly so the organization can assess and contain the risk."
            },

            {
                question:
                    "Why should you avoid installing unauthorized software on a company computer?",
                options: [
                    "It may introduce security vulnerabilities or malware",
                    "It always makes the computer slower",
                    "It prevents all software updates",
                    "It changes your email address",
                    "It makes the keyboard stop working"
                ],
                correctAnswer: 0,
                explanation:
                    "Unauthorized software may contain vulnerabilities or malicious code and may violate company security policies."
            },

            {
                question:
                    "You receive a phone call from someone claiming to be IT support and asking for your password. What should you do?",
                options: [
                    "Provide the password",
                    "Provide only part of the password",
                    "Refuse to share the password and verify the caller through an approved channel",
                    "Ask the caller for their password first",
                    "Send the password by email"
                ],
                correctAnswer: 2,
                explanation:
                    "Legitimate IT staff should not require you to disclose your password. Verify unexpected requests through approved channels."
            },

            {
                question:
                    "What should you do when you finish using a company-issued device in a public location?",
                options: [
                    "Leave it unattended",
                    "Keep it secured and under your control",
                    "Give it to someone nearby",
                    "Leave it in an unlocked vehicle",
                    "Share the device with strangers"
                ],
                correctAnswer: 1,
                explanation:
                    "Company devices should be physically protected, especially in public locations."
            },

            {
                question:
                    "A website asks you to install a browser extension before you can view its content. What should you do?",
                options: [
                    "Install it immediately",
                    "Install it if the website looks professional",
                    "Only install software approved by your organization",
                    "Disable antivirus protection first",
                    "Ask a stranger to install it"
                ],
                correctAnswer: 2,
                explanation:
                    "Unapproved browser extensions can introduce security and privacy risks. Follow your organization's software approval process."
            },

            {
                question:
                    "What is the purpose of multi-factor authentication?",
                options: [
                    "To make passwords unnecessary in every situation",
                    "To provide an additional layer of protection beyond a password",
                    "To allow employees to share accounts",
                    "To disable security monitoring",
                    "To automatically remove malware"
                ],
                correctAnswer: 1,
                explanation:
                    "MFA adds another verification factor, making it harder for attackers to access an account using only a stolen password."
            },

            {
                question:
                    "You are working from home and someone you do not know asks to use your company laptop. What should you do?",
                options: [
                    "Let them use it briefly",
                    "Give them access after logging out",
                    "Do not allow unauthorized people to use the company device",
                    "Share your password with them",
                    "Create a temporary account without approval"
                ],
                correctAnswer: 2,
                explanation:
                    "Company devices contain organizational data and should only be used by authorized individuals."
            },

            {
                question:
                    "You suspect that your company account has been compromised. What should you do first?",
                options: [
                    "Ignore it",
                    "Delete all emails",
                    "Report the suspected compromise immediately according to company procedures",
                    "Post about it online",
                    "Wait for someone else to notice"
                ],
                correctAnswer: 2,
                explanation:
                    "Prompt reporting allows the security team to investigate and take action to limit potential damage."
            },

            {
                question:
                    "Which practice helps protect sensitive information when sharing files?",
                options: [
                    "Use any public file-sharing website",
                    "Send files to personal email",
                    "Use organization-approved secure sharing methods",
                    "Upload files to an unknown website",
                    "Remove all security controls"
                ],
                correctAnswer: 2,
                explanation:
                    "Use organization-approved secure file-sharing methods to protect sensitive information and maintain appropriate access controls."
            },

            {
                question:
                    "What should you do if you see someone in a restricted office area who you do not recognize?",
                options: [
                    "Ignore them",
                    "Give them access to restricted areas",
                    "Follow your organization's security procedure and report the situation if appropriate",
                    "Give them your access badge",
                    "Ask them for your password"
                ],
                correctAnswer: 2,
                explanation:
                    "Physical security is part of cybersecurity. Unexpected access to restricted areas should be handled according to your organization's security procedures."
            }
        ]
    }
};

window.trainingModules = trainingModules;
