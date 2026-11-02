import type { AppInfo } from './apps'
import type { DocPage, DocSet } from './types'

const UPDATED = '2026-11-02'
const DEVELOPER = '尘墨成'
const SITE = 'https://www.dustinky.com'

const portalCell = (app: AppInfo): string =>
  app.portal
    ? `<a href="${app.portal}" target="_blank" rel="noopener">${app.portalLabel}</a>`
    : '以其官方页面为准'

const accountStatus = (app: AppInfo): string =>
  app.portal
    ? `账号状态请以 ${portalCell(app)} 为准。`
    : '账号状态请以服务商官方页面为准。'

const privacy = (app: AppInfo): DocPage => {
  const name = app.name.zh
  const id = app.id

  const shareItems = [
    '<strong>云服务提供方：</strong>你绑定的网盘运营商，用于账号认证、文件存取与分享转存。',
    '<strong>大模型服务方：</strong>仅在你启用 AI 助手并主动发送内容时参与。',
    '<strong>UGOS 平台：</strong>提供应用运行、身份识别与文件夹授权能力，遵循绿联云平台政策。',
  ]

  return {
    eyebrow: 'Privacy Policy',
    title: '隐私政策',
    lead: `本政策适用于${name}（<span class="mono">${id}</span>），我们坚持「数据留在你的 NAS」这一原则。`,
    meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
    sections: [
      {
        id: 'scope',
        title: '1. 适用范围',
        blocks: [
          {
            kind: 'text',
            html: `本政策适用于${name}（<span class="mono">${id}</span>）。本应用运行在用户自有的绿联 NAS（UGOS Pro）上，开发者不运营中转服务器，也不托管用户文件。其他 com.naspk.* 应用适用各自目录下的政策，可在<a href="/index.html">法律中心首页</a>查看。`,
          },
        ],
      },
      {
        id: 'data',
        title: '2. 我们处理的信息',
        blocks: [
          { kind: 'text', html: '<h3>2.1 账号与授权信息</h3><p>当你通过扫码、Cookie、Token 或账号密码方式绑定网盘账号时，应用会处理该网盘返回的登录凭据（如 Cookie、access_token、refresh_token、会话密钥）。这些信息仅保存在你的 NAS 应用数据目录中；在支持加密存储的应用中，凭据文件使用 AES-256-GCM 等机制加密，文件权限限制为仅应用账号可读。开发者不会收到、上传或代为保管上述凭据。</p>' },
          { kind: 'text', html: '<h3>2.2 文件与目录信息</h3><p>为完成浏览、搜索、上传、下载、播放、备份与相册功能，应用会读取文件名、大小、类型、路径、修改时间及必要的媒体元数据。上述信息在本机内存或应用数据目录中处理，不会发送至开发者服务器；文件内容仅在以下情形离开你的 NAS：你主动上传至对应网盘、你主动播放/下载时由网盘直链传输，或你启用 AI 功能并选择发送相关文本。</p>' },
          { kind: 'text', html: '<h3>2.3 传输与任务记录</h3><p>应用在本机保存任务列表、断点续传信息、备份计划与执行记录，用于在重启后恢复任务与展示进度。记录中可能包含本地路径与云端文件标识，均只存放在应用数据目录。</p>' },
          { kind: 'text', html: '<h3>2.4 运行日志</h3><p>应用在本机日志目录写入运行日志，用于故障排查。日志可能包含时间、错误码、接口路径、文件路径或任务标识；日志不会自动上传。你可以在应用设置中调整日志级别，或自行清理日志目录。</p>' },
          { kind: 'text', html: '<h3>2.5 AI 助手</h3><p>AI 助手为可选功能，默认关闭。启用时，你需要自行填写兼容 OpenAI 协议的服务地址、模型与 API Key。你发送的提示词、以及你明确选择交给工具处理的文件内容或文本，会直接发送至你配置的第三方模型服务；开发者不接收这些内容。API Key 仅保存在本机，日志不记录完整密钥。</p>' },
          {
            kind: 'text',
            html: '<h3>2.6 我们不收集的信息</h3>',
          },
          {
            kind: 'list',
            items: [
              '不收集设备唯一标识、位置、通讯录、剪贴板或使用行为统计；',
              '不集成广告、统计分析或推送 SDK；',
              '不读取未授权目录，不扫描与功能无关的文件；',
              '不向任何第三方出售、出租或交换用户数据。',
            ],
          },
        ],
      },
      {
        id: 'perm',
        title: '3. 权限与系统能力',
        blocks: [
          {
            kind: 'text',
            html: `应用仅申请联网权限（<span class="mono">NETWORK.ACCESS_INTERNET</span>）以访问对应网盘。本地文件访问不使用全盘存储权限，而是由你在 UGOS「应用设置 → 文件夹授权」中显式选择目录；应用只能访问这些目录及应用自身的数据目录。撤销授权或卸载应用后，应用即失去相应访问能力。`,
          },
        ],
      },
      {
        id: 'storage',
        title: '4. 信息的存储位置与期限',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>位置：</strong>全部保存在你的 NAS 上，包括应用数据目录、日志目录与你授权的共享目录。',
              '<strong>期限：</strong>保存至你主动删除、清除应用数据或卸载应用为止；卸载时系统会移除应用数据目录，应用不会删除你授权目录中的既有文件。',
              '<strong>跨境传输：</strong>开发者不进行数据传输；你使用网盘或第三方模型服务时，数据流向由该服务商决定。',
            ],
          },
        ],
      },
      {
        id: 'share',
        title: '5. 信息的共享与第三方',
        blocks: [
          {
            kind: 'text',
            html: '应用本身不向开发者或广告商共享信息。以下第三方会参与数据处理，其行为受各自隐私政策约束：',
          },
          {
            kind: 'list',
            items: app.thunderEngine
              ? [
                  shareItems[0],
                  '<strong>迅雷引擎：</strong>迅雷云盘应用可能使用随包提供的迅雷引擎组件，用于登录态与下载能力；其数据处理遵循迅雷相关协议。',
                  shareItems[1],
                  shareItems[2],
                ]
              : shareItems,
          },
        ],
      },
      {
        id: 'security',
        title: '6. 安全措施',
        blocks: [
          {
            kind: 'list',
            items: [
              '服务进程以平台应用账号运行，不使用 root 权限；',
              '应用目录按最小权限创建，凭据与密钥文件权限限制为 0600；',
              '本地路径访问经过授权目录校验，越界请求被拒绝；',
              '媒体地址使用短期票据，避免凭据出现在公开 URL 中。',
            ],
          },
          {
            kind: 'notice',
            html: '任何系统都无法保证绝对安全。请妥善保管 NAS 账号、网盘账号与 API Key，并及时安装系统与固件更新。',
          },
        ],
      },
      {
        id: 'rights',
        title: '7. 你的权利',
        blocks: [
          {
            kind: 'list',
            items: [
              '<strong>访问与更正：</strong>你可以在应用内查看账号、任务与设置，并随时修改。',
              '<strong>删除：</strong>解除账号绑定、清除应用数据或卸载应用即可删除本机保存的信息。',
              '<strong>撤回授权：</strong>在 UGOS 应用设置中移除文件夹授权。',
              '<strong>拒绝 AI：</strong>不启用 AI 助手即不产生任何模型服务数据传输。',
            ],
          },
          { kind: 'text', html: '如需协助，请通过下方联系方式与我们联系。我们将在合理期限内响应。' },
        ],
      },
      {
        id: 'children',
        title: '8. 未成年人',
        blocks: [
          {
            kind: 'text',
            html: '本应用面向具备完全民事行为能力的 NAS 用户，不面向未成年人单独提供服务。未成年人应在监护人指导下使用，并由监护人对其网盘账号与数据负责。',
          },
        ],
      },
      {
        id: 'policy',
        title: '9. 政策更新',
        blocks: [
          {
            kind: 'text',
            html: '功能或法规变化时，我们可能更新本政策。重大变更会在本页显著位置提示并更新「最近更新」日期。继续使用应用即表示你接受更新后的政策。',
          },
        ],
      },
      {
        id: 'contact',
        title: '10. 联系我们',
        blocks: [
          {
            kind: 'text',
            html: `开发者：${DEVELOPER}<br>官网与联系方式：<a href="${SITE}" target="_blank" rel="noopener">${SITE}</a><br>技术支持：<a href="support.html">技术支持页</a>`,
          },
        ],
      },
    ],
  }
}

