const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForElement = async (selector) => {
  while (!document.querySelector(selector)) {
    await sleep(100);
  }
  return document.querySelector(selector);
};

const approvePR = async (issueNumber: number) => {
  // 1. 첫 번째 이슈 클릭
  (await waitForElement(`#issue_${issueNumber} > div > a`)).click();
  // 2. Files changed 클릭
  (
    await waitForElement(
      "#repo-content-turbo-frame > div > div.clearfix.js-issues-results > div.px-3.px-md-0.ml-n3.mr-n3.mx-md-0.tabnav > nav > a:nth-child(4)"
    )
  ).click();
  // 3. Review changes 클릭
  (await waitForElement("#review-changes-modal > summary")).click();
  // 4. 텍스트 입력
  (await waitForElement("#pull_request_review_body")).textContent = "LGTM!!!";
  // 5. Approve 라디오 버튼 변경
  (
    await waitForElement(
      "#review-changes-modal > div > div > div > form > div:nth-child(4) > div:nth-child(3) > label > input[type=radio]"
    )
  ).click();
  // 클릭은 제외 (테스트)
  await waitForElement(
    "#review-changes-modal > div > div > div > form > div.form-actions.p-2.m-0.color-bg-subtle.border-top > button"
  );
};

export default approvePR;
