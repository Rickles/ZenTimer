var availableSounds = [{
      name: 'Look Around',
      time: '../audio/Looking_Up.wav',
      warning: '../audio/Puff.wav',
      rest: '../audio/Looking_Down.wav'
    },{
      name: 'Jump Around',
      time: '../audio/Jump_Up.wav',
      warning: '../audio/Concern.wav',
      rest: '../audio/Jump_Down.wav'
    },{
      name: 'Breezy',
      time: '../audio/Concern.wav',
      warning: '../audio/Hollow.wav',
      rest: '../audio/GentleRoll.wav'
    },{
      name: 'Enchanting',
      time: '../audio/hell-yeah.mp3',
      warning: '../audio/microbounce.mp3',
      rest: '../audio/happy-ending.mp3'
    },{
      name: 'Silly',
      time: '../audio/coins.mp3',
      warning: '../audio/hurry.mp3',
      rest: '../audio/credulous.mp3'
    }
];
var DefaultSettingsData = {
  version: 1,
  // time: {str:'0:04'},
  // warning: {str:'0:02'},
  // rest: {str:'0:02'},
  // setup: {str:'0:02'},
  time: {str:'2:00'},
  warning: {str:'0:30'},
  rest: {str:'0:30'},
  setup: {str:'0:10'},
  rounds: 0,
  wakeLock: 'bright',
  soundIndex: 3,
  background: 'bottles'
};
var settingOptions = {
  time: {
    title: 'Timer',
    description: 'The interval you will be doing activity for',
    choices: [
      '0:15',
      '0:30',
      '1:00',
      '1:30',
      '2:00',
      '3:00',
      '5:00',
      '7:30',
      '10:00',
      '15:00',
      '20:00'
    ]},
  warning: {
    title: 'Warning',
    description: 'The point at which you would would like to be warned that the interval is about to expire',
    choices: [
      '0:05',
      '0:10',
      '0:15',
      '0:30',
      '1:00',
      '1:30',
      '2:00',
      '3:00',
      '5:00',
      '7:30',
      '10:00'
  ]},
  rest: {
    title: 'Rest',
    description: 'The period that you will rest between intervals',
    choices: [
      '0:05',
      '0:10',
      '0:15',
      '0:30',
      '1:00',
      '1:30',
      '2:00',
      '3:00',
      '5:00',
      '7:30',
      '10:00'
  ]},
  setup: {
    title: 'Setup',
    description: 'The time required at the beginning of the intervals to setup for the activity',
    choices: [
      '0:00',
      '0:03',
      '0:05',
      '0:10',
      '0:15',
      '0:20',
      '0:30',
      '0:45',
      '1:00'
  ]},
  paused: {
    title: 'Paused'
  },
  background: {
    title: 'Background',
    description: 'Select the image that you would like to use as a background',
    choices: [
      'bottles',
      'tree',
      'ladybug',
      'lake',
      'motion',
      'blotted',
      'cactus',
      'dew',
      'leaves'
    ]}
};