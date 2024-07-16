'use strict';

var MarkdownIt = require('markdown-it');
var container = require('markdown-it-container');
var fs = require('fs');
var url = require('url');
var path = require('path');
var lodashEs = require('lodash-es');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const mdit = new MarkdownIt();
const _readFile = (filename) => {
    const __filename = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)));
    const __dirname = path.dirname(__filename);
    return fs.readFileSync(path.resolve(__dirname, '../../../packages/' + filename)).toString('utf8');
};
const render = function (tokens, idx) {
    const token = tokens[idx];
    const filePath = /src=([^\s]+)/.exec(token.info)?.[1]?.trim();
    let result = '';
    if (token.nesting === 1) {
        const fileContent = _readFile(filePath ?? '');
        // 正则表达式匹配接口名称
        const interfaceRegex = /export\s+interface\s+(\w+)/g;
        // 执行匹配并存储所有接口名称
        let match = null;
        while ((match = interfaceRegex.exec(fileContent)) !== null) {
            result += mdit.render(generateMarkdownDocumentation(fileContent, match[1]));
        }
    }
    return result;
};
const apiTableMdPlugin = function (md) {
    md.use(container, 'api-table', { render });
};
function generateMarkdownDocumentation(content, interfaceName) {
    const regex = new RegExp(`export interface ${interfaceName} {([\\s\\S]*?)}`, 'm');
    const match = content.match(regex);
    if (!match)
        return 'No interface found';
    const propertiesBlock = match[1];
    let markdownTable = `## ${interfaceName}\n\n| Property | Type | Default | Description |\n| --- | --- | --- | --- |\n`;
    const properties = parsePropertyComments(propertiesBlock);
    lodashEs.each(properties, (propertie) => {
        markdownTable += `| ${propertie.propertyName} | ${propertie.propertyType} | ${propertie.defaultValue} | ${propertie.description} |\n`;
    });
    return markdownTable;
}
// 解析注释和属性
function parsePropertyComments(propertyStr) {
    const props = propertyStr.trim().split(';');
    const properties = [];
    lodashEs.each(props, (prop) => {
        const propInfo = {
            propertyName: '',
            propertyType: '',
            description: '',
        };
        const propNameMatch = prop.match(/@property\s*(.*?)\s*(?:\n\s*\*\s*@|\*\/)/s);
        const descMatch = prop.match(/@description\s*(.*?)\s*(?:\n\s*\*\s*@|\*\/)/s);
        const defaultValueMatch = prop.match(/@default\s*(.*?)\s*(?:\n\s*\*\s*@|\*\/)/s);
        if (propNameMatch) {
            propInfo.propertyName = propNameMatch[1].trim();
        }
        if (descMatch) {
            propInfo.description = descMatch[1].trim();
        }
        if (defaultValueMatch) {
            propInfo.defaultValue = defaultValueMatch[1].trim();
        }
        if (propInfo.propertyName)
            properties.push(propInfo);
    });
    return properties;
}

module.exports = apiTableMdPlugin;
