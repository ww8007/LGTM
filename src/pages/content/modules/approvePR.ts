const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForElement = async (selector) => {
  while (!document.querySelector(selector)) {
    await sleep(100);
  }
  return document.querySelector(selector);
};

const approvePR = async () => {
  const anchorElem = await waitForElement(".markdown-title");
  const hrefValue = anchorElem.getAttribute("href");
  const regex = /\/pull\/(\d+)/;
  const match = hrefValue.match(regex);
  const issueNumber = match ? match[1] : null;
  // 1. 첫 번째 이슈 클릭
  (await waitForElement(`#issue_${issueNumber} > div > a`)).click();
  // 2. Add your review 클릭
  (
    await waitForElement(
      "#repo-content-turbo-frame > div > div.flex-items-center.flash.flash-warn.width-full.mb-3.p-2.d-flex > a"
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
