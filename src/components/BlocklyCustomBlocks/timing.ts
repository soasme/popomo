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
    this.setColour('#FF6B6B');
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
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FF6B6B');
    this.setTooltip("Execute at specific timestamp (mm:ss.ff format)");
    this.setHelpUrl("");
  }
};

// JavaScript generators for timing blocks
// Note: Generators removed to avoid runtime errors - implement when needed