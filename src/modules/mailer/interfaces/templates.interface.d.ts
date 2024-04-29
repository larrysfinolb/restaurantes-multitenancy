import { TemplateDelegate } from 'handlebars';

export interface ITemplates {
  welcome: TemplateDelegate<IWelcomeTemplateData>;
}
