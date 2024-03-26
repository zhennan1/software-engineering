# Commit Message Guide

**注意：需要先在 https://gitlab.secoder.net/Dream 提出Issue，每次Commit都需要绑定Issue，例如：
```git commit -m "feat: xxx, close #123"```**

GitHub支持的关键词包括"close"、"closes"、"closed"、"fix"、"fixes"、"fixed"、"resolve"、"resolves"、"resolved"等，使用这些关键词之一加Issue编号可以在该提交被合并到主分支后自动关闭相关Issue。

**注意：每次 commit 不得大于 500 行**

https://developers.google.com/blockly/guides/contribute/get-started/commits

Clear commit messages make pull requests easier to review, and release notes easier to generate. The Blockly project uses conventional commits to help with this.

Each commit should have the format:

```<type>: <description>```

[optional body]

[optional footer(s)]

Note that the core Blockly repo has a commit linter to help enforce this. If your pull request has multiple commits, the linter will check the title. If it has a single commit, it will check that commit. It is best if both your individual commits and the pull request title follow these guidelines.

### Type

The type must be non-empty, and all lower case. The following is a list of accepted types.

**chore**

For commits that complete routine/automated tasks such as upgrading dependencies.

**deprecate**

For commits that deprecate functionality.

**feat**

For commits that add new functionality to Blockly.

**fix**

For commits that fix bugs/errors in Blockly.

**release**

For commits that relate to the release of a new version.

**Breaking changes**

Commits that make breaking changes should append a ! after the type of the commit. Breaking changes are changes that may break developers using Blockly in their apps, causing them to have to do extra work.

For example: ```fix!: return type of workspace.paste```

Breaking changes could have any of the above valid types.

### Description

The description must be non-empty, and must be under 256 characters.

### Body

The body is optional. If it is provided there should be a blank line between it and the description. It must be broken into lines of no more than 256 characters.

Note that usually, it is advisable to put this kind of information in your pull request description, in addition to/rather than directly in the commit.

### Footer

The footer is optional. If it is provided there should be a blank line between it and the body. It must be broken into lines of no more than 256 characters.