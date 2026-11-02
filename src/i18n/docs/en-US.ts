import type { AppInfo } from './apps'
import type { DocPage, DocSet } from './types'

const UPDATED = '2026-11-02'
const DEVELOPER = '尘墨成'
const SITE = 'https://www.dustinky.com'

const portalCell = (app: AppInfo): string =>
  app.portal
    ? `<a href="${app.portal}" target="_blank" rel="noopener">${app.portalLabel}</a>`
    : 'See its official page'

const accountStatus = (app: AppInfo): string =>
  app.portal
    ? `Check account status at ${portalCell(app)}.`
    : "Check account status on the provider's official page."

const privacy = (app: AppInfo): DocPage => {
  const name = app.name.en
  const id = app.id

  const shareItems = [
    '<strong>Cloud providers:</strong> the drive operator you linked, for authentication, file access, sharing and saving shared files.',
    '<strong>Model service providers:</strong> involved only when you enable the AI assistant and actively send content.',
    '<strong>UGOS platform:</strong> provides app runtime, identity and folder authorization under UGREEN\'s platform policies.',
  ]

  return {
    eyebrow: 'Privacy Policy',
    title: 'Privacy Policy',
    lead: `This policy applies to ${name} (<span class="mono">${id}</span>). Our principle is simple: your data stays on your NAS.`,
    meta: `Effective: ${UPDATED}　·　Last updated: ${UPDATED}`,
    sections: [
      {
        id: 'scope',
        title: '1. Scope',
        blocks: [
          {
            kind: 'text',
            html: `This policy applies to ${name} (<span class="mono">${id}</span>). The app runs on your own UGREEN NAS (UGOS Pro). The developer does not operate relay servers and does not host your files. Other com.naspk.* apps are covered by the policy in their own directory, listed at the <a href="/en/index.html">Legal Center</a>.`,
          },
        ],
      },
      {
        id: 'data',
        title: '2. Information we process',
        blocks: [
          { kind: 'text', html: '<h3>2.1 Account and authorization data</h3><p>When you link a cloud drive account by QR code, cookie, token or password, the app processes the credentials returned by that provider (such as cookies, access_token, refresh_token and session keys). These are stored only in the app data directory on your NAS; where encrypted storage is supported, credential files are protected with AES-256-GCM and restricted to the app account. The developer never receives, uploads or holds these credentials.</p>' },
          { kind: 'text', html: '<h3>2.2 File and folder information</h3><p>To provide browsing, search, upload, download, playback, backup and gallery features, the app reads file names, sizes, types, paths, modification times and necessary media metadata. This information is processed in local memory or the app data directory and is not sent to developer servers. File content leaves your NAS only when you upload it to the cloud drive, when the provider streams it for playback or download at your request, or when you enable AI features and choose to send related text.</p>' },
          { kind: 'text', html: '<h3>2.3 Transfer and task records</h3><p>The app stores task lists, resume information, backup schedules and run records locally so tasks can resume after a restart and progress can be displayed. Records may contain local paths and remote file identifiers and are kept only in the app data directory.</p>' },
          { kind: 'text', html: '<h3>2.4 Logs</h3><p>The app writes logs to the local log directory for troubleshooting. Logs may contain timestamps, error codes, API paths, file paths or task identifiers; they are not uploaded automatically. You can change the log level in app settings or clear the log directory yourself.</p>' },
          { kind: 'text', html: '<h3>2.5 AI assistant</h3><p>The AI assistant is optional and disabled by default. When enabled, you provide an OpenAI-compatible endpoint, model and API key yourself. Prompts you send, and file content or text you explicitly hand to tools, are sent directly to the third-party model service you configured; the developer does not receive them. The API key is stored locally and never written in full to logs.</p>' },
          { kind: 'text', html: '<h3>2.6 What we do not collect</h3>' },
          {
            kind: 'list',
            items: [
              'No device identifiers, location, contacts, clipboard or usage-behavior statistics;',
              'No advertising, analytics or push SDKs;',
              'No access to unauthorized folders and no scanning of files unrelated to app features;',
              'No sale, rental or exchange of user data with any third party.',
            ],
          },
        ],
      },
      {
        id: 'perm',
        title: '3. Permissions and system capabilities',
        blocks: [
          {
            kind: 'text',
            html: 'The app requests internet access only (<span class="mono">NETWORK.ACCESS_INTERNET</span>) to reach the corresponding cloud drive. Local file access does not use whole-disk storage permission; you explicitly select folders under UGOS "App Settings → Folder Authorization", and the app can access only those folders plus its own data directory. Revoking authorization or uninstalling the app removes that access.',
          },
        ],
      },
      {
        id: 'storage',
        title: '4. Storage location and retention',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Location:</strong> everything stays on your NAS, including the app data directory, log directory and folders you authorized.',
              '<strong>Retention:</strong> kept until you delete it, clear app data or uninstall the app. Uninstalling removes the app data directory; the app does not delete existing files in folders you authorized.',
              '<strong>Cross-border transfer:</strong> the developer does not transfer data. When you use a cloud drive or a third-party model service, that provider determines how data flows.',
            ],
          },
        ],
      },
      {
        id: 'share',
        title: '5. Sharing and third parties',
        blocks: [
          {
            kind: 'text',
            html: 'The app does not share information with the developer or advertisers. The following third parties participate in processing and are bound by their own privacy policies:',
          },
          {
            kind: 'list',
            items: app.thunderEngine
              ? [
                  shareItems[0],
                  '<strong>Thunder engine:</strong> the Thunder Drive app may use the bundled Xunlei engine component for session and download capability, subject to Xunlei\'s terms.',
                  shareItems[1],
                  shareItems[2],
                ]
              : shareItems,
          },
        ],
      },
      {
        id: 'security',
        title: '6. Security measures',
        blocks: [
          {
            kind: 'list',
            items: [
              'The service runs under the platform app account, not as root;',
              'App directories use least privilege, and credential and key files are restricted to 0600;',
              'Local path access is validated against authorized folders, and out-of-scope requests are denied;',
              'Media URLs use short-lived tickets so credentials never appear in public URLs.',
            ],
          },
          {
            kind: 'notice',
            html: 'No system is perfectly secure. Protect your NAS account, cloud drive accounts and API keys, and install system and firmware updates promptly.',
          },
        ],
      },
      {
        id: 'rights',
        title: '7. Your rights',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>Access and correction:</strong> view accounts, tasks and settings in the app and change them at any time.',
              '<strong>Deletion:</strong> unlink the account, clear app data or uninstall the app to delete locally stored information.',
              '<strong>Withdraw authorization:</strong> remove folder authorization in UGOS app settings.',
              '<strong>Decline AI:</strong> leaving the AI assistant disabled produces no model service traffic.',
            ],
          },
          { kind: 'text', html: 'For assistance, contact us using the details below. We respond within a reasonable period.' },
        ],
      },
      {
        id: 'children',
        title: '8. Minors',
        blocks: [
          {
            kind: 'text',
            html: 'The app targets NAS users with full civil capacity and is not offered to minors on a standalone basis. Minors should use it under guardian supervision, and the guardian is responsible for the associated cloud drive account and data.',
          },
        ],
      },
      {
        id: 'policy',
        title: '9. Policy updates',
        blocks: [
          {
            kind: 'text',
            html: 'We may update this policy when features or regulations change. Material changes will be highlighted on this page with a new "Last updated" date. Continued use of the app means you accept the updated policy.',
          },
        ],
      },
      {
        id: 'contact',
        title: '10. Contact',
        blocks: [
          {
            kind: 'text',
            html: `Developer: ${DEVELOPER}<br>Website and contact: <a href="${SITE}" target="_blank" rel="noopener">${SITE}</a><br>Support: <a href="support.html">Support page</a>`,
          },
        ],
      },
    ],
  }
}

