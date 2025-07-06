# 狗狗品种科普 API Demo

这是一个基于 Netlify Functions 的狗狗品种科普 API 演示项目，支持一键部署到 Netlify。

## 🚀 功能特点

- **API 接口**: 提供狗狗品种科普信息的 RESTful API
- **前端界面**: 美观的 HTML 页面，支持搜索和展示狗狗品种信息
- **一键部署**: 支持 Netlify 一键部署
- **响应式设计**: 适配各种设备屏幕

## 📋 API 接口说明

### 申请API Key

**请求方式**: POST  
**接口地址**: `/.netlify/functions/apply-api-key`  
**参数**: 
- `email` (必需): 邮箱地址

**示例请求**:
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/apply-api-key \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com"}'
```

**响应格式**:
```json
{
  "success": true,
  "message": "API Key申请成功",
  "apiKey": "dk_test_1234567890abcdef1234567890abcdef",
  "email": "your-email@example.com",
  "note": "这是演示用的API Key，可以重复使用"
}
```

**注意**: 演示环境使用固定的API Key，可以重复使用，无需重复申请。

### 获取狗狗品种信息

**请求方式**: GET  
**接口地址**: `/.netlify/functions/dog-breeds`  
**参数**: 
- `breed` (必需): 狗狗品种名称
- `api_key` (必需): 您的API Key

**示例请求**:
```
GET /.netlify/functions/dog-breeds?breed=金毛&api_key=dk_test_1234567890abcdef1234567890abcdef
```

**响应格式**:
```json
{
  "success": true,
  "data": {
    "name": "金毛寻回犬",
    "description": "金毛寻回犬是一种大型犬，性格温顺友善...",
    "characteristics": ["性格温顺友善", "智商很高，容易训练", ...],
    "image": "https://images.unsplash.com/...",
    "origin": "苏格兰",
    "lifespan": "10-12年",
    "size": "大型犬"
  }
}
```

## 🐕 支持的狗狗品种

- 金毛
- 拉布拉多
- 哈士奇
- 柴犬
- 柯基
- 边牧
- 泰迪
- 萨摩耶

## 🛠️ 本地开发

### 前置要求

- Node.js 18+
- Netlify CLI (可选，用于本地测试)

### 安装依赖

```bash
# 安装 Netlify CLI (可选)
npm install -g netlify-cli

# 或者使用项目依赖
npm install
```

### 本地运行

```bash
# 使用 Netlify CLI 本地运行
netlify dev

# 或者直接打开 public/index.html 文件
```

## 🚀 部署到 Netlify

### 方法一：GitHub 集成部署

1. 将代码推送到 GitHub 仓库
2. 登录 [Netlify](https://netlify.com)
3. 点击 "New site from Git"
4. 选择你的 GitHub 仓库
5. 设置构建选项：
   - Build command: 留空
   - Publish directory: `public`
6. 点击 "Deploy site"

### 方法二：拖拽部署

1. 运行构建命令 (可选)
2. 将 `public` 文件夹拖拽到 Netlify 部署页面
3. 自动部署完成

### 方法三：Netlify CLI 部署

```bash
# 登录 Netlify
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

## 📁 项目结构

```
api_dev_demo01/
├── functions/
│   ├── dog-breeds.js          # 狗狗品种API函数
│   └── apply-api-key.js       # API Key申请函数
├── public/
│   ├── index.html             # 前端主页面
│   └── test.html              # API测试页面
├── python_test_tool.py        # Python测试工具
├── requirements.txt           # Python依赖
├── netlify.toml               # Netlify 配置
├── package.json               # 项目配置
├── .gitignore                 # Git忽略文件
├── README.md                  # 项目说明
└── prompt.md                  # 需求文档
```

## 🔧 技术栈

- **后端**: Netlify Functions (Node.js)
- **前端**: HTML5 + CSS3 + JavaScript
- **部署**: Netlify
- **图片**: Unsplash API

## 📝 使用示例

### 通过前端界面

1. 打开部署后的网站
2. 点击"申请API Key"按钮，输入邮箱地址申请API Key
3. 保存API Key后，在搜索框中输入狗狗品种名称
4. 点击搜索或按回车键
5. 查看详细的品种信息

### 直接调用 API

```javascript
// 申请API Key
fetch('https://your-site.netlify.app/.netlify/functions/apply-api-key', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: 'your-email@example.com' })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('API Key:', data.apiKey);
  }
});

// 获取金毛信息
fetch('https://your-site.netlify.app/.netlify/functions/dog-breeds?breed=金毛&api_key=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(data.data);
    }
  });
```

### Python 测试工具

项目包含一个完整的Python测试工具，可以自动测试所有API功能：

```bash
# 安装依赖
pip install -r requirements.txt

# 运行测试工具（自动申请API Key）
python python_test_tool.py https://your-site.netlify.app

# 使用现有API Key运行测试
python python_test_tool.py https://your-site.netlify.app dk_test_1234567890abcdef1234567890abcdef
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License