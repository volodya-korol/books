import * as fs from 'fs';

export type templatesT =
  | { name: 'confirmationCode'; config: { code: string } }
  | { name: 'forgotPassword'; config: { code: string } }
  | { name: 'welcome'; config?: never };

export const getTemplate = ({ name, config }: templatesT) => {
  const html = fs.readFileSync(`src/common/templates/${name}.html`, 'utf8');
  if (config) {
    return Object.entries(config).reduce((acc, val) => {
      const regex = new RegExp(`{{${val[0]}}}`, 'g');
      return acc.replace(regex, val[1]);
    }, html);
  }
  return html;
};