const terms = (app: AppInfo): DocPage => ({
  eyebrow: 'License Agreement',
  title: 'License Agreement',
  lead: `This agreement is between you and the NASPK app developer and governs your use of ${app.name.en} (<span class="mono">${app.id}</span>). Installing or using the app means you have read and accept this agreement.`,
  meta: `Effective: ${UPDATED}　·　Applies to: ${app.name.en} (${app.id})`,
  sections: [
    {
      id: 'license',
      title: '1. License grant',
      blocks: [
        {
          kind: 'text',
          html: 'Subject to this agreement, the developer grants you a personal, non-exclusive, non-transferable, non-sublicensable limited license to install and use the app on a UGREEN NAS you own or lawfully control, for managing your own cloud drive accounts and files.',
        },
        {
          kind: 'text',
          html: '<strong>The app is closed-source software.</strong> This agreement grants no right to obtain, modify, copy or distribute the source code, and the developer does not provide a source repository or download. Bundled third-party components remain subject to their own licenses.',
        },
      ],
    },
    {
      id: 'restrict',
      title: '2. Restrictions',
      blocks: [
        { kind: 'text', html: 'You must not:' },
        {
          kind: 'list',
          items: [
            'reverse engineer, decompile or disassemble the app, or attempt to extract its source code, except where mandatory law permits;',
            'copy, rent, lend, sell, sublicense or distribute the app or its installer, or embed commercial promotion in it;',
            'remove or alter copyright, trademark, license or compliance notices;',
            "use the app for unlawful activity, to distribute unlawful content, to infringe others' rights, or to scrape in bulk or bypass cloud drive risk controls and rate limits;",
            'provide commercial cloud drive hosting services to third parties using the app, unless the developer gives written permission.',
          ],
        },
      ],
    },
    {
      id: 'duty',
      title: '3. Your responsibilities',
      blocks: [
        {
          kind: 'list',
          items: [
            "You must have lawful rights to the linked cloud drive accounts and comply with the provider's terms of service.",
            'Back up important data yourself. Transfers, sync, backup and saving shared files may fail, be interrupted or overwrite files.',
            'Protect your NAS account, cloud drive credentials and AI API keys; losses from credential leakage are your responsibility.',
            "Ensure folders you authorize do not contain others' data that you have no right to process.",
          ],
        },
      ],
    },
    {
      id: 'third',
      title: '4. Third-party services',
      blocks: [
        {
          kind: 'text',
          html: 'The app connects only as a client to the cloud drive and optional model services you specify. Availability, API changes, fees, risk controls, rate limits, data policies and legal responsibility for those services rest with their operators. The developer is not responsible for third-party outages, bans, data loss or content legality.',
        },
        ...(app.thunderEngine
          ? [
              {
                kind: 'text' as const,
                html: 'The Thunder Drive app may bundle the Xunlei engine component, provided by its rights holder under its own license; the developer may stop distributing or adjust that feature if the rights holder so requests.',
              },
            ]
          : []),
      ],
    },
    {
      id: 'warranty',
      title: '5. Disclaimer',
      blocks: [
        {
          kind: 'text',
          html: 'The app is provided "as is". To the maximum extent permitted by applicable law, the developer makes no express or implied warranties, including merchantability, fitness for a particular purpose, non-infringement, uninterrupted operation or error-free operation. You use the app at your own risk.',
        },
      ],
    },
    {
      id: 'liability',
      title: '6. Limitation of liability',
      blocks: [
        {
          kind: 'text',
          html: "To the maximum extent permitted by applicable law, the developer is not liable for any indirect, incidental, special, punitive or consequential damages, including data loss, business interruption, lost profits or third-party claims. The developer's total liability for all claims will not exceed the amount you actually paid for the app.",
        },
      ],
    },
    {
      id: 'update',
      title: '7. Updates and termination',
      blocks: [
        {
          kind: 'list',
          items: [
            'The developer may release updates for platform compatibility or fixes; installing them is your choice.',
            'If you breach this agreement, the license terminates automatically and you must stop using and uninstall the app.',
            'You may terminate this agreement at any time by uninstalling the app; termination does not affect rights and obligations arising before termination.',
          ],
        },
      ],
    },
    {
      id: 'law',
      title: '8. Governing law and disputes',
      blocks: [
        {
          kind: 'text',
          html: "This agreement is governed by the laws of the People's Republic of China. Disputes shall first be resolved through good-faith negotiation; failing that, either party may bring the matter before a competent people's court where the developer is located.",
        },
      ],
    },
    {
      title: '9. Miscellaneous',
      blocks: [
        {
          kind: 'text',
          html: 'This agreement and the <a href="privacy.html">Privacy Policy</a> form the complete understanding between the parties. If any provision is held invalid, the remaining provisions stay in effect. Failure to exercise a right is not a waiver of that right.',
        },
        {
          kind: 'text',
          html: `Contact: <a href="${SITE}" target="_blank" rel="noopener">${SITE}</a>　·　<a href="support.html">Support page</a>`,
        },
      ],
    },
  ],
})

