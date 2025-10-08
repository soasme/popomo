'use client';

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';

interface BlocklyMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BlocklyMenu({ isOpen, onClose }: BlocklyMenuProps) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (isOpen && blocklyDiv.current && !workspace.current) {
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: {
          kind: 'categoryToolbox',
          contents: [
            {
              kind: 'category',
              name: 'Logic',
              colour: '#5C81A6',
              contents: [
                {
                  kind: 'block',
                  type: 'controls_if',
                },
                {
                  kind: 'block',
                  type: 'logic_compare',
                },
                {
                  kind: 'block',
                  type: 'logic_operation',
                },
                {
                  kind: 'block',
                  type: 'logic_negate',
                },
                {
                  kind: 'block',
                  type: 'logic_boolean',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Loops',
              colour: '#5CA65C',
              contents: [
                {
                  kind: 'block',
                  type: 'controls_repeat_ext',
                },
                {
                  kind: 'block',
                  type: 'controls_whileUntil',
                },
                {
                  kind: 'block',
                  type: 'controls_for',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Math',
              colour: '#5C68A6',
              contents: [
                {
                  kind: 'block',
                  type: 'math_number',
                },
                {
                  kind: 'block',
                  type: 'math_arithmetic',
                },
                {
                  kind: 'block',
                  type: 'math_single',
                },
              ],
            },
            {
              kind: 'category',
              name: 'Text',
              colour: '#5CA68D',
              contents: [
                {
                  kind: 'block',
                  type: 'text',
                },
                {
                  kind: 'block',
                  type: 'text_join',
                },
                {
                  kind: 'block',
                  type: 'text_length',
                },
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
    }

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-4/5 h-4/5 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Blockly Programming</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="flex-1">
          <div ref={blocklyDiv} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}