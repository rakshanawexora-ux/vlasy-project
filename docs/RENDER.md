# Render deployment and contact delivery

The confirmed site is https://vlasy-project.onrender.com. `render.yaml` describes
a Node web service, not a static-site export: build `npm ci --include=dev && npm run build`,
start `npm start -- --port $PORT`, health check `/contact`.
The Next.js `/api/enquiry` route requires a running Node service.

## Required delivery settings

In the existing Render service, open Environment and add:

| Variable               | Value                                                    |
| ---------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://vlasy-project.onrender.com`                     |
| `NEXT_PUBLIC_PHONE`    | Confirmed public business phone                          |
| `NEXT_PUBLIC_WHATSAPP` | Business WhatsApp number, including country code         |
| `NEXT_PUBLIC_EMAIL`    | Confirmed public business email                          |
| `RESEND_API_KEY`       | Private API key created in the business's Resend account |
| `ENQUIRY_FROM_EMAIL`   | Sender address on a domain verified with Resend          |
| `ENQUIRY_TO_EMAIL`     | Business inbox that should receive enquiries             |

Save and rebuild/redeploy because public contact settings are compiled into the
browser bundle. Keep the API key in Render's private Environment UI, never GitHub
or chat. The blueprint's `sync: false` entries are placeholders, not credentials;
committing the file does not configure an existing Render service by itself.

`GET /api/enquiry` reports only whether email settings are present, never secret
values. It cannot prove provider authorization or inbox delivery. A valid POST
returns 201 only after Resend accepts it with a message receipt. Missing settings
return 503; provider/network failures return 502. Form values remain available
for retry; a configured WhatsApp fallback opens a prepared message for the user
to send. There is no silent console-log success and no personal data in logs.

Local tests use mocked provider responses and do not send real emails. Before
claiming live delivery works, configure the business account and check a genuine
user-authorized submission in the provider dashboard and recipient inbox.

The current execution environment blocks requests to the Render domain and the
reference salon domains; live page behavior cannot be verified from here.
