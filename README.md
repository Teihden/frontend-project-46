# Project "Difference calculator"
[![Actions Status](https://github.com/Teihden/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Teihden/frontend-project-46/actions)
[![CI](https://github.com/Teihden/frontend-project-46/workflows/CI/badge.svg)](https://github.com/Teihden/frontend-project-46/actions/workflows/CI.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/5ab8768fe7cee2f58d42/maintainability)](https://codeclimate.com/github/Teihden/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5ab8768fe7cee2f58d42/test_coverage)](https://codeclimate.com/github/Teihden/frontend-project-46/test_coverage)

## About

**"Difference calculator"** is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, for example https://www.jsondiff.com. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

Features of the utility:
- Supports various input formats: yaml, json;
- Report generation as plain text, stylish and json.

Examples of use:
1. <a href="#default-comparison">"Comparison of flat files (JSON)"</a>

## Usage

You should have Node.js installed before proceeding. Only test JS against v18 and on macOS.

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

# Runs Jest
make test

# Runs Jest in code coverage mode
make test-coverage

# Runs Jest in watch mode
make watch
```

<h2 id="#default-comparison">Comparison of flat files (JSON)</h2>
A simple comparison of 2 files with JSON extension without specifying the output data format.

[![asciicast](https://asciinema.org/a/7sU9EunQioHYImc29l4pHZV3a.svg)](https://asciinema.org/a/7sU9EunQioHYImc29l4pHZV3a)
