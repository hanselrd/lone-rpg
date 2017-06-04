import { LoneRpgPage } from './app.po';

describe('lone-rpg App', () => {
  let page: LoneRpgPage;

  beforeEach(() => {
    page = new LoneRpgPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
