import * as Blockly from 'blockly';

// Default cue names
const DEFAULT_CUES = [
  'Cue Fluffy',
  'Cue Max', 
  'Cue Bubbles',
  'Cue Sparkles',
  'Cue Rainbow'
];

// When Program Starts (OnStart) - Hat block
Blockly.Blocks['event_when_program_starts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("When program starts");
    this.setNextStatement(true, null);
    this.setColour('#FFAB19');
    this.setTooltip("Entry point when program begins");
    this.setHelpUrl("");
    // Hat block styling
    this.hat = 'cap';
  }
};

// When Cue Received [cue] (OnCue) - Hat block with dropdown
Blockly.Blocks['event_when_cue_received'] = {
  init: function() {
    const options: [string, string][] = [
      ...DEFAULT_CUES.map(cue => [cue, cue] as [string, string]),
      ['Custom...', 'CUSTOM']
    ];
    const dropdown = new Blockly.FieldDropdown(options);
    
    this.appendDummyInput()
        .appendField("When cue received")
        .appendField(dropdown, "CUE_NAME");
    this.setNextStatement(true, null);
    this.setColour('#FFAB19');
    this.setTooltip("Triggered when specified cue is emitted");
    this.setHelpUrl("");
    // Hat block styling
    this.hat = 'cap';
  }
};

// Emit Cue [cue] - Broadcasts to all scripts
Blockly.Blocks['event_emit_cue'] = {
  init: function() {
    const options: [string, string][] = [
      ...DEFAULT_CUES.map(cue => [cue, cue] as [string, string]),
      ['Custom...', 'CUSTOM']
    ];
    const dropdown = new Blockly.FieldDropdown(options);
    
    this.appendDummyInput()
        .appendField("Emit cue")
        .appendField(dropdown, "CUE_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FFAB19');
    this.setTooltip("Broadcast cue to all scripts");
    this.setHelpUrl("");
  }
};

// Wait for Cue [cue] - Pauses until cue is emitted
Blockly.Blocks['event_wait_for_cue'] = {
  init: function() {
    const options: [string, string][] = [
      ...DEFAULT_CUES.map(cue => [cue, cue] as [string, string]),
      ['Custom...', 'CUSTOM']
    ];
    const dropdown = new Blockly.FieldDropdown(options);
    
    this.appendDummyInput()
        .appendField("Wait for cue")
        .appendField(dropdown, "CUE_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FFAB19');
    this.setTooltip("Pause until specified cue is emitted");
    this.setHelpUrl("");
  }
};

// JavaScript generators for event blocks
// Note: Generators removed to avoid runtime errors - implement when needed