import React from 'react';
import { Img, staticFile } from 'remotion';
import { z } from 'zod';

export const backgroundImageSchema = z.object({
	background: z.string(),
});

interface BackgroundImageProps {
	background: string;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ background }) => {
	// If background starts with #, treat it as a color
	if (background.startsWith('#')) {
		return (
			<div
				style={{
					backgroundColor: background,
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
				}}
			/>
		);
	}

	// Otherwise, treat it as a video/image file
	return <Img src={staticFile(background)} />;
};