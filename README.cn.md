# ISDK: Detect text language

ISDK(Intelligent System Development Kit): 为开发者提供的AI开发套件。

一个文本语言检测库，支持返回语言名称、ISO 639-1/639-3代码及关联国家信息。

---

## 功能特性

- 🌐 **多语言检测**：识别文本的语言类型
- 🏷️ **ISO编码支持**：返回ISO 639-1/639-3标准语言代码
- 🌍 **国家信息关联**：自动匹配对应国家代码（ISO 3166）和国家名称
- 🛠️ **灵活配置**：支持设置语言子集和置信度阈值

---

## 安装

```bash
npm install @isdk/detect-text-language
```

## 基本用法

### 检测语言名称或ISO代码

```typescript
import { detectTextLanguage } from '@isdk/detect-text-language';

// 检测语言名称
const text = "Hola, ¿cómo estás?";
const languageName = await detectTextLanguage(text);
console.log(languageName); // 输出："Spanish"

// 检测ISO 639-1代码
const isoCode = await detectTextLanguage(text, { isoCode: true });
console.log(isoCode); // 输出："es"
```

### 获取完整语言信息

```ts
import { detectTextLangEx } from '@isdk/detect-text-language';

const result = detectTextLangEx("Bonjour le monde!");
console.log(result);
/* 输出:
{
  iso6391: 'fr',
  name: 'French',
  iso3166: 'FR',
  country: 'France',
  scores: { ... }
}
*/
```

## 配置选项

```typescript
interface IDetectLanguageOptions {
  isoCode?: boolean;          // 是否返回ISO 639-1代码（默认返回名称）
  langSubset?: string[];      // 限制检测的语言范围（ISO 639-1代码数组）
  threshold?: number;         // 置信度阈值（默认0.1）
}
```

## 高级用例

限制检测语言范围

```typescript
// 仅检测中文或英文
const options = { langSubset: ['zh', 'en'] };
const result = detectTextLanguage("你好，世界！", options);
```

## API 文档

* `detectTextLanguage(text: string, options?: IDetectLanguageOptions)`
  * 返回语言名称或ISO代码（根据isoCode选项）
  * 当置信度低于阈值或无法检测时返回undefined
* `detectTextLangEx(text: string, options?: IDetectLanguageOptions)`
  * 返回包含以下信息的对象:

  ```ts
  {
    iso6391: string;          // ISO 639-1代码
    name?: string;            // 语言全称
    iso3166?: string;         // 主要国家代码（ISO 3166）
    country?: string;         // 国家名称
    scores?: Record<string, number>; // 各语言置信度分数
  }
  ```

## 贡献指南

1. Fork 仓库
1. 创建功能分支 (git checkout -b feature/YourFeature)
1. 提交更改 (git commit -m 'Add some amazing feature')
1. Push 到分支 (git push origin feature/YourFeature)
1. 提交 Pull Request

## 许可证

MIT License © 2024-2025 [Riceball LEE(ISDK)]
