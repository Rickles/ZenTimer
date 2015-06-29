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
  // time: 2,
  // warning: 30,
  // rest: 30,
  time: {str:'9'},
  warning: {str:'0:05'},
  rest: {str:'0:05'},
  rounds: 0,
  wakeLock: 'bright',
  soundIndex: 0
};
var settingOptions = {
  time: [
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
  ],
  warning: [
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
  '10:00',
  ],
  rest: [
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
  '10:00',
  ]
};