# Vue TodoList 安全测试项目执行计划

## 项目概述
创建一个 Vue3 + TypeScript + Vite 实现的 TodoList 应用，用于测试基于 Claude Code 的 AI 代码审查工具的检测能力。

## 技术栈
- Vue 3.4+ (Composition API)
- TypeScript (严格模式)
- Vite 5+
- Pinia (状态管理)
- Vue Router
- ESLint + Prettier

## 实施阶段

### 阶段一：基础功能实现 ✅
- [x] 项目结构搭建
- [x] Vue3 + TypeScript 配置
- [x] Pinia 状态管理实现
- [x] 核心组件开发：
  - TodoApp.vue (主容器)
  - AddTodo.vue (添加待办)
  - TodoList.vue (列表容器)
  - TodoItem.vue (单项待办)
  - TodoFilter.vue (筛选器)
- [x] 完整的 CRUD 功能
- [x] 本地存储持久化
- [x] 类型检查和构建测试通过

### 阶段二：问题版本创建 (进行中)
计划在新分支中引入以下问题类型：

#### 1. 语法错误类
- TypeScript 类型错误
- 未定义变量使用
- 拼写错误和语法问题

#### 2. 安全漏洞类
- XSS 攻击漏洞点
- 危险的 innerHTML 使用
- 未验证的用户输入

#### 3. 性能问题类
- 无限循环
- 内存泄漏
- 不必要的重复渲染

#### 4. 代码重复类
- 重复的组件逻辑
- 重复的样式定义
- 冗余的工具函数

#### 5. 其他前端问题
- 可访问性问题
- SEO 问题
- 移动端兼容性问题

## 文件结构
```
vue-todolist/
├── src/
│   ├── components/
│   │   ├── TodoApp.vue      ✅
│   │   ├── TodoList.vue     ✅
│   │   ├── TodoItem.vue     ✅
│   │   ├── AddTodo.vue      ✅
│   │   └── TodoFilter.vue   ✅
│   ├── stores/
│   │   └── todoStore.ts     ✅
│   ├── types/
│   │   └── todo.ts          ✅
│   ├── router/
│   │   └── index.ts         ✅
│   ├── views/
│   │   └── HomeView.vue     ✅
│   ├── assets/
│   │   └── main.css         ✅
│   └── main.ts              ✅
├── package.json             ✅
├── vite.config.ts           ✅
├── tsconfig.json            ✅
└── index.html               ✅
```

## 测试验证
- ✅ TypeScript 类型检查通过
- ✅ Vite 构建成功
- ✅ 基础功能完整

## 下一步
1. 创建问题分支
2. 系统性地引入各类问题
3. 测试 AI 审查工具的检测能力