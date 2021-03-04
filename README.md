# Boardgame Lab Documentation

Documentation is contained in Markdown files located in `src/pages`.
Changes to these files are automatically pushed to production.

## Screenshots

Screenshots are automatically generated using `<screenshot>` tags:

```
<screenshot>
  I.click('Components')
  I.click('[title="new component"]')
  I.click('[data-type=card]')
  I.click('[data-testid=template]')
</screenshot>
```

The stuff that you see inside the tag are CodeceptJS commands, which are
performed on the Boardgame Lab app before taking a screenshot.

Take a look at the CodeceptJS docs for more details on what you can
do: [link](https://codecept.io/playwright/).

## Carousels

Use a carousel whenever you have a series of steps that each have
relevant screenshots. The docs will automatically make them
interactive (i.e. when you hover over a step, it will highlight
the appropriate screenshot).

```
<carousel>
  <screenshot> ...  </screenshot>
  <screenshot> ...  </screenshot>
  <screenshot> ...  </screenshot>
</carousel>

1. Step 1
1. Step 2
1. Step 3
```

The commands inside the screenshots in a carousel are run cumulatively
(i.e. the second screenshot continues from where the first left off).

> Note: The carousel must immediately precede the list of steps for it to work correctly.

## Highlighting

You can highlight elements in a screenshot or draw arrows using

```
await I.highlight(<locator>)
await I.arrowDown(<locator>)
await I.arrowUp(<locator>)
await I.arrowLeft(<locator>)
await I.arrowRight(<locator>)
```

For a description of how things work under the hood, you may be interested
in this [blog](https://nicolodavis.com/blog/autogenerating-screenshots/) post.

## Contributing

Contributions are most welcome. Please send a Pull Request against
the `master` branch.

## Building locally

You may want to build the site locally to see changes (especially if you
create a screenshot).

```
npm install
npm run dev
```