const terms = (app: AppInfo): DocPage => ({
  eyebrow: 'License Agreement',
  title: '用户许可协议',
  lead: `本协议是你与 NASPK 应用开发者之间就使用${app.name.zh}（<span class="mono">${app.id}</span>）达成的法律协议。安装或使用本应用即表示你已阅读并同意本协议。`,
  meta: `生效日期：${UPDATED}　·　适用应用：${app.name.zh}（${app.id}）`,
  sections: [
    {
      id: 'license',
      title: '1. 许可授予',
      blocks: [
        {
          kind: 'text',
          html: '在遵守本协议的前提下，开发者授予你一项个人、非独占、不可转让、不可再许可的有限许可，允许你在自有或合法控制的绿联 NAS 设备上安装并使用本应用，用于管理你自己的网盘账号与文件。',
        },
        {
          kind: 'text',
          html: '<strong>本应用为闭源软件。</strong>本协议不授予你获取、修改、复制、分发应用源代码的任何权利，开发者也不对外提供源代码仓库或下载地址。应用内附带的第三方组件仍适用其各自的许可条款。',
        },
      ],
    },
    {
      id: 'restrict',
      title: '2. 使用限制',
      blocks: [
        { kind: 'text', html: '你不得：' },
        {
          kind: 'list',
          items: [
            '对本应用进行反向工程、反编译、反汇编，或试图提取源代码，法律强制允许的情形除外；',
            '复制、出租、出借、出售、转授权、分发本应用或其安装包，或在其中嵌入商业推广；',
            '移除或篡改版权、商标、许可与合规声明；',
            '使用本应用从事违法活动、传播违法内容、侵犯他人权利，或批量抓取、绕过网盘风控与限速；',
            '将本应用用于向第三方提供商业化网盘代管服务，除非获得开发者书面许可。',
          ],
        },
      ],
    },
    {
      id: 'duty',
      title: '3. 用户责任',
      blocks: [
        {
          kind: 'list',
          items: [
            '你应确保对所绑定的网盘账号拥有合法使用权，并遵守该网盘运营商的服务条款。',
            '你应自行备份重要数据。传输、同步、备份与转存均存在失败、中断或覆盖的可能。',
            '你应妥善保管 NAS 账号、网盘凭据与 AI 服务 API Key；因凭据泄露造成的损失由你自行承担。',
            '你应确保通过文件夹授权提供给应用访问的目录不包含你无权处理的他人数据。',
          ],
        },
      ],
    },
    {
      id: 'third',
      title: '4. 第三方服务',
      blocks: [
        {
          kind: 'text',
          html: '应用仅作为客户端连接你指定的网盘服务与可选的大模型服务。第三方服务的可用性、接口变更、资费、风控、限速、数据政策与法律责任由其运营方承担。开发者不对第三方服务的中断、封禁、数据丢失或内容合法性负责。',
        },
        ...(app.thunderEngine
          ? [
              {
                kind: 'text' as const,
                html: '迅雷云盘应用可能随包提供迅雷引擎组件，该组件由其权利人提供并适用其自身许可；如权利人提出要求，开发者可停止分发或调整该功能。',
              },
            ]
          : []),
      ],
    },
    {
      id: 'warranty',
      title: '5. 免责声明',
      blocks: [
        {
          kind: 'text',
          html: '本应用按「现状」提供。在适用法律允许的最大范围内，开发者不提供任何明示或默示担保，包括适销性、特定用途适用性、不侵权、无中断或无错误的担保。你使用本应用的风险由你自行承担。',
        },
      ],
    },
    {
      id: 'liability',
      title: '6. 责任限制',
      blocks: [
        {
          kind: 'text',
          html: '在适用法律允许的最大范围内，开发者不就任何间接、附带、特殊、惩罚性或后果性损害承担责任，包括数据丢失、业务中断、利润损失或第三方索赔。开发者对全部索赔的累计责任不超过你就本应用实际支付的费用总额。',
        },
      ],
    },
    {
      id: 'update',
      title: '7. 更新与终止',
      blocks: [
        {
          kind: 'list',
          items: [
            '开发者可能发布更新以适配平台或修复问题；你可自行决定是否安装。',
            '你违反本协议时，许可自动终止，你应停止使用并卸载应用。',
            '你可以随时卸载应用终止本协议；终止不影响终止前已产生的权利义务。',
          ],
        },
      ],
    },
    {
      id: 'law',
      title: '8. 法律适用与争议解决',
      blocks: [
        {
          kind: 'text',
          html: '本协议适用中华人民共和国法律。因本协议产生的争议，双方应首先友好协商；协商不成的，提交开发者所在地有管辖权的人民法院解决。',
        },
      ],
    },
    {
      title: '9. 其他',
      blocks: [
        {
          kind: 'text',
          html: '本协议与<a href="privacy.html">隐私政策</a>构成完整约定。若某条款被认定无效，不影响其余条款的效力。开发者未行使某项权利不构成对该权利的放弃。',
        },
        {
          kind: 'text',
          html: `联系方式：<a href="${SITE}" target="_blank" rel="noopener">${SITE}</a>　·　<a href="support.html">技术支持页</a>`,
        },
      ],
    },
  ],
})

