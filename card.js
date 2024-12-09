#!/usr/bin/env node

import boxen from 'boxen';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import axios from 'axios';
import ora from 'ora';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { fileURLToPath } from 'url';
import openURL from 'open';
import { setTimeout as sleep } from 'timers/promises';
import { createSpinner } from 'nanospinner';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Clear console
console.clear();

// Configuration
const CONFIG = {
  EMAIL_URL: 'mailto:lohitkolluri@gmail.com',
  RESUME_URL: 'https://drive.google.com/file/u/1/d/1KwoW5uTW2aUEoi14CnM6JGQatup_5aAf/view?usp=sharing',
  MEETING_URL: 'https://calendly.com/lohitkolluri/30min',
  PORTFOLIO_URL: 'https://lohit.is-a.dev/',
  GITHUB_URL: 'https://github.com/lohitkolluri',
  LINKEDIN_URL: 'https://linkedin.com/in/kollurilohit',
};

// Animation frames for loading
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

// Animated text typing effect
const animateText = async (text, speed = 10) => {
  process.stdout.write('\n');
  for (const char of text) {
    process.stdout.write(char);
    await sleep(speed);
  }
  process.stdout.write('\n');
};

// Loading animation
const showLoading = async (text, duration = 500) => {
  const spinner = createSpinner(text).start();
  await sleep(duration);
  spinner.success();
};

// Animated welcome banner with matrix effect
const showWelcomeBanner = async () => {
  console.log('\n');
  await showLoading('Initializing...', 300);
  
  return new Promise((resolve) => {
    figlet('Lohit Kolluri', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }, async (err, data) => {
      if (!err) {
        // Matrix-like animation
        const lines = data.split('\n');
        for (const line of lines) {
          console.log(gradient.rainbow(line));
          await sleep(30);
        }
        await animateText('{ Full Stack Developer & Open Source Enthusiast }', 50);
      }
      resolve();
    });
  });
};

// Enhanced resume viewer with animation
const downloadResume = async () => {
  const spinner = createSpinner('Preparing to open resume...').start();
  await sleep(300);

  try {
    await openURL(CONFIG.RESUME_URL);
    spinner.success({ text: chalk.green('Resume opened in your browser! 🎉') });
    await animateText(chalk.gray('Tip: You can download it directly from Google Drive'));
  } catch (err) {
    spinner.error({ text: chalk.red('Failed to open resume 😢') });
    console.error(chalk.red('Error:'), err.message);
    throw err;
  }
};

// Social media links with emojis and animated colors
const data = {
  name: gradient.pastel('Lohit Kolluri'),
  title: chalk.white('Full Stack Developer & Student'),
  education: `${chalk.white('Student At')} ${gradient.morning('SRM University')}`,
  github: `${chalk.white('{')} ${chalk.gray('github.com/')}${chalk.green('lohitkolluri')} ${chalk.white('}')}`,
  linkedin: `${chalk.white('{')} ${chalk.gray('linkedin.com/in/')}${chalk.blue('kollurilohit')} ${chalk.white('}')}`,
  web: `${chalk.white('{')} ${chalk.cyan('https://lohit.is-a.dev')} ${chalk.white('}')}`,
  npx: `${chalk.red('npx')} ${chalk.white('lohitkolluri')}`,
  skills: gradient.cristal('DevOps | Web Web Development | Cyber Security | Machine Learning'),
};


// Animated profile card display
const showProfileCard = async () => {
  const card = boxen(
    [
      `${data.name}`,
      `${data.title}`,
      ``,
      `🎓 ${data.education}`,
      ``,
      `⚡ Skills: ${data.skills}`,
      ``,
      `📦 GitHub:    ${data.github}`,
      `💼 LinkedIn:  ${data.linkedin}`,
      `🌐 Website:   ${data.web}`,
      ``,
      `📇 Card:      ${data.npx}`,
      ``,
      gradient.passion('🚀 Available for exciting opportunities and collaborations!'),
      gradient.cristal('💭 Let\'s connect and create something amazing together!'),
    ].join('\n'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green',
      float: 'center',
      backgroundColor: '#1a1a1a',
      title: chalk.green.bold('Digital Business Card'),
      titleAlignment: 'center',
    }
  );

  // Animate card display
  const lines = card.split('\n');
  for (const line of lines) {
    console.log(line);
    await sleep(10);
  }
};

// Enhanced menu options with animations
const questions = [
  {
    type: 'list',
    name: 'action',
    message: gradient.cristal('What would you like to do?'),
    choices: [
      {
        name: `📧  ${gradient.passion('Send an Email')}`,
        value: 'email',
      },
      {
        name: `📥  ${gradient.morning('View Resume')}`,
        value: 'downloadResume',
      },
      {
        name: `📅  ${gradient.fruit('Schedule a Meeting')}`,
        value: 'scheduleMeeting',
      },
      {
        name: `🌐  ${gradient.teen('Visit Portfolio')}`,
        value: 'portfolio',
      },
      {
        name: `💻  ${gradient.atlas('View GitHub')}`,
        value: 'github',
      },
      {
        name: gradient.rainbow('🚪  Exit'),
        value: 'quit',
      },
    ],
  },
];

// Enhanced action handlers with animations
const actions = {
  email: async () => {
    const spinner = createSpinner('Opening mail client...').start();
    await sleep(200);
    await openURL(CONFIG.EMAIL_URL);
    spinner.success({ text: gradient.passion('📧 Email client opened!') });
    await animateText(chalk.green('Looking forward to hearing from you!'));
  },
  downloadResume: downloadResume,
  scheduleMeeting: async () => {
    const spinner = createSpinner('Opening scheduler...').start();
    await sleep(1000);
    await openURL(CONFIG.MEETING_URL);
    spinner.success({ text: gradient.fruit('📅 Scheduler opened!') });
    await animateText(chalk.green('Excited to chat with you soon!'));
  },
  portfolio: async () => {
    const spinner = createSpinner('Loading portfolio...').start();
    await sleep(1000);
    await openURL(CONFIG.PORTFOLIO_URL);
    spinner.success({ text: gradient.teen('🌐 Portfolio opened!') });
    await animateText(chalk.green('Hope you enjoy exploring my work!'));
  },
  github: async () => {
    const spinner = createSpinner('Opening GitHub...').start();
    await sleep(1000);
    await openURL(CONFIG.GITHUB_URL);
    spinner.success({ text: gradient.atlas('💻 GitHub profile opened!') });
    await animateText(chalk.green('Check out my latest projects!'));
  },
};

// Main function with enhanced animations
const main = async () => {
  try {
    await showWelcomeBanner();
    await showProfileCard();
    
    console.log(
      gradient.passion(
        `\n💡 Tip: Use `) + 
      chalk.cyan('cmd/ctrl + click') + 
      gradient.passion(' on links to open directly.\n')
    );

    while (true) {
      const { action } = await inquirer.prompt(questions);
      
      if (action === 'quit') {
        await animateText(gradient.rainbow('\n👋 Thanks for stopping by! Have a great day!\n'));
        break;
      }
      
      await actions[action]();
    }
  } catch (error) {
    console.error(chalk.red('\n❌ An error occurred:'), error.message);
    process.exit(1);
  }
};

// Run the card
main().catch(console.error);