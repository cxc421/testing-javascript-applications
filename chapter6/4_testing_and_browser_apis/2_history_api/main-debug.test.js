const fs = require("fs");
const initialHtml = fs.readFileSync("./index.html");
const { screen, getByText, fireEvent } = require("@testing-library/dom");

const { clearHistoryHook, detachPopstateHandlers } = require("./testUtils.js");

beforeEach(clearHistoryHook);

beforeEach(() => localStorage.clear());

beforeEach(() => {
  document.body.innerHTML = initialHtml;

  // You must execute main.js again so that it can attach the
  // event listener to the form every time the body changes.
  // Here you must use `jest.resetModules` because otherwise
  // Jest will have cached `main.js` and it will _not_ run again.
  jest.resetModules();
  require("./main");

  // You can only spy on `window.addEventListener` after `main.js`
  // has been executed. Otherwise `detachPopstateHandlers` will
  // also detach the handlers that `main.js` attached to the page.
  jest.spyOn(window, "addEventListener");
});

afterEach(detachPopstateHandlers);

describe('debug addEventListener', () => {
  test('1st test', done => {
    history.pushState({inventory: { cheesecake: 5 }}, '');
    history.back();
    window.addEventListener('popstate', () => {
      console.log(`Triiger pop state at 1st test`);
      done();
    });  
  });
  test('2nd test', done => {
    history.pushState({inventory: { cheesecake: 5 }}, '');
    history.back();
    window.addEventListener('popstate', () => {
      console.log(`Triiger pop state at 2nd test`);
      done();
    });  
  });
});
