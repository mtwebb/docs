<h1>Screenshot</h1>

<!-- prettier-ignore -->
<screenshot name="sanity">
  I.amOnPage("/");

  I.click("Components");
  I.seeInCurrentUrl("/components");

  I.click("[data-testid=create]");
  I.click("[data-testid=card]");
  I.click("[data-testid=template]:first-child");
</screenshot>
