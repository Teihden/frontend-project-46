# Project "Difference calculator"
[![Actions Status](https://github.com/Teihden/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Teihden/frontend-project-46/actions)

## About

**"Difference calculator"** is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, for example https://www.jsondiff.com. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

Features of the utility:
- Supports various input formats: yaml, json;
- Report generation as plain text, stylish and json.

## Usage

You should have Node.js installed before proceeding. Only test JS against v19 and on macOS.

```shell
# Clone the repo
git clone https://github.com/Teihden/frontend-project-46
cd frontend-project-46

# Install dependencies
make install

# Run
make gendiff
```

## CLI

```shell
# Runs npm-publish with flag (--dry-run)
make publish

# Runs Eslint against source code for quality
make lint
```
