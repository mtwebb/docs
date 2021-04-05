---
text: "Playtesting"
---

# Playtesting

Follow the [Prototyping](./1-prototyping) tutorial to create some cards. After that,
click on the **Play** tab to enter the virtual play area where you can interact
with these cards.

<screenshot>
  I.click('Components')
  I.click('[title="new component"]')
  I.click('[data-type=card]')
  I.click('[data-testid=template]')
  I.click('.face')
  I.click('[data-tool=image]')
  I.fillField('[data-widget=x]', 65)
  I.fillField('[data-widget=y]', 340)
  I.fillField('[data-widget=width]', 500)
  I.fillField('[data-widget=height]', 500)
  I.click('[data-widget=image]')
  I.click('[alt="Asset 16"]')
  I.click('[data-close=true]')
  I.click('[href="/play"]')
</screenshot>

You can drag the cards around, stack them on top of each other or move them to your
**Hand** area.
