import type { AppInfo } from './apps'
import type { DocPage, DocSet } from './types'
import { CONTACT_EMAIL, QQ_GROUP_NO, QQ_GROUP_URL } from '../../contact'

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

// 域联 UniLink 是域名 / DNS 工具类应用，处理的信息与网盘应用不同，文档单独编写。
const unilinkPrivacy = (app: AppInfo): DocPage => ({
  eyebrow: 'Privacy Policy',
  title: '隐私政策',
  lead: `本政策适用于${app.name.zh}（<span class="mono">${app.id}</span>）。这是一款运行在你自有 NAS 上的域名与 DNS 管理工具，开发者不运营中转服务器。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'scope',
      title: '1. 适用范围',
      blocks: [
        {
          kind: 'text',
          html: `本政策适用于${app.name.zh}（<span class="mono">${app.id}</span>）。应用运行在用户自有的绿联 NAS（UGOS Pro）上，你的域名、解析记录、证书与 API 凭据均保存在这台设备内。其他 com.naspk.* 应用适用各自目录下的政策，可在<a href="/index.html">法律中心首页</a>查看。`,
        },
      ],
    },
    {
      id: 'data',
      title: '2. 我们处理的信息',
      blocks: [
        {
          kind: 'text',
          html: '<h3>2.1 DNS 服务商 API 凭据</h3><p>为读取与管理域名，你需要在应用内填写阿里云、腾讯云或 Cloudflare 的 API 凭据（如 AccessKey ID / Secret、API Token）。凭据仅保存在你的 NAS 应用数据目录，落盘时加密存储，文件权限限制为仅应用账号可读；日志不会输出完整密钥。开发者不会收到、上传或代为保管这些凭据。</p>',
        },
        {
          kind: 'text',
          html: '<h3>2.2 域名与解析数据</h3><p>应用会读取域名列表、DNS 记录、子域、DNSSEC 状态、域名到期时间与解析线路等信息，并把必要的缓存写入本机数据库，用于加速展示与离线查看。上述数据不会上传至开发者服务器。</p>',
        },
        {
          kind: 'text',
          html: '<h3>2.3 证书与私钥</h3><p>免费证书通过 ACME 协议向证书颁发机构申请，证书与私钥保存在应用数据目录，或你在「应用设置 → 文件夹授权」中指定的目录。私钥不会离开你的 NAS，也不会发送给开发者。</p>',
        },
        {
          kind: 'text',
          html: '<h3>2.4 任务与运行日志</h3><p>应用在本机保存任务、事件与调度记录，并写入运行日志用于故障排查。日志可能包含时间、错误码、接口路径、域名与记录名；日志不会自动上传，你可以在应用设置中调整级别或自行清理。</p>',
        },
        {
          kind: 'text',
          html: '<h3>2.5 AI 助手</h3><p>AI 助手为可选功能，默认关闭。启用时你需要自行填写兼容 OpenAI 协议的服务地址、模型与 API Key；你发送的提示词以及明确选择交给工具处理的文本会直接发往你配置的服务商，开发者不接收这些内容。API Key 仅保存在本机。</p>',
        },
        { kind: 'text', html: '<h3>2.6 我们不收集的信息</h3>' },
        {
          kind: 'list',
          items: [
            '不收集设备唯一标识、位置、通讯录、剪贴板或使用行为统计；',
            '不集成广告、统计分析或推送 SDK；',
            '不读取未授权目录，不扫描与域名管理无关的文件；',
            '不向任何第三方出售、出租或交换你的数据。',
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
          html: '应用申请联网权限（<span class="mono">NETWORK.ACCESS_INTERNET</span>）以访问 DNS 服务商接口与证书颁发机构；系统命令执行能力（<span class="mono">SYSTEM.EXEC_SYSTEM_COMMAND</span>）仅用于由系统拉起启动脚本，应用不会执行其他外部命令。证书落盘目录通过 UGOS「应用设置 → 文件夹授权」显式选择，应用不申请整盘存储权限；撤销授权或卸载后即失去相应访问能力。',
        },
      ],
    },
    {
      id: 'storage',
      title: '4. 存储位置与保留期限',
      blocks: [
        {
          kind: 'table',
          head: ['内容', '位置', '卸载时'],
          rows: [
            ['API 凭据与配置', '应用数据目录', '随应用数据一并删除'],
            ['域名与解析缓存', '应用数据目录 / 本地数据库', '一并删除'],
            ['证书与私钥', '应用数据目录或授权目录', '按授权目录策略保留'],
            ['运行日志', '应用日志目录', '一并删除'],
          ],
        },
        {
          kind: 'text',
          html: '凭据与缓存保留至你删除对应服务商连接或卸载应用为止。卸载前如需保留配置，请自行备份应用数据目录；升级安装不会清空已有数据。',
        },
      ],
    },
    {
      id: 'share',
      title: '5. 共享与第三方',
      blocks: [
        {
          kind: 'list',
          items: [
            '<strong>DNS 服务商：</strong>阿里云、腾讯云、Cloudflare 等，用于读取与写入解析记录，同时受其隐私政策约束。',
            '<strong>证书颁发机构：</strong>ACME 签发过程中会向 CA 提交域名与验证信息。',
            '<strong>公开注册数据：</strong>通过 RDAP 查询域名到期与注册信息。',
            '<strong>大模型服务方：</strong>仅在你启用 AI 助手并主动发送内容时参与。',
            '<strong>UGOS 平台：</strong>提供应用运行、身份识别与文件夹授权能力，遵循绿联云平台政策。',
          ],
        },
        {
          kind: 'text',
          html: '除上述必要交互外，应用不会主动向开发者或任何其他方传输你的数据。',
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
            '服务只监听回环地址，不向局域网暴露端口；',
            '身份由系统网关注入的请求头解析，仅管理员可用；',
            '凭据加密存储，日志脱敏；',
            '建议为 API 凭据授予最小权限，并定期轮换。',
          ],
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
            '随时在应用内删除服务商连接，清除对应 API 凭据与缓存；',
            '随时删除证书、任务记录与日志；',
            '卸载应用以清除本机数据；',
            '通过下方联系方式提出查询、更正或删除请求。',
          ],
        },
      ],
    },
    {
      id: 'minors',
      title: '8. 未成年人',
      blocks: [
        {
          kind: 'text',
          html: '本应用面向具备域名与 DNS 管理能力的成年用户，不面向未成年人提供服务。',
        },
      ],
    },
    {
      id: 'changes',
      title: '9. 政策更新',
      blocks: [
        {
          kind: 'text',
          html: '本政策可能随功能调整而更新，最新版本始终发布在<a href="privacy.html">本页面</a>，重大变更会在应用内提示。继续使用即表示你接受更新后的政策。',
        },
      ],
    },
    {
      id: 'contact',
      title: '10. 联系我们',
      blocks: [
        {
          kind: 'text',
          html: `开发者：${DEVELOPER}<br>官网：<a href="${SITE}" target="_blank" rel="noopener">${SITE}</a><br>QQ 交流群：<a href="${QQ_GROUP_URL}" target="_blank" rel="noopener">${QQ_GROUP_NO}</a>　·　邮箱：<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`,
        },
      ],
    },
  ],
})

const unilinkTerms = (app: AppInfo): DocPage => ({
  eyebrow: 'License Agreement',
  title: '用户许可协议',
  lead: `本协议是你与开发者之间关于${app.name.zh}（<span class="mono">${app.id}</span>）使用许可的约定，请在使用前完整阅读。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'grant',
      title: '1. 许可授予',
      blocks: [
        {
          kind: 'text',
          html: '在你遵守本协议的前提下，开发者授予你一项个人、非独占、不可转让、不可再许可的许可，允许你在自有的绿联 NAS 设备上安装并使用本应用。本应用为闭源软件，你获得的是使用权而非所有权。',
        },
      ],
    },
    {
      id: 'restrictions',
      title: '2. 使用限制',
      blocks: [
        {
          kind: 'list',
          items: [
            '不得对本应用进行反向工程、反编译、反汇编或尝试获取源代码，法律强制允许的情形除外；',
            '不得修改、拆分、再发布、出租、出售、转售本应用或其衍生作品；',
            '不得移除或隐藏应用中的版权、商标与其他权利标识；',
            '不得将本应用用于违反法律法规、侵害他人权益或破坏网络安全的用途。',
          ],
        },
      ],
    },
    {
      id: 'user',
      title: '3. 你的责任',
      blocks: [
        {
          kind: 'list',
          items: [
            '<strong>域名权属：</strong>你应确保对所管理的域名拥有合法管理权限；',
            '<strong>解析变更风险：</strong>DNS、DNSSEC、子域与证书变更会直接影响业务可用性，请先在测试域名验证；',
            '<strong>合规义务：</strong>域名实名、备案、内容合规等义务由你自行承担；',
            '<strong>凭据保管：</strong>API 凭据由你自行申请与保管，因凭据泄露造成的损失由你承担。',
          ],
        },
      ],
    },
    {
      id: 'third-party',
      title: '4. 第三方服务',
      blocks: [
        {
          kind: 'text',
          html: '本应用通过阿里云、腾讯云、Cloudflare 等 DNS 服务商以及 ACME 证书颁发机构、RDAP 公开查询完成功能。第三方服务的可用性、配额、资费与政策由其自行决定，开发者无法保证其始终可用或符合你的预期。',
        },
        {
          kind: 'text',
          html: '第三方组件与许可信息请参见<a href="third-party.html">第三方组件说明</a>。',
        },
      ],
    },
    {
      id: 'disclaimer',
      title: '5. 风险提示与免责',
      blocks: [
        {
          kind: 'text',
          html: '本应用按「现状」提供。DNS 变更可能导致解析中断、邮件收发失败、网站不可访问或证书签发失败，请在变更前做好记录备份并确认影响范围。在法律允许的最大范围内，开发者不对因使用或无法使用本应用造成的业务中断、数据丢失或收益损失承担责任。',
        },
      ],
    },
    {
      id: 'liability',
      title: '6. 责任限制',
      blocks: [
        {
          kind: 'text',
          html: '在任何情况下，开发者就本协议承担的赔偿责任总额不超过你就本应用实际支付的费用。部分司法辖区不允许排除默示担保或限制间接损失，上述限制可能对你不完全适用。',
        },
      ],
    },
    {
      id: 'update',
      title: '7. 更新、终止与卸载',
      blocks: [
        {
          kind: 'list',
          items: [
            '开发者可能发布更新以修复问题或增加功能，更新后继续使用视为接受更新内容；',
            '你若违反本协议，许可自动终止，你应停止使用并卸载本应用；',
            '你可以随时卸载本应用以终止本协议，卸载后本机数据按应用策略清除。',
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
          html: '本协议适用中华人民共和国法律。因本协议产生的争议，双方应友好协商解决；协商不成的，提交开发者所在地有管辖权的人民法院处理。',
        },
      ],
    },
    {
      id: 'misc',
      title: '9. 其他',
      blocks: [
        {
          kind: 'text',
          html: `本协议未尽事宜，以<a href="privacy.html">隐私政策</a>及适用法律为准。如对协议有疑问，可通过 <a href="${SITE}" target="_blank" rel="noopener">${SITE}</a> 与我们联系。`,
        },
      ],
    },
  ],
})

