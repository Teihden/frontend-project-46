#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'first file to compare')
  .argument('<filepath2>', 'second file to compare')
  .option('-f, --format <type>', 'output format')
  .parse();