const thirdParty = (app: AppInfo): DocPage => ({
  eyebrow: 'Third-Party Notices',
  title: '第三方组件与许可',
  lead: `本页列出${app.name.zh}连接的云服务、使用的开源组件与第三方专有组件。应用本身为闭源软件，不提供源代码地址；下列组件仍归其权利人所有，并适用各自许可。`,
  meta: `最近更新：${UPDATED}`,
  sections: [
    {
      title: '1. 云服务提供方',
      blocks: [
        {
          kind: 'text',
          html: '应用仅作为客户端，账号认证、文件存取、分享与转存均由对应服务商处理。请同时阅读其用户协议与隐私政策。',
        },
        {
          kind: 'table',
          head: ['应用', '服务提供方', '官方站点'],
          rows: [[app.name.zh, app.provider.zh, portalCell(app)]],
        },
      ],
    },
    {
      title: '2. 开源组件',
      blocks: [
        {
          kind: 'table',
          head: ['组件', '用途', '许可'],
          rows: [
            ['Vue 3 / Vue Router', '前端界面与路由', 'MIT'],
            ['Vite', '前端构建', 'MIT'],
            ['Nuxt UI', '界面组件库', 'MIT'],
            ['Tailwind CSS', '样式系统', 'MIT'],
            ['markdown-it', 'Markdown 渲染', 'MIT'],
            ['qrcode', '登录二维码生成', 'MIT'],
            ['Go 标准库', '后端运行时与网络能力', 'BSD-3-Clause'],
          ],
        },
        {
          kind: 'text',
          html: '以上组件按其许可证要求保留版权与许可声明。应用的分发不改变这些组件的许可条件。',
        },
      ],
    },
    {
      title: '3. 第三方专有组件',
      blocks: [
        {
          kind: 'table',
          head: ['组件', '使用场景', '说明'],
          rows: app.thunderEngine
            ? [
                [
                  '迅雷引擎（xunlei-pan-cli）',
                  '迅雷云盘应用的登录态与下载能力',
                  '由迅雷提供，属专有组件，适用其随附许可；仅在迅雷云盘应用中使用',
                ],
                ['UGOS Core SDK', '获取平台身份令牌与桌面能力', '由绿联云提供，适用其开发者条款'],
              ]
            : [['UGOS Core SDK', '获取平台身份令牌与桌面能力', '由绿联云提供，适用其开发者条款']],
        },
        {
          kind: 'text',
          html: '如第三方权利人认为分发方式需要调整，请通过<a href="support.html">技术支持页</a>与我们联系，我们将在核实后停止分发或调整相关功能。',
        },
      ],
    },
    {
      title: '4. 关于源代码',
      blocks: [
        {
          kind: 'notice',
          html: '本应用为闭源软件，不对外提供源代码仓库、下载地址或构建脚本。开源组件自身的源码请前往其官方项目获取。',
        },
      ],
    },
  ],
})

