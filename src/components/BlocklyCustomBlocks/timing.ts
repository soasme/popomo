import * as Blockly from 'blockly';

// Wait [◼ seconds] block
Blockly.Blocks['wait_seconds'] = {
  init: function() {
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("Wait")
        .setShadowDom(Blockly.utils.xml.textToDom('<shadow type="math_number"><field name="NUM">0.5</field></shadow>'));
    this.appendDummyInput()
        .appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FFAB19');
    this.setTooltip("Wait for a specified number of seconds");
    this.setHelpUrl("");
  }
};

// At [mm:ss.ff] block
Blockly.Blocks['at_timestamp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("At")
        .appendField(new Blockly.FieldTextInput("00:00.00"), "TIMESTAMP");
    this.setNextStatement(true, null);
    this.setColour('#FFAB19');
    this.setTooltip("Execute at specific timestamp (mm:ss.ff format)");
    this.setHelpUrl("");
  }
};

// Between [mm:ss.ff] And [mm:ss.ff] block
Blockly.Blocks['between_timestamps'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Between")
        .appendField(new Blockly.FieldTextInput("00:00.00"), "START_TIMESTAMP")
        .appendField("And")
        .appendField(new Blockly.FieldTextInput("00:00.00"), "END_TIMESTAMP");
    this.setNextStatement(true, null);
    this.setColour('#FFAB19');
    this.setTooltip("Execute between two timestamps (mm:ss.ff format)");
    this.setHelpUrl("");
  }
};

// JavaScript generators for timing blocks
// Note: Generators removed to avoid runtime errors - implement when needed