const cheerio = require('cheerio')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class InsertScriptWebpackPlugin {
  constructor (options) {
    this.options = options || {}
    const { inject, content, src, path, priority, encode } = this.options
    this.inject = inject || 'head'
    this.content = content || ''
    this.src = src || ''
    this.path = path || ''
    this.encode = encode || 'utf-8'
    this.priority = priority || 'last'
  }

  apply (compiler) {
    // 给compilation添加事件
    compiler.hooks.compilation.tap('InsertScriptWebpackPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('InsertScriptWebpackPlugin', (data, cb) => {
        const $ = cheerio.load(data.html)
        const body = $('body')
        const head = $('head')
        const script = this.handleScriptTag()
        if (this.inject === 'head') {
          head.append(script)
        }
        if (this.inject === 'body') {
          this.handleScriptPosition($, body, script)
        }
        data.html = $.html()
        cb(null, data)
      })
    })
  }

  handleScriptTag () {
    if (this.content) {
      return `<script>${this.content}</script>`
    }
    if (this.src) {
      return `<script src=${this.src}></script>`
    }
    if (this.path) {
      const text = fs.readFileSync(this.path, this.encode).toString()
      return `<script>${text}</script>`
    }
  }

  handleScriptPosition ($, node, script) {
    if (this.priority === 'last') {
      node.append(script)
    }
    if (this.priority === 'first') {
      $(script).insertBefore($('script')[0])
    }
  }
}

module.exports = InsertScriptWebpackPlugin
