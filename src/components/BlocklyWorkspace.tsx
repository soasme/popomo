'use client';

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { BlocklyWorkspaceProps } from '@/editorTypes';

export default function BlocklyWorkspace({ isVisible }: BlocklyWorkspaceProps) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (isVisible && blocklyDiv.current && !workspace.current) {
      // Initialize Blockly workspace
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: {
          kind: 'categoryToolbox',
          contents: [
            {
              kind: 'category',
              name: 'Logic',
              colour: '#5C81A6',
              contents: [
                { kind: 'block', type: 'controls_if' },
                { kind: 'block', type: 'logic_compare' },
                { kind: 'block', type: 'logic_operation' },
                { kind: 'block', type: 'logic_negate' },
                { kind: 'block', type: 'logic_boolean' },
              ],
            },
            {
              kind: 'category',
              name: 'Loops',
              colour: '#5CA65C',
              contents: [
                { kind: 'block', type: 'controls_repeat_ext' },
                { kind: 'block', type: 'controls_whileUntil' },
                { kind: 'block', type: 'controls_for' },
              ],
            },
            {
              kind: 'category',
              name: 'Math',
              colour: '#5C68A6',
              contents: [
                { kind: 'block', type: 'math_number' },
                { kind: 'block', type: 'math_arithmetic' },
                { kind: 'block', type: 'math_single' },
              ],
            },
            {
              kind: 'category',
              name: 'Text',
              colour: '#5CA68D',
              contents: [
                { kind: 'block', type: 'text' },
                { kind: 'block', type: 'text_join' },
                { kind: 'block', type: 'text_length' },
              ],
            },
            {
              kind: 'category',
              name: 'Variables',
              colour: '#A55B80',
              custom: 'VARIABLE',
            },
            {
              kind: 'category',
              name: 'Functions',
              colour: '#995BA5',
              custom: 'PROCEDURE',
            },
          ],
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
        trashcan: true,
      });

      // Trigger resize after a short delay to ensure proper rendering
      setTimeout(() => {
        if (workspace.current) {
          Blockly.svgResize(workspace.current);
        }
      }, 50);
    }

    // Cleanup function
    return () => {
      if (!isVisible && workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, [isVisible]);

  // Handle resize when visibility changes
  useEffect(() => {
    if (isVisible && workspace.current) {
      setTimeout(() => {
        if (workspace.current) {
          Blockly.svgResize(workspace.current);
        }
      }, 100);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <div ref={blocklyDiv} className="w-full h-full" />
    </div>
  );
}