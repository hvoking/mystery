// React imports
import { useState, useEffect } from 'react';

// Context imports
import { useGeo } from '../../../context/geo';

// Third-party imports
import { Marker } from 'react-map-gl';

export const Avatar = () => {
	const { viewport, setViewport } = useGeo();

    const [ direction, setDirection ] = useState('down');
    const [ step, setStep ] = useState(0);

    const spriteImage = process.env.PUBLIC_URL + '/static/sprite/sprite-boy.png';

	useEffect(() => {
		const handleKeyDown = (e: any) => {
            let moveDistance = 0.0004; // Adjust movement speed if needed
            let { latitude, longitude } = viewport;

            const updateStep = () => setStep((prevStep: any) => (prevStep + 1) % 4);

            switch (e.key) {
                // Arrow keys and WASD controls
                case 'ArrowUp':
                case 'W':
                case 'w':
                    setViewport((prev: any) => ({...prev, latitude: latitude + moveDistance, longitude }));
                    setDirection('up');
                    updateStep();
                    break;
                case 'ArrowDown':
                case 'S':
                case 's':
                    setViewport((prev: any) => ({...prev, latitude: latitude - moveDistance, longitude }));
                    setDirection('down');
                    updateStep();
                    break;
                case 'ArrowLeft':
                case 'A':
                case 'a':
                    setViewport((prev: any) => ({...prev, latitude, longitude: longitude - moveDistance }));
                    setDirection('left');
                    updateStep();
                    break;
                case 'ArrowRight':
                case 'D':
                case 'd':
                    setViewport((prev: any) => ({...prev, latitude, longitude: longitude + moveDistance }));
                    setDirection('right');
                    updateStep();
                    break;
                default:
                    break;
            }
        };

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		}; 
	}, [viewport]);

	const getBackgroundPosition = () => {
        let xOffset = step * -64;
        let yOffset = 0;

        switch (direction) {
            case 'down':
                yOffset = 0;
                break;
            case 'left':
                yOffset = -64;
                break;
            case 'right':
                yOffset = -128;
                break;
            case 'up':
                yOffset = -192;
                break;
            default:
                break;
        }
        return `${xOffset}px ${yOffset}px`;
    };
	return (
		<Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            anchor="center"
        >
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    backgroundImage: `url(${spriteImage})`,
                    backgroundPosition: getBackgroundPosition(),
                }}
            />
        </Marker>

	)
}

Avatar.displayName="Avatar";