'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GoongMap = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.goongjs) {
            window.goongjs.accessToken = 'yn7zQK2me9A32r6ZVGl5BuBYBwjifSF3dqBbo9Wp';

            const newMap = new window.goongjs.Map({
                container: 'map',
                style: 'https://tiles.goong.io/assets/goong_map_web.json',
                center: [108.2432527, 16.0600528],
                zoom: 17
            });
            setMap(newMap);
        }
    }, []);

    return (
        <div className='w-full'>
            <Script
                src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"
                onLoad={() => console.log('GoongJS Loaded')}
                strategy="beforeInteractive"
            />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css"
            />
            <div id="map" style={{ width: '100%', height: '300px' }}></div>
        </div>
    );
};

export default GoongMap;
