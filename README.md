## Conventional Commits

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1 - fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).

2 - feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).

3 - BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.

4 - types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

5 - Additional types are not mandated by the Conventional Commits specification, and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., feat(parser): add ability to parse arrays.

## Example

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

## Commit message with ! to draw attention to breaking change

```
refactor!: drop support for Node 6
```

## Commit message with both ! and BREAKING CHANGE footer

```
refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
```

## Commit message with no body

```
docs: correct spelling of CHANGELOG
```

## Commit message with scope

```
feat(lang): add polish language
```"# pinbus-landingpage" 
