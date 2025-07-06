# 狗狗品种科普 API Demo

这是一个基于 Netlify Functions 的狗狗品种科普 API 演示项目，支持一键部署到 Netlify。

## 🚀 功能特点

- **API 接口**: 提供狗狗品种科普信息的 RESTful API
- **前端界面**: 美观的 HTML 页面，支持搜索和展示狗狗品种信息
- **一键部署**: 支持 Netlify 一键部署
- **响应式设计**: 适配各种设备屏幕

## 📋 API 接口说明

### 获取狗狗品种信息

**请求方式**: GET  
**接口地址**: `/.netlify/functions/dog-breeds`  
**参数**: 
- `breed` (必需): 狗狗品种名称

**示例请求**:
```
GET /.netlify/functions/dog-breeds?breed=金毛
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
│   └── dog-breeds.js          # API 函数
├── public/
│   └── index.html             # 前端页面
├── netlify.toml               # Netlify 配置
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
2. 在搜索框中输入狗狗品种名称
3. 点击搜索或按回车键
4. 查看详细的品种信息

### 直接调用 API

```javascript
// 获取金毛信息
fetch('https://your-site.netlify.app/.netlify/functions/dog-breeds?breed=金毛')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(data.data);
    }
  });
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License