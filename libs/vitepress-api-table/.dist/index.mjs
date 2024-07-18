import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { each } from 'lodash-es';

const mdit = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});
const _readFile = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return readFileSync(resolve(__dirname, '../../../packages/' + filename)).toString('utf8');
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
    let markdownTable = `## ${interfaceName}\n\n| Property | Type | Description | Default |\n| --- | --- | --- | --- |\n`;
    each(match, (matchItem) => {
        console.log('🚀 ~ each ~ matchItem:', matchItem);
    });
    const properties = parsePropertyComments(propertiesBlock);
    each(properties, (propertie) => {
        markdownTable += `| ${propertie.propertyName} | ${propertie.propertyType.replace(/\|/g, '&#124;')}| ${propertie.description} | ${propertie.defaultValue} |\n`;
    });
    return markdownTable;
}
// 解析注释和属性
function parsePropertyComments(propertyStr) {
    const props = propertyStr.trim().split(';');
    const properties = [];
    each(props, (prop) => {
        const propInfo = {
            propertyName: '',
            propertyType: '',
            description: '',
            defaultValue: '',
        };
        const propNameMatch = prop.match(/@property\s*(.*?)\s*(?:\n\s*\*\s*@|\*\/)/s);
        console.log('🚀 ~ each ~ propNameMatch:', propNameMatch);
        const propTypeMatch = prop.match(/@type\s*(.*?)\s*(?:\n\s*\*\s*@|\*\/)/s);
        const descMatch = prop.match(/@description\s*(.*?)\s*(?:\n\s*\*\s*@|\*\/)/s);
        const defaultValueMatch = prop.match(/@default\s*(.*?)\s*(?:\n\s*\*\s*@|\*\/)/s);
        if (propNameMatch) {
            propInfo.propertyName = propNameMatch[1].trim();
        }
        if (propTypeMatch) {
            propInfo.propertyType = propTypeMatch[1];
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

export { apiTableMdPlugin as default };