const thirdParty = (app: AppInfo): DocPage => ({
  eyebrow: 'Third-Party Notices',
  title: 'Third-Party Components and Licenses',
  lead: `This page lists the cloud service, open-source components and proprietary third-party components used by ${app.name.en}. The app itself is closed-source software with no source code address; the components below remain owned by their rights holders under their respective licenses.`,
  meta: `Last updated: ${UPDATED}`,
  sections: [
    {
      title: '1. Cloud service providers',
      blocks: [
        {
          kind: 'text',
          html: 'The app acts only as a client; authentication, file access, sharing and saving shared files are handled by the corresponding provider. Please also read their terms of service and privacy policies.',
        },
        {
          kind: 'table',
          head: ['App', 'Provider', 'Official site'],
          rows: [[app.name.en, app.provider.en, portalCell(app)]],
        },
      ],
    },
    {
      title: '2. Open-source components',
      blocks: [
        {
          kind: 'table',
          head: ['Component', 'Purpose', 'License'],
          rows: [
            ['Vue 3 / Vue Router', 'Front-end UI and routing', 'MIT'],
            ['Vite', 'Front-end build', 'MIT'],
            ['Nuxt UI', 'UI component library', 'MIT'],
            ['Tailwind CSS', 'Styling system', 'MIT'],
            ['markdown-it', 'Markdown rendering', 'MIT'],
            ['qrcode', 'Sign-in QR code generation', 'MIT'],
            ['Go standard library', 'Backend runtime and networking', 'BSD-3-Clause'],
          ],
        },
        {
          kind: 'text',
          html: 'Copyright and license notices for the above components are retained as required. Distribution of the app does not change the license terms of these components.',
        },
      ],
    },
    {
      title: '3. Proprietary third-party components',
      blocks: [
        {
          kind: 'table',
          head: ['Component', 'Use', 'Notes'],
          rows: app.thunderEngine
            ? [
                [
                  'Xunlei engine (xunlei-pan-cli)',
                  'Session and download capability for Thunder Drive',
                  'Provided by Xunlei as a proprietary component under its bundled license; used only in Thunder Drive',
                ],
                ['UGOS Core SDK', 'Platform identity token and desktop capabilities', 'Provided by UGREEN under its developer terms'],
              ]
            : [['UGOS Core SDK', 'Platform identity token and desktop capabilities', 'Provided by UGREEN under its developer terms']],
        },
        {
          kind: 'text',
          html: 'If a rights holder believes distribution needs adjustment, please contact us through the <a href="support.html">support page</a>; we will verify and stop distribution or adjust the feature.',
        },
      ],
    },
    {
      title: '4. About source code',
      blocks: [
        {
          kind: 'notice',
          html: 'The app is closed-source software. No source repository, download address or build script is provided. Source code for open-source components is available from their official projects.',
        },
      ],
    },
  ],
})