const support = (app: AppInfo): DocPage => ({
  eyebrow: 'Support',
  title: '技术支持',
  lead: `本页汇总${app.name.zh}（<span class="mono">${app.id}</span>）最常见的配置与故障处理方式。应用为闭源软件，不提供源代码仓库或公开的 issue 跟踪地址，请通过开发者官网联系我们。`,
  meta: `适用范围：${app.name.zh}（${app.id}）　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'start',
      title: '1. 快速排查',
      blocks: [
        {
          kind: 'list',
          items: [
            '确认应用已在 UGOS 应用中心正常安装并处于「已启用」状态；',
            '确认 NAS 可正常访问对应网盘官网，排除网络与 DNS 问题；',
            '在应用内重新登录一次，排除凭据过期；',
            '重启应用（非重启整机）后重试；',
            '若问题出现在升级之后，请查看应用日志中的错误码。',
          ],
        },
      ],
    },
    {
      id: 'folder',
      title: '2. 文件夹授权',
      blocks: [
        { kind: 'text', html: '应用不会申请整盘存储权限，本地目录必须由你显式授权：' },
        {
          kind: 'list',
          items: [
            '进入 UGOS「应用中心 → 已安装应用 → 本应用 → 应用设置」；',
            '在「文件夹授权」中添加需要读写的目录；',
            '授权变更后重启应用，使新的授权目录生效；',
            '撤销授权后，应用立即失去该目录的访问能力。',
          ],
        },
        {
          kind: 'notice',
          html: '若应用内看不到任何本地目录，通常表示尚未授权，或授权后未重启应用。',
        },
      ],
    },
    {
      id: 'data',
      title: '3. 数据位置与卸载清理',
      blocks: [
        {
          kind: 'table',
          head: ['内容', '位置', '卸载时'],
          rows: [
            ['账号凭据与配置', '应用数据目录', '随应用数据一并删除'],
            ['任务与备份记录', '应用数据目录', '一并删除'],
            ['运行日志', '应用日志目录', '一并删除'],
            ['你授权目录中的文件', '原有共享目录', '不会删除'],
          ],
        },
        {
          kind: 'text',
          html: '如需保留配置，请在卸载前自行备份应用数据目录。升级安装不会清空已有数据。',
        },
      ],
    },
    {
      id: 'login',
      title: '4. 登录失效与重新授权',
      blocks: [
        {
          kind: 'text',
          html: `本应用的登录方式：${app.login.zh}。${accountStatus(app)}`,
        },
        {
          kind: 'list',
          items: [
            '<strong>扫码登录：</strong>二维码有效期较短，请使用对应网盘 App 及时扫码确认。',
            '<strong>Cookie / Token 登录：</strong>凭据会随服务商策略过期，请在应用内重新绑定。',
            '<strong>账号风控：</strong>频繁登录或异地访问可能触发服务商验证，请在官方客户端完成验证后重试。',
            '<strong>不要</strong>在公开渠道粘贴 Cookie、Token 或 API Key。',
          ],
        },
      ],
    },
    {
      id: 'stream',
      title: '5. 在线播放与下载',
      blocks: [
        {
          kind: 'list',
          items: [
            '播放依赖网盘提供的直链与你的网络状况，卡顿时可尝试降低清晰度或稍后重试；',
            '部分格式受浏览器或播放器能力限制，可先下载到本地再播放；',
            '下载前需在应用内选择目标目录；未选择目录时请求会被拒绝，这是有意的安全设计；',
            '大文件下载建议保持 NAS 不休眠，断点续传记录保存在应用数据目录。',
          ],
        },
      ],
    },
    {
      id: 'ai',
      title: '6. AI 助手',
      blocks: [
        {
          kind: 'list',
          items: [
            'AI 助手默认关闭，需自行填写兼容 OpenAI 协议的服务地址、模型名称与 API Key；',
            '请求由你的 NAS 直接发往你配置的服务商，不经过开发者服务器；',
            '若返回鉴权错误，请检查 API Key、模型名与计费状态；',
            '不希望产生外部请求时，请保持该功能关闭。',
          ],
        },
      ],
    },
    {
      id: 'log',
      title: '7. 获取日志',
      blocks: [
        {
          kind: 'text',
          html: '反馈问题时可提供应用日志，但请先检查并移除其中可能包含的账号、路径等敏感信息：',
        },
        {
          kind: 'list',
          items: [
            '在应用设置中将日志级别调整为 <span class="mono">debug</span>；',
            '复现问题后，从应用日志目录导出最近的日志文件；',
            '说明应用名称、版本、NAS 型号、UGOS 版本、问题现象与发生时间。',
          ],
        },
      ],
    },
    {
      id: 'contact',
      title: '8. 联系我们',
      blocks: [
        {
          kind: 'text',
          html: `开发者：${DEVELOPER}<br>官网与联系方式：<a href="${SITE}" target="_blank" rel="noopener">${SITE}</a><br>隐私政策：<a href="privacy.html">隐私政策</a>　·　用户协议：<a href="terms.html">用户协议</a>`,
        },
      ],
    },
  ],
})

const zhDocs: DocSet = { privacy, terms, 'third-party': thirdParty, support }

export default zhDocs
