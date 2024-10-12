#!/usr/bin/env node

'use strict';

const boxen = require('boxen');
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
const open = require('open');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');

// Clear the console for a fresh start
clear();

// Initialize the prompt
const prompt = inquirer.createPromptModule();

// URLs for email, resume, and meeting link
const EMAIL_URL = 'mailto:lohitkolluri@gmail.com';
const RESUME_URL = 'https://lohitcdn.blob.core.windows.net/portfoliocdn/Etc/Lohit-Kolluri-Resume-Latest.pdf';
const MEETING_URL = 'https://calendly.com/lohitkolluri/30min';

// Function to handle resume download with loader animation
const downloadResume = async () => {
  const loader = ora({
    text: chalk.cyan('Preparing to download resume...'),
    spinner: cliSpinners.dots,
  }).start();

  try {
    const response = await axios({
      url: RESUME_URL,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream('./Lohit-Kolluri-Resume.pdf');
    response.data.pipe(writer);

    writer.on('finish', () => {
      const downloadPath = path.join(process.cwd(), 'Lohit-Kolluri-Resume.pdf');
      loader.succeed(chalk.green('Resume downloaded successfully!'));
      console.log(chalk.greenBright(`📥 Resume saved at: ${chalk.underline(downloadPath)}\n`));
      open(downloadPath);
    });

    writer.on('error', (err) => {
      loader.fail(chalk.red('Failed to download resume.'));
      console.error(chalk.redBright('Error:'), err.message);
    });
  } catch (err) {
    loader.fail(chalk.red('Error fetching resume.'));
    console.error(chalk.redBright('Error:'), err.message);
  }
};

// Profile information box
const data = {
  name: chalk.bold.green('Lohit Kolluri'),
  handle: chalk.white('@lohitkollluri'),
  education: `${chalk.white('Student At')} ${chalk.hex('#2b82b2').bold('SRM University')}`,
  github: chalk.gray('https://github.com/') + chalk.green('lohitkolluri'),
  linkedin: chalk.gray('https://linkedin.com/in/') + chalk.blue('kollurilohit'),
  web: chalk.cyan('https://lohitkolluri.vercel.app/'),
  npx: chalk.red('npx') + ' ' + chalk.white('lohitkolluri'),

  labelWork: chalk.white.bold('Education'),
  labelGitHub: chalk.white.bold('GitHub'),
  labelLinkedIn: chalk.white.bold('LinkedIn'),
  labelWeb: chalk.white.bold('Website'),
  labelCard: chalk.white.bold('Business Card'),
};

// Display the profile with boxen (enhanced box UI)
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
    chalk.italic('🚀 Currently looking for new opportunities.'),
    chalk.italic('Feel free to reach out or say hi, I\'ll respond as soon as possible!'),
  ].join('\n'),
  {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'green',
    float: 'center',
    backgroundColor: '#333',
  }
);

console.log(me);

// Action prompt for the user
const questions = [
  {
    type: 'list',
    name: 'action',
    message: chalk.cyan('What would you like to do?'),
    choices: [
      {
        name: `📧  Send me an ${chalk.green.bold('Email')}`,
        value: 'email',
      },
      {
        name: `📥  Download my ${chalk.magentaBright.bold('Resume')}`,
        value: 'downloadResume',
      },
      {
        name: `📅  Schedule a ${chalk.redBright.bold('Meeting')}`,
        value: 'scheduleMeeting',
      },
      {
        name: chalk.gray('🚪  Exit'),
        value: 'quit',
      },
    ],
  },
];

// Tip message for interactive links
console.log(
  chalk.yellowBright(
    `💡 Tip: You can ${chalk.cyanBright('cmd/ctrl + click')} on the links to open them directly.\n`
  )
);

// Actions based on user choice
const actions = {
  email: () => {
    open(EMAIL_URL);
    console.log(chalk.greenBright('📧 Check your inbox, I\'ll get back to you soon!\n'));
  },
  downloadResume: downloadResume,
  scheduleMeeting: () => {
    open(MEETING_URL);
    console.log(chalk.redBright('📅 Meeting scheduled! Looking forward to chatting.\n'));
  },
};

// Prompt the user for action and execute the corresponding function
prompt(questions).then((answer) => {
  const action = answer.action;
  if (action === 'quit') {
    console.log(chalk.gray('👋 Goodbye! Have a great day.\n'));
  } else {
    actions[action]();
  }
});
