# cooklang-parser

## installation

```sh
npm install cooklang-parser
```

## usage

This package provides two exports: `Recipe` and `parse`. Both take a recipe string and return the parsed recipe as on object. The result of `parse` has two keys, `steps` and `metadata`. `Recipe` additionally adds a list of ingredients and a list of cookware:

```js
const recipeString = `
>> name: test-recipe

1. first step
2. second step
`

parse(recipeString) // { steps: [...], metadata: { ... } }
Recipe(recipeString) // { steps: [...], metadata: { ... }, ingredients: [...], cookware: [...] }
```