const support = (app: AppInfo): DocPage => ({
  eyebrow: 'Support',
  title: 'Support',
  lead: `This page covers the most common setup and troubleshooting steps for ${app.name.en} (<span class="mono">${app.id}</span>). The app is closed-source and does not provide a source repository or public issue tracker; please contact us through the developer website.`,
  meta: `Scope: ${app.name.en} (${app.id})　·　Last updated: ${UPDATED}`,
  sections: [
    {
      id: 'start',
      title: '1. Quick checks',
      blocks: [
        {
          kind: 'list',
          items: [
            'Confirm the app is installed and enabled in the UGOS App Center;',
            "Confirm the NAS can reach the cloud provider's website, ruling out network and DNS issues;",
            'Sign in again in the app to rule out expired credentials;',
            'Restart the app (not the whole NAS) and retry;',
            'If the issue appeared after an upgrade, check the error code in the app log.',
          ],
        },
      ],
    },
    {
      id: 'folder',
      title: '2. Folder authorization',
      blocks: [
        { kind: 'text', html: 'The app does not request whole-disk storage permission; local folders must be authorized explicitly:' },
        {
          kind: 'list',
          items: [
            'Open UGOS "App Center → Installed Apps → this app → App Settings";',
            'Add the folders you want to read and write under "Folder Authorization";',
            'Restart the app after changing authorization so the new folders take effect;',
            'After revoking authorization, the app immediately loses access to that folder.',
          ],
        },
        {
          kind: 'notice',
          html: 'If no local folders appear in the app, authorization is usually missing or the app was not restarted afterward.',
        },
      ],
    },
    {
      id: 'data',
      title: '3. Data locations and uninstall cleanup',
      blocks: [
        {
          kind: 'table',
          head: ['Content', 'Location', 'On uninstall'],
          rows: [
            ['Account credentials and settings', 'App data directory', 'Removed with app data'],
            ['Task and backup records', 'App data directory', 'Removed'],
            ['Runtime logs', 'App log directory', 'Removed'],
            ['Files in authorized folders', 'Existing shared folders', 'Not deleted'],
          ],
        },
        {
          kind: 'text',
          html: 'To keep settings, back up the app data directory before uninstalling. Upgrading does not clear existing data.',
        },
      ],
    },
    {
      id: 'login',
      title: '4. Sign-in expiry and re-authorization',
      blocks: [
        {
          kind: 'text',
          html: `Sign-in methods for this app: ${app.login.en}. ${accountStatus(app)}`,
        },
        {
          kind: 'list',
          items: [
            "<strong>QR sign-in:</strong> the QR code expires quickly; scan and confirm promptly with the provider's app.",
            '<strong>Cookie / token sign-in:</strong> credentials expire under provider policy; link the account again in the app.',
            '<strong>Risk control:</strong> frequent or unusual logins may trigger provider verification; complete it in the official client and retry.',
            '<strong>Never</strong> post cookies, tokens or API keys in public channels.',
          ],
        },
      ],
    },
    {
      id: 'stream',
      title: '5. Online playback and downloads',
      blocks: [
        {
          kind: 'list',
          items: [
            'Playback depends on provider links and your network; if it stutters, lower the quality or retry later;',
            'Some formats are limited by browser or player capability; download the file locally and play it instead;',
            'Select a target folder before downloading; requests without a folder are rejected by design for safety;',
            'For large downloads, keep the NAS awake; resume records are stored in the app data directory.',
          ],
        },
      ],
    },
    {
      id: 'ai',
      title: '6. AI assistant',
      blocks: [
        {
          kind: 'list',
          items: [
            'The AI assistant is off by default; enter an OpenAI-compatible endpoint, model name and API key yourself;',
            'Requests go from your NAS directly to the provider you configure, never through developer servers;',
            'On authentication errors, check the API key, model name and billing status;',
            'Keep the feature disabled if you do not want external requests.',
          ],
        },
      ],
    },
    {
      id: 'log',
      title: '7. Logs',
      blocks: [
        {
          kind: 'text',
          html: 'When reporting an issue you may provide app logs, but first review and remove sensitive data such as accounts and paths:',
        },
        {
          kind: 'list',
          items: [
            'Set the log level to <span class="mono">debug</span> in app settings;',
            'Reproduce the issue, then export the recent log files from the app log directory;',
            'Include the app name, version, NAS model, UGOS version, symptoms and time of occurrence.',
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: '8. Contact',
      blocks: [
        {
          kind: 'text',
          html: `Developer: ${DEVELOPER}<br>Website and contact: <a href="${SITE}" target="_blank" rel="noopener">${SITE}</a><br>Privacy: <a href="privacy.html">privacy.html</a>　·　Terms: <a href="terms.html">terms.html</a>`,
        },
      ],
    },
  ],
})

const enDocs: DocSet = { privacy, terms, 'third-party': thirdParty, support }

export default enDocs