const unilinkThirdParty = (app: AppInfo): DocPage => ({
  eyebrow: 'Third-Party Notices',
  title: '第三方组件说明',
  lead: `${app.name.zh}在使用过程中会调用第三方云服务与开源组件，本页说明其范围与许可。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'providers',
      title: '1. 云服务提供方',
      blocks: [
        {
          kind: 'table',
          head: ['服务提供方', '用途', '说明'],
          rows: [
            ['阿里云', '域名与云解析 DNS', '使用其官方 OpenAPI 读写解析记录，受其服务条款约束'],
            ['腾讯云', '域名与 DNSPod 解析', '使用其官方 OpenAPI 读写解析记录'],
            ['Cloudflare', 'DNS 与 DNSSEC', '通过 API Token 管理区域与解析记录'],
            ['ACME 证书颁发机构', '免费 SSL 证书签发', '按 CA 的订阅者协议与速率限制执行'],
            ['RDAP 服务', '域名注册信息公开查询', '公开数据，无需账号'],
            ['大模型服务方', 'AI 助手（可选）', '由你自行配置，默认关闭'],
          ],
        },
      ],
    },
    {
      id: 'oss',
      title: '2. 开源组件',
      blocks: [
        {
          kind: 'text',
          html: '本应用包含以下开源组件，均按其原始许可分发，许可文本随组件保留：',
        },
        {
          kind: 'table',
          head: ['组件', '许可', '用途'],
          rows: [
            ['Vue 3 / Vite', 'MIT', '前端框架与构建工具'],
            ['Nuxt UI', 'MIT', '界面组件库'],
            ['vue-i18n', 'MIT', '多语言'],
            ['markdown-it', 'MIT', '内容渲染'],
            ['go-chi/chi', 'MIT', 'HTTP 路由'],
            ['go-acme/lego', 'MIT', 'ACME 证书签发'],
            ['miekg/dns', 'BSD-3-Clause', 'DNS 解析与记录处理'],
            ['modernc.org/sqlite', 'BSD-3-Clause', '本地数据库'],
            ['cloudflare-go', 'BSD-3-Clause', 'Cloudflare API 客户端'],
          ],
        },
      ],
    },
    {
      id: 'proprietary',
      title: '3. 专有组件',
      blocks: [
        {
          kind: 'text',
          html: '除上述开源组件外，应用还包含 UGOS Core SDK（由绿联云提供）与本应用的闭源业务代码。这些组件不适用任何开源许可，未经授权不得提取、分发或用于其他产品。',
        },
      ],
    },
    {
      id: 'notice',
      title: '4. 许可声明',
      blocks: [
        {
          kind: 'notice',
          html: '本页仅用于满足开源许可的署名与告知义务，不改变任何组件的许可条款。若本页与组件附带许可文本存在冲突，以组件原始许可文本为准。',
        },
      ],
    },
  ],
})

const unilinkSupport = (app: AppInfo): DocPage => ({
  eyebrow: 'Support',
  title: '技术支持',
  lead: `以下是${app.name.zh}常见问题的排查顺序，请按步骤确认后再反馈。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'quick',
      title: '1. 快速排查',
      blocks: [
        {
          kind: 'list',
          items: [
            '确认应用在 UGOS 应用中心处于「已启用」状态；',
            '确认 NAS 可正常访问对应云服务商与证书颁发机构，排除网络与 DNS 问题；',
            '在应用内重新校验 API 凭据，排除凭据过期或权限不足；',
            '重启应用（非重启整机）后重试；',
            '若问题出现在升级之后，请查看应用日志中的错误码。',
          ],
        },
      ],
    },
    {
      id: 'credential',
      title: '2. 凭据与连接',
      blocks: [
        {
          kind: 'list',
          items: [
            '阿里云建议使用仅含云解析权限的 RAM 子账号 AccessKey；',
            '腾讯云建议使用仅含 DNSPod 权限的子账号密钥；',
            'Cloudflare 建议使用限定 Zone.DNS 编辑权限的 API Token，而非全局 Key；',
            '提示鉴权失败时，请先在厂商控制台验证凭据可用性与 IP 白名单设置。',
          ],
        },
      ],
    },
    {
      id: 'dns',
      title: '3. 解析记录与生效',
      blocks: [
        {
          kind: 'list',
          items: [
            '记录写入成功后仍需等待 TTL 与递归缓存过期，通常为几分钟到数小时；',
            '确认域名的权威 NS 已指向当前管理的服务商；',
            'DNSSEC 配置错误会导致解析失败，变更前请谨慎操作；',
            '批量修改建议先在测试子域验证，再应用到主域名。',
          ],
        },
      ],
    },
    {
      id: 'cert',
      title: '4. 证书签发',
      blocks: [
        {
          kind: 'list',
          items: [
            'HTTP-01 验证需要域名可被公网访问，且 80 端口可达；',
            '使用 DNS-01 验证时，请确保 API 凭据具备写入 TXT 记录的权限；',
            '检查域名是否配置了 CAA 记录限制签发机构；',
            '证书落盘目录需要在「应用设置 → 文件夹授权」中授权后才能写入。',
          ],
        },
      ],
    },
    {
      id: 'ddns',
      title: '5. 动态域名（DDNS）',
      blocks: [
        {
          kind: 'list',
          items: [
            '确认记录的 TTL 设置较短，以便公网 IP 变更后快速生效；',
            '若公网 IP 由运营商 NAT 分配，DDNS 无法解决端口不可达问题；',
            '调度失败时可在任务页面查看最近一次执行结果与错误信息。',
          ],
        },
      ],
    },
    {
      id: 'data',
      title: '6. 数据位置与卸载清理',
      blocks: [
        {
          kind: 'table',
          head: ['内容', '位置', '卸载时'],
          rows: [
            ['API 凭据与配置', '应用数据目录', '随应用数据一并删除'],
            ['域名与解析缓存', '应用数据目录 / 本地数据库', '一并删除'],
            ['证书与私钥', '应用数据目录或授权目录', '按授权目录策略保留'],
            ['运行日志', '应用日志目录', '一并删除'],
          ],
        },
        {
          kind: 'text',
          html: '如需保留配置，请在卸载前自行备份应用数据目录。升级安装不会清空已有数据。',
        },
      ],
    },
    {
      id: 'log',
      title: '7. 获取日志',
      blocks: [
        {
          kind: 'text',
          html: '反馈问题时可提供应用日志，但请先移除其中可能包含的域名、记录名与凭据信息：',
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
          html: `开发者：${DEVELOPER}<br>官网：<a href="${SITE}" target="_blank" rel="noopener">${SITE}</a><br>QQ 交流群：<a href="${QQ_GROUP_URL}" target="_blank" rel="noopener">${QQ_GROUP_NO}</a>　·　邮箱：<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`,
        },
      ],
    },
  ],
})

// Cloudflare Tunnel 是内网穿透工具，不处理文件与相册，文档单独编写。
const cftunnelPrivacy = (app: AppInfo): DocPage => ({
  eyebrow: 'Privacy Policy',
  title: '隐私政策',
  lead: `本政策适用于${app.name.zh}（<span class="mono">${app.id}</span>）。这是一款运行在你自有 NAS 上的 Cloudflare Tunnel 管理工具，开发者不运营中转服务器，也不代理你的流量。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'scope',
      title: '1. 适用范围',
      blocks: [
        {
          kind: 'text',
          html: `本政策适用于${app.name.zh}（<span class="mono">${app.id}</span>）。应用运行在用户自有的绿联 NAS（UGOS Pro）上，Tunnel 配置、Cloudflare 凭据与运行日志都保存在这台设备内。其他 com.naspk.* 应用适用各自目录下的政策，可在<a href="/index.html">法律中心首页</a>查看。`,
        },
      ],
    },
    {
      id: 'data',
      title: '2. 我们处理的信息',
      blocks: [
        {
          kind: 'text',
          html: '<h3>2.1 Cloudflare 凭据</h3><p>为创建与管理 Tunnel、读取域名列表并写入 DNS 记录，你需要在应用内填写 Cloudflare API Token；部分流程还会生成或粘贴 Tunnel Token。凭据仅保存在你的 NAS 应用数据目录，文件权限限制为仅应用账号可读，日志不会输出完整 Token。开发者不会收到、上传或代为保管这些凭据。</p>',
        },
        {
          kind: 'text',
          html: '<h3>2.2 Tunnel 与 DNS 数据</h3><p>应用通过 Cloudflare 官方 API 读取账号下的 Tunnel 列表、连接状态、远端 ingress 规则、域名与解析记录，并在本机保存必要的配置缓存用于展示与恢复。上述数据不会上传至开发者服务器。</p>',
        },
        {
          kind: 'text',
          html: '<h3>2.3 运行日志</h3><p>应用在本机保存 Tunnel 启停记录、cloudflared 输出与错误信息，用于故障排查。日志可能包含时间、连接器 ID、错误码与主机名；日志不会自动上传，你可以在应用内查看或清空。</p>',
        },
        { kind: 'text', html: '<h3>2.4 我们不收集的信息</h3>' },
        {
          kind: 'list',
          items: [
            '不读取、不上传你通过 Tunnel 暴露的网站内容与访问日志；',
            '不收集设备唯一标识、位置、通讯录或使用行为统计；',
            '不集成广告、统计分析或推送 SDK；',
            '不向任何第三方出售、出租或交换你的数据。',
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
          html: '应用申请联网权限（<span class="mono">NETWORK.ACCESS_INTERNET</span>）以访问 Cloudflare API 与 Tunnel 边缘节点；系统命令执行能力（<span class="mono">SYSTEM.EXEC_SYSTEM_COMMAND</span>）仅用于由系统拉起启动脚本，应用不会执行其他外部命令。应用以普通应用账号运行，不申请 root 权限，也不修改系统网络参数。',
        },
      ],
    },
    {
      id: 'storage',
      title: '4. 存储位置与保留期限',
      blocks: [
        {
          kind: 'table',
          head: ['内容', '位置', '卸载时'],
          rows: [
            ['Cloudflare 凭据与 Tunnel 配置', '应用数据目录', '随应用数据一并删除'],
            ['Tunnel 与 DNS 缓存', '应用数据目录', '一并删除'],
            ['运行日志', '应用日志目录', '一并删除'],
          ],
        },
        {
          kind: 'text',
          html: '配置保留至你删除对应凭据或卸载应用为止。卸载前如需保留配置，请自行备份应用数据目录；升级安装不会清空已有数据。',
        },
      ],
    },
    {
      id: 'share',
      title: '5. 共享与第三方',
      blocks: [
        {
          kind: 'list',
          items: [
            '<strong>Cloudflare：</strong>应用通过其官方 API 管理 Tunnel 与 DNS 记录，网络流量由 Cloudflare 边缘节点转发，同时受其隐私政策与服务条款约束。',
            '<strong>cloudflared：</strong>随应用内置 Cloudflare 官方开源客户端，仅与 Cloudflare 边缘节点通信。',
            '<strong>开发者：</strong>不接收上述任何数据；仅在排障时由你主动提供的日志片段才会被知悉。',
          ],
        },
      ],
    },
    {
      id: 'rights',
      title: '6. 你的选择',
      blocks: [
        {
          kind: 'text',
          html: '你可以随时在应用内修改或删除 Cloudflare 凭据、停止 Tunnel，或卸载应用以清除本机数据；也可以在 Cloudflare 控制台撤销对应 API Token，使其立即失效。',
        },
      ],
    },
  ],
})

const cftunnelTerms = (app: AppInfo): DocPage => ({
  eyebrow: 'License Agreement',
  title: '用户许可协议',
  lead: `本协议是你与 NASPK 应用开发者之间就使用${app.name.zh}（<span class="mono">${app.id}</span>）达成的法律协议。安装或使用本应用即表示你已阅读并同意本协议。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'grant',
      title: '1. 许可授予',
      blocks: [
        {
          kind: 'text',
          html: '开发者授予你一项非独占、不可转让、不可再许可的许可，允许你在自有或有权管理的绿联 NAS 设备上安装并使用本应用，用于管理你自己的 Cloudflare 账号与域名。',
        },
      ],
    },
    {
      id: 'limits',
      title: '2. 使用限制',
      blocks: [
        {
          kind: 'list',
          items: [
            '不得对本应用进行反向工程、反编译、拆解或修改，不得移除版权与许可声明；',
            '不得将本应用或其修改版本用于商业再分发、出租、出售或提供付费代管服务；',
            '不得使用本应用绕过 Cloudflare 服务条款、滥用免费额度或从事违法活动；',
            '不得通过 Tunnel 暴露违反所在地法律法规的内容或服务。',
          ],
        },
      ],
    },
    {
      id: 'third',
      title: '3. 第三方服务与账号',
      blocks: [
        {
          kind: 'text',
          html: '本应用依赖 Cloudflare 提供的 Tunnel、DNS 与 API 服务，并内置其官方开源客户端 cloudflared。你需要自行注册 Cloudflare 账号、准备域名并遵守其服务条款与合理使用政策。Cloudflare 的服务可用性、免费额度、区域限制与接口变更不由开发者控制。',
        },
      ],
    },
    {
      id: 'availability',
      title: '4. 可用性与变更',
      blocks: [
        {
          kind: 'text',
          html: '开发者会尽力维护应用与 Cloudflare 接口的兼容性，并可能通过版本更新调整功能、内置组件版本或界面。因上游接口调整、账号权限不足、网络环境限制或设备故障导致的功能不可用，开发者不承担赔偿责任。',
        },
      ],
    },
    {
      id: 'warranty',
      title: '5. 免责与责任限制',
      blocks: [
        {
          kind: 'text',
          html: '本应用按「现状」提供，不附带任何明示或默示担保。因使用或无法使用本应用导致的访客流量中断、DNS 记录变更、数据丢失或间接损失，开发者不承担责任；在法律允许的最大范围内，开发者的累计责任不超过你为该应用实际支付的费用。',
        },
      ],
    },
    {
      id: 'change',
      title: '6. 协议变更与终止',
      blocks: [
        {
          kind: 'text',
          html: '开发者可能随版本更新调整本协议，更新后的协议随应用或法律中心页面公布。你若在更新后继续使用，视为接受新协议；不同意时可停止使用并卸载应用。你违反本协议时，许可自动终止。',
        },
      ],
    },
  ],
})

const cftunnelThirdParty = (app: AppInfo): DocPage => ({
  eyebrow: 'Third-Party Notices',
  title: '第三方组件与许可',
  lead: `本页列出${app.name.zh}使用的云服务、开源组件与第三方组件。应用本身为闭源软件，不提供源代码地址；下列组件仍归其权利人所有，并适用各自许可。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'cloudflare',
      title: '1. Cloudflare 服务',
      blocks: [
        {
          kind: 'table',
          head: ['服务', '用途', '条款'],
          rows: [
            ['Cloudflare Tunnel', '建立出站连接并将公网请求转发到 NAS', 'Cloudflare 服务条款'],
            ['Cloudflare API', '管理 Tunnel、ingress 规则与 DNS 记录', 'Cloudflare API 使用条款'],
            ['Cloudflare DNS', '为隧道创建或更新 CNAME 记录', 'Cloudflare 服务条款'],
          ],
        },
      ],
    },
    {
      id: 'cloudflared',
      title: '2. cloudflared',
      blocks: [
        {
          kind: 'text',
          html: '应用内置 Cloudflare 官方开源客户端 <span class="mono">cloudflared</span>，以独立二进制的形式随安装包分发，按 CPU 架构分别放置。该组件遵循 Apache License 2.0，版权归 Cloudflare, Inc. 所有；其源代码可在 Cloudflare 官方仓库获取，许可全文随二进制一同提供。',
        },
        { kind: 'notice', html: 'cloudflared 由 Cloudflare 维护，不属于本应用的闭源部分；本应用仅负责其进程启停与日志展示。' },
      ],
    },
    {
      id: 'oss',
      title: '3. 开源组件',
      blocks: [
        {
          kind: 'table',
          head: ['组件', '用途', '许可'],
          rows: [
            ['Go 标准库与第三方库', '后端服务与 Cloudflare API 调用', 'BSD-3-Clause / MIT'],
            ['Vue 3', '前端界面', 'MIT'],
            ['Vite 与构建工具链', '前端构建', 'MIT'],
          ],
        },
      ],
    },
    {
      id: 'proprietary',
      title: '4. 专有部分',
      blocks: [
        {
          kind: 'text',
          html: '应用后端服务、前端业务页面、图标与文案为开发者专有，受著作权法保护。除本协议明确授予的权利外，不授予其他权利。',
        },
      ],
    },
    {
      id: 'trademark',
      title: '5. 商标',
      blocks: [
        {
          kind: 'text',
          html: 'Cloudflare、cloudflared 及相关标识为 Cloudflare, Inc. 的商标。本应用与 Cloudflare 无隶属或背书关系，名称仅用于说明所连接的服务。',
        },
      ],
    },
  ],
})

const cftunnelSupport = (app: AppInfo): DocPage => ({
  eyebrow: 'Support',
  title: '技术支持',
  lead: `本页汇总${app.name.zh}（<span class="mono">${app.id}</span>）最常见的配置与故障处理方式。完整使用文档请访问 <a href="https://tunnel.naspk.com/" target="_blank" rel="noopener">tunnel.naspk.com</a>。`,
  meta: `生效日期：${UPDATED}　·　最近更新：${UPDATED}`,
  sections: [
    {
      id: 'prepare',
      title: '1. 使用前准备',
      blocks: [
        {
          kind: 'list',
          items: [
            '一个 Cloudflare 账号，且域名已由 Cloudflare 托管（NS 已切换）；',
            '确定要从公网访问的 NAS 服务地址与端口；',
            '具备创建 API Token 的账号权限。',
          ],
        },
        {
          kind: 'text',
          html: '详细的账号准备、Token 权限与首个 Tunnel 的创建步骤见 <a href="https://tunnel.naspk.com/" target="_blank" rel="noopener">tunnel.naspk.com</a>。',
        },
      ],
    },
    {
      id: 'token',
      title: '2. 配置 Cloudflare API Token',
      blocks: [
        {
          kind: 'text',
          html: '在 Cloudflare 控制台创建 API Token，至少包含：账号级 <span class="mono">Cloudflare Tunnel</span> 编辑权限、区域级 <span class="mono">DNS</span> 编辑权限与 <span class="mono">Zone</span> 读取权限，并把范围限制到需要使用的账号与域名。填写后点击「测试连接」，返回账号与 Tunnel 数量即表示配置正确。',
        },
        { kind: 'notice', html: 'Token 只保存在你的 NAS 上。若怀疑泄露，请立即在 Cloudflare 控制台撤销该 Token，再在应用中重新绑定。' },
      ],
    },
    {
      id: 'run',
      title: '3. 创建与运行 Tunnel',
      blocks: [
        {
          kind: 'list',
          items: [
            '在「Tunnel 列表」新建 Tunnel，名称可用小写字母、数字与连字符；',
            '为 Tunnel 配置 ingress 规则，指向 NAS 上的实际服务地址（如 <span class="mono">http://127.0.0.1:8080</span>）；',
            '启动后「运行状态」显示已连接，且日志中出现已注册的连接器；',
            '需要随 NAS 开机自动连接时，在系统配置中开启自动启动。',
          ],
        },
      ],
    },
    {
      id: 'dns',
      title: '4. 域名与 DNS 记录',
      blocks: [
        {
          kind: 'text',
          html: '为 Tunnel 添加自定义域名时，应用会创建指向 <span class="mono">&lt;tunnel-id&gt;.cfargotunnel.com</span> 的 CNAME 记录。若记录已存在，请先确认其未被其他服务占用；解析生效时间受 Cloudflare 与本地 DNS 缓存影响。',
        },
      ],
    },
    {
      id: 'faq',
      title: '5. 常见问题排查',
      blocks: [
        {
          kind: 'table',
          head: ['现象', '排查方向'],
          rows: [
            ['测试连接失败', 'Token 权限不足、已被撤销，或账号 ID 填写错误'],
            ['Tunnel 启动后未连接', 'NAS 无法访问外网、DNS 解析异常，或上游限制 UDP；可在设置中切换 http2 协议重试'],
            ['域名访问 502', 'ingress 指向的服务未启动，或地址端口填写错误'],
            ['访问提示 1033', 'Tunnel 已创建但连接器未上线，检查运行状态与日志'],
            ['重启后未自动连接', '未开启自动启动，或启动时外网尚未就绪'],
          ],
        },
      ],
    },
    {
      id: 'help',
      title: '6. 获取帮助',
      blocks: [
        {
          kind: 'text',
          html: '排查前请先在应用内「运行日志」复制出错时间段的内容。完整文档、示例配置与更新说明见 <a href="https://tunnel.naspk.com/" target="_blank" rel="noopener">tunnel.naspk.com</a>；也可通过开发者官网联系我们。',
        },
      ],
    },
  ],
})

const privacy = (app: AppInfo): DocPage => {
  if (app.domainTool) return unilinkPrivacy(app)
  if (app.tunnelTool) return cftunnelPrivacy(app)
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

const terms = (app: AppInfo): DocPage =>
  app.domainTool ? unilinkTerms(app) : app.tunnelTool ? cftunnelTerms(app) : ({
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

const thirdParty = (app: AppInfo): DocPage =>
  app.domainTool ? unilinkThirdParty(app) : app.tunnelTool ? cftunnelThirdParty(app) : ({
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

const support = (app: AppInfo): DocPage =>
  app.domainTool ? unilinkSupport(app) : app.tunnelTool ? cftunnelSupport(app) : ({
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
          html: `开发者：${DEVELOPER}<br>官网：<a href="${SITE}" target="_blank" rel="noopener">${SITE}</a><br>QQ 交流群：<a href="${QQ_GROUP_URL}" target="_blank" rel="noopener">${QQ_GROUP_NO}</a>　·　邮箱：<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a><br>隐私政策：<a href="privacy.html">隐私政策</a>　·　用户协议：<a href="terms.html">用户协议</a>`,
        },
      ],
    },
  ],
})

const zhDocs: DocSet = { privacy, terms, 'third-party': thirdParty, support }

export default zhDocs
