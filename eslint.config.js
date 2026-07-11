import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier/flat'
import globals from 'globals'

export default [
  // 基础推荐规则
  js.configs.recommended,

  // Vue 推荐规则（包含 template 解析）
  ...pluginVue.configs['flat/recommended'],

  // Prettier 兼容 —— 关闭与 Prettier 冲突的规则
  prettierConfig,

  // 全局配置
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
  },

  // 项目自定义规则
  {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': [
        'warn',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/html-indent': ['warn', 2],
      'vue/html-closing-bracket-newline': 'warn',
      'vue/first-attribute-linebreak': [
        'warn',
        {
          singleline: 'beside',
          multiline: 'below',
        },
      ],
    },
  },

  // 忽略目录
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js'],
  },
]
