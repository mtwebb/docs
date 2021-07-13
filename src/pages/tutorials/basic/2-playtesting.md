---
text: "Playtesting"
---

# Playtesting

Follow the [Prototyping](./1-prototyping) tutorial to create some cards. After that,
click on the **Play** tab to enter the virtual play area where you can interact
with these cards. You can drag the cards around, stack them on top of each other or move them to your
**Hand** area.

Here is a description of the buttons on the top right:

<carousel play={false}>
  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    I.click('[data-testid=template]')
    I.click('.face')
    I.click('[data-tool=image]')
    I.fillField('[data-widget=x]', 65)
    I.fillField('[data-widget=y]', 340)
    I.fillField('[data-widget=w]', 500)
    I.fillField('[data-widget=h]', 500)
    I.click('[data-widget=image]')
    I.click('[alt="Asset 16"]')
    I.click('[data-close=true]')
    I.click('[href="/play"]')
    await I.highlight('[title=reset]')
  </screenshot>

  <screenshot>
    await I.highlight('[title=offline]')
  </screenshot>
</carousel>

1. Resets the state of the board. If you moved any cards, they will move back to their original positions.
1. Click on this to go live! More on this below.

---

## Multiplayer

Playing with other players is as simple as sharing a link. Follow these steps to *go live*.

<carousel play={false}>
  <screenshot>
    I.click('Components')
    I.click('[title="new component"]')
    I.click('[data-type=card]')
    I.click('[data-testid=template]')
    I.click('.face')
    I.click('[data-tool=image]')
    I.fillField('[data-widget=x]', 65)
    I.fillField('[data-widget=y]', 340)
    I.fillField('[data-widget=w]', 500)
    I.fillField('[data-widget=h]', 500)
    I.click('[data-widget=image]')
    I.click('[alt="Asset 16"]')
    I.click('[data-close=true]')
    I.click('[href="/play"]')
    await I.highlight('[title=offline]')
  </screenshot>

  <screenshot>
    I.click('[title=offline]')
    await I.arrowUp('[data-mode=live]')
  </screenshot>

  <screenshot>
    I.click('[data-mode=live]')
    await I.highlight('[data-testid=copy-url]')
  </screenshot>

  <screenshot>
    await I.arrowUp('[data-mode=offline]')
  </screenshot>
</carousel>

1. Click on the **Go Live** button.
1. Click on **Live**.
1. Share the URL that's generated with anybody that you would like to join your playtesting session.
1. Click on **Offline** when you want to shut down the multiplayer session.

> Note that this mechanism is just a way to quickly start an
informal playtest session. Future versions of Boardgame Lab
will also allow making the game public and having players
directly create matches through a lobby without needing the game designer to be present.
