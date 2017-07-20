import { PublicAngularPage } from './app.po';

describe('public-angular App', () => {
  let page: PublicAngularPage;

  beforeEach(() => {
    page = new PublicAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
