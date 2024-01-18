#!/usr/bin/env node

'use strict';

const boxen = require('boxen');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
const open = require('open');
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

clear();

const prompt = inquirer.createPromptModule();

const EMAIL_URL = 'mailto:lohitkolluri@gmail.com';
const RESUME_URL = 'https://lohitcdn.blob.core.windows.net/portfoliocdn/Etc/resume.pdf';
const MEETING_URL = 'https://calendly.com/lohitkolluri/30min';

const downloadResume = () => {
  const loader = ora({
    text: ' Downloading Resume',
    spinner: cliSpinners.material,
  }).start();

  const pipe = request(RESUME_URL).pipe(
    fs.createWriteStream('./Lohit-Kolluri-Resume.pdf')
  );

  pipe.on('finish', function () {
    const downloadPath = path.join(process.cwd(), 'Lohit-Kolluri-Resume.pdf');
    console.log(chalk.green(`\n📥 Resume Downloaded at ${downloadPath}\n`));
    open(downloadPath);
    loader.stop();
  });

  pipe.on('error', function (err) {
    console.error(chalk.red('Error downloading resume:'), err.message);
    loader.stop();
  });
};

const questions = [
  {
    type: 'list',
    name: 'action',
    message: chalk.cyan('What would you like to do?'),
    choices: [
      {
        name: `📧  Send me an ${chalk.green.bold('email')}?`,
        value: 'email',
      },
      {
        name: `📥  Download my ${chalk.magentaBright.bold('Resume')}?`,
        value: 'downloadResume',
      },
      {
        name: `📅  Schedule a ${chalk.redBright.bold('Meeting')}?`,
        value: 'scheduleMeeting',
      },
      {
        name: chalk.gray('🚪  Quit.'),
        value: 'quit',
      },
    ],
  },
];

const data = {
  name: chalk.bold.green('Lohit Kolluri'),
  handle: chalk.white('@lohitkollluri'),
  education: `${chalk.white('Student At')} ${chalk
    .hex('#2b82b2')
    .bold('SRM University')}`,
  github: chalk.gray('https://github.com/') + chalk.green('lohitkolluri'),
  linkedin:
    chalk.gray('https://linkedin.com/in/') + chalk.blue('kollurilohit'),
  web: chalk.cyan('https://lohitkolluri.tech/'),
  npx: chalk.red('npx') + ' ' + chalk.white('lohitkolluri'),

  labelWork: chalk.white.bold('Education'),
  labelGitHub: chalk.white.bold('GitHub'),
  labelLinkedIn: chalk.white.bold('LinkedIn'),
  labelWeb: chalk.white.bold('Web'),
  labelCard: chalk.white.bold('Card'),
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}:  ${data.education}`,
    ``,
    `${data.labelGitHub}:  ${data.github}`,
    `${data.labelLinkedIn}:  ${data.linkedin}`,
    `${data.labelWeb}:  ${data.web}`,
    ``,
    `${data.labelCard}:  ${data.npx}`,
    ``,
    `${chalk.italic('I am currently looking for new opportunities,')}`,
    `${chalk.italic('my inbox is always open. Whether you have a')}`,
    `${chalk.italic('question or just want to say hi, I will try ')}`,
    `${chalk.italic('my best to get back to you!')}`,
  ].join('\n'),
  {
    margin: 1,
    float: 'center',
    padding: 1,
    borderStyle: 'round',
    borderColor: 'green',
  }
);

console.log(me);

const tip = [
  `Tip: Try ${chalk.cyanBright.bold('cmd/ctrl + click')} on the links above`,
  '',
].join('\n');
console.log(tip);

prompt(questions).then((answer) => {
  const action = answer.action;
  if (action === 'quit') {
    console.log(chalk.gray('Hasta la vista.\n'));
  } else {
    actions[action]();
  }
});

const actions = {
  email: () => {
    open(EMAIL_URL);
    console.log(chalk.green('\n📧 Done, see you soon at inbox.\n'));
  },
  downloadResume: downloadResume,
  scheduleMeeting: () => {
    open(MEETING_URL);
    console.log(chalk.redBright('\n📅 See you at the meeting!\n'));
  },
};