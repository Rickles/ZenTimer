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
    }
];
var DefaultSettingsData = {
  // time: {str:'0:03'},
  // warning: {str:'0:01'},
  // rest: {str:'0:02'},
  version: 1,
  time: {str:'2:00'},
  warning: {str:'0:30'},
  rest: {str:'0:30'},
  rounds: 0,
  wakeLock: 'bright',
  soundIndex: 0,
  setup: {str:'0:05'}
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
  ]}
};