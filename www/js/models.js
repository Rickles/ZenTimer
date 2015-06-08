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
      name: 'Classic',
      time: '../audio/2-tones-4up.wav',
      warning: '../audio/chime-mid.wav',
      rest: '../audio/Pleasant_Tone.wav'
    }
];
var DefaultSettingsData = {
  // time: 2,
  // warning: 30,
  // rest: 30,
  time: .15,
  warning: 5,
  rest: 5,
  rounds: 0,
  wakeLock: 'bright',
  soundIndex: 0
};