import { PublicAngularPage } from './app.po';

describe('public-angular App', () => {
  let page: PublicAngularPage;

  beforeEach(() => {
    page = new PublicAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
