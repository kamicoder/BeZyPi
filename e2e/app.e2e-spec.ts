import { BeZyPiPage } from './app.po';

describe('be-zy-pi App', () => {
  let page: BeZyPiPage;

  beforeEach(() => {
    page = new BeZyPiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
