# PDF 发票报销处理系统

一个基于 FastAPI 和 React 的 PDF 发票处理系统，支持电子发票的金额汇总、重复检测、合并和打印格式生成，同时提供费用报销相关的表单功能。

## 依赖环境

* python 3.10
* node v20 
* docker v18 +
* docker-compose  v2.40 +

## 功能特性

### PDF 发票处理
- **金额汇总**：自动从 PDF 发票中提取金额并计算总和（支持电子发票、铁路票等）
- **重复检测**：检测文件夹中的重复发票号码
- **PDF 合并**：将多个 PDF 发票文件合并为一个文件
- **打印格式**：生成适合打印的 2x2 布局格式（N-up）

### 表单功能
- **差旅费报销单**：差旅费用报销表单
- **出差补助申请表**：出差补助申请表单
- **费用报销单**：通用费用报销表单
- **票证粘贴单**：票证粘贴表单

## 技术栈

### 后端
- **框架**：FastAPI
- **Python 版本**：3.10+
- **PDF 处理库**：
  - `pypdf` (6.1.1)
  - `PyPDF2` (3.0.1)
  - `pdfminer.six` (20250506)
- **Web 服务器**：Uvicorn

### 前端
- **框架**：React 18 + TypeScript
- **UI 组件库**：Ant Design 5
- **构建工具**：Rsbuild
- **路由**：React Router 7
- **HTTP 客户端**：Axios

## 项目结构

```
pdf-invoices/
├── server/                 # 后端服务
│   ├── main.py            # FastAPI 主应用
│   ├── summer.py          # 金额汇总模块
│   ├── number.py          # 发票重复检测模块
│   ├── margin.py          # PDF 合并模块
│   ├── print.py           # 打印格式生成模块
│   ├── pdfs/              # PDF 文件存储目录
│   ├── static/            # 静态文件目录
│   └── requirements.txt   # Python 依赖
├── web/                   # 前端应用
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── components/    # 通用组件
│   │   ├── api/           # API 接口
│   │   └── utils/         # 工具函数
│   └── package.json       # 前端依赖
├── scripts/               # 部署脚本
│   ├── Dockerfile         # Docker 镜像构建文件
│   └── docker-compose.yaml # Docker Compose 配置
└── images/                # 图片资源
```

## 安装与运行

### 环境要求
- Python 3.10+
- Node.js 18+ (推荐使用 pnpm)

### 后端安装

1. 安装 Python 依赖：
```bash
cd server
pip install -r requirements.txt
```

2. 启动后端服务：
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

后端服务将在 `http://localhost:8000` 启动。

### 前端安装

1. 安装前端依赖：
```bash
cd web
pnpm install
```

2. 启动开发服务器：
```bash
pnpm dev
```

前端应用将在 `http://localhost:3000` 启动。

3. 构建生产版本：
```bash
pnpm build
```

构建完成后，将 `web/dist` 目录中的文件复制到 `server/static` 目录。

## API 接口

### 获取 PDF 文件夹信息
```
GET /api/info
```
返回 PDF 文件夹路径信息。

### 发票金额汇总
```
GET /api/summer
```
返回所有 PDF 发票的总金额。

### 发票重复检测
```
GET /api/check
```
返回重复的发票号码列表。

### 发票文件合并
```
GET /api/margin
```
将 `pdfs/` 目录中的所有 PDF 文件合并为 `all_invoices.pdf`。

### 生成打印格式
```
GET /api/print
```
将 `all_invoices.pdf` 转换为 2x2 布局的打印格式，输出为 `print_output.pdf`。

## Docker 部署

### 构建镜像
```bash
cd scripts
docker build -t invoices-server-image -f Dockerfile ..
```

### 使用 Docker Compose
```bash
cd scripts
docker-compose up -d
```

服务将在 `http://localhost:8000` 启动。

## 使用说明

### PDF 发票处理

1. **准备 PDF 文件**：将需要处理的 PDF 发票文件放置在 `server/pdfs/` 目录中。

2. **金额汇总**：
   - 通过 Web 界面点击"金额汇总"按钮
   - 或直接调用 API：`GET /api/summer`

3. **重复检测**：
   - 通过 Web 界面点击"重复检测"按钮
   - 或直接调用 API：`GET /api/check`

4. **合并 PDF**：
   - 通过 Web 界面点击"合并 PDF"按钮
   - 或直接调用 API：`GET /api/margin`
   - 合并后的文件将保存为 `server/all_invoices.pdf`

5. **生成打印格式**：
   - 通过 Web 界面点击"生成打印格式"按钮
   - 或直接调用 API：`GET /api/print`
   - 打印格式文件将保存为 `server/print_output.pdf`

### 表单使用

1. 访问首页，选择相应的表单类型
2. 填写表单信息
3. 点击"打印"按钮进行打印或保存为 PDF

## 注意事项

1. **PDF 文件路径**：确保 PDF 文件放置在正确的目录中（默认：`server/pdfs/`）
2. **文件格式**：支持标准 PDF 格式的电子发票和铁路票
3. **金额提取**：系统会自动识别发票中的金额，如果识别失败，会在控制台显示错误信息
4. **发票号码**：系统支持提取 16-20 位的发票号码进行重复检测

## 开发说明

### 后端开发
- 后端代码位于 `server/` 目录
- 主要 API 接口定义在 `server/main.py`
- 各个功能模块位于独立的 Python 文件中

### 前端开发
- 前端代码位于 `web/` 目录
- 使用 Rsbuild 作为构建工具
- 页面组件位于 `web/src/pages/`
- API 调用封装在 `web/src/api/`


## 贡献

欢迎提交 Issue 和 Pull Request！

