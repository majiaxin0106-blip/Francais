# 🇫🇷 Français - 法语学习 APP

一款功能全面的法语学习 Web 应用，支持语法、听力和口语练习。

## ✨ 功能特性

### 📚 语法练习
- 动词变位练习（être, avoir, 规则动词等）
- 时态练习（现在时、过去时、将来时等）
- 交互式选择题
- 即时反馈和解释

### 👂 听力练习
- 使用浏览器 TTS（文本转语音）播放法语音频
- 听力理解测试
- 可查看原文
- 支持多次播放

### 🗣️ 口语练习
- 使用浏览器语音识别技术
- 发音相似度评分
- 实时反馈
- 音标提示

### 🎯 多水平支持
- A1-A2：初学者
- B1-B2：中级
- C1-C2：高级

### 📊 学习进度
- 学习次数统计
- 正确率追踪
- 连续学习天数

## 📱 如何在 iPhone 上安装

### 方法一：本地服务器安装（推荐）

#### 步骤 1：启动本地服务器

在电脑上打开终端，进入项目目录并启动服务器：

\`\`\`bash
cd ~/Downloads/Francais
python3 -m http.server 8000
\`\`\`

或者使用 Node.js：

\`\`\`bash
cd ~/Downloads/Francais
npx serve
\`\`\`

#### 步骤 2：获取电脑 IP 地址

在终端运行：

\`\`\`bash
ifconfig | grep "inet " | grep -v 127.0.0.1
\`\`\`

记下显示的 IP 地址，例如：`192.168.1.100`

#### 步骤 3：在 iPhone 上访问

1. 确保 iPhone 和电脑连接同一个 Wi-Fi
2. 在 iPhone 的 Safari 浏览器中输入：`http://你的IP地址:8000`
   - 例如：`http://192.168.1.100:8000`

#### 步骤 4：添加到主屏幕

1. 点击底部的 **分享** 按钮 📤
2. 向下滚动，选择 **添加到主屏幕**
3. 点击 **添加**
4. 现在您可以像原生 APP 一样使用了！🎉

### 方法二：部署到在线服务器

如果想长期使用，可以将应用部署到以下免费服务：

#### 使用 GitHub Pages

1. 在 GitHub 创建新仓库
2. 上传所有文件
3. 在 Settings > Pages 中启用 GitHub Pages
4. 访问提供的 URL

#### 使用 Vercel 或 Netlify

1. 将项目上传到 GitHub
2. 在 Vercel/Netlify 中导入项目
3. 一键部署
4. 使用提供的 URL 访问

## 🛠️ 技术栈

- **纯 HTML/CSS/JavaScript** - 无需框架
- **PWA (Progressive Web App)** - 可离线使用
- **Web Speech API** - 语音识别和 TTS
- **LocalStorage** - 保存学习进度

## 📂 项目结构

\`\`\`
Francais/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── app.js             # 应用逻辑
├── manifest.json      # PWA 配置
├── sw.js              # Service Worker（离线支持）
├── icon-192.svg       # 应用图标 (192x192)
├── icon-512.svg       # 应用图标 (512x512)
├── icon-192.png       # PNG 图标
├── icon-512.png       # PNG 图标
└── README.md          # 说明文档
\`\`\`

## 🎯 使用方法

1. **选择水平**：首次打开时选择您的法语水平（A1-C2）
2. **选择练习**：点击主页的功能卡片开始练习
3. **完成练习**：按照提示完成语法、听力或口语练习
4. **查看进度**：点击底部"进度"查看学习统计

## ⚠️ 浏览器兼容性

### 完全支持
- Safari (iOS 14+)
- Chrome (Android/Desktop)
- Edge (Desktop)

### 功能说明
- **语音识别**：需要 Safari 14+ 或 Chrome
- **文本转语音**：所有现代浏览器
- **离线使用**：需要首次在线访问后

## 🔧 自定义内容

您可以编辑 `app.js` 中的 `learningData` 对象来添加更多学习内容：

\`\`\`javascript
const learningData = {
    grammar: {
        A1: [
            {
                question: "您的问题",
                options: ["选项1", "选项2", "选项3", "选项4"],
                correct: 0,  // 正确答案的索引
                explanation: "解释"
            }
            // 添加更多题目...
        ]
    }
    // 添加更多内容...
}
\`\`\`

## 📝 待改进功能

- [ ] 添加更多学习内容
- [ ] 支持学习卡片
- [ ] 添加生词本功能
- [ ] 支持学习提醒
- [ ] 添加成就系统
- [ ] 支持导出学习数据

## 🤝 贡献

欢迎提出改进建议！

## 📄 许可证

MIT License - 自由使用和修改

---

**开发信息**
- 开发时间：2026年1月
- 技术支持：Claude Code
- 版本：1.0.0
