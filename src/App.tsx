/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { decorateCanvasEvent, EVENT, EventHandler, listen, listenOnce, unlisten } from './events';
import { Rect } from './graphics';
import Ellipse from './graphics/ellipse';
import { useTapestryStore } from './store';
import { AppState, GraphicsState } from './store/types';
import { objectLayer } from './utils';

const graphicComponentMap = {
    rect: Rect,
    ellipse: Ellipse
};

function App() {
    const { createGraphic, updateGraphic, setCursor, setCursorLock } = useTapestryStore();
    const graphics = useSelector<AppState, GraphicsState>(state => state.graphics);
    const cursor = useSelector<AppState, string>(state => state.canvas.cursor);

    useEffect(() => {
        const moveGraphic: EventHandler = ({ baseEvent, graphic, utils }) => {
            const cursorOffset = utils.cursorOffset(baseEvent);
            setCursor('grabbing');
            setCursorLock(true);

            listen(EVENT.CANVAS.MOUSE_MOVE, 'mousemove', ({ baseEvent }) => {
                updateGraphic(objectLayer({ id: graphic.id }, utils.drag(baseEvent, cursorOffset)));
            });

            listenOnce(EVENT.CANVAS.MOUSE_UP, 'mouseup', () => {
                setCursor('grab');
                setCursorLock(false);

                unlisten(EVENT.CANVAS.MOUSE_MOVE, 'mousemove');
                listenOnce(EVENT.GRAPHIC.MOUSE_DOWN,'mousedown', moveGraphic);
            });
        };

        listenOnce(EVENT.GRAPHIC.MOUSE_DOWN, 'mousedown', moveGraphic);

        listen(EVENT.CANVAS.MOUSE_MOVE, 'canvas-cursor', ({ graphic }) => {
            setCursor(graphic ? 'grab' : 'default');
        });

        createGraphic({
            id: 'hello-world',
            type: 'rect',
            props: {
                origin: { x: 0, y: 0 },
                dimensions: { x: 50, y: 50 },
                fill: '#00000088',
                strokeWidth: 10,
                strokeColor: '#FF0000',
                rotation: 45,
            },
        });

        createGraphic({
            id: 'circle',
            type: 'ellipse',
            props: {
                origin: { x: 100, y: 100 },
                dimensions: { x: 50, y: 50 },
                fill: '#00000088'
            }
        });

        return () => unlisten(EVENT.GRAPHIC.MOUSE_DOWN, 'mousedown');
    }, []);

    return <svg
        onMouseMove={decorateCanvasEvent('MOUSE_MOVE')}
        onMouseUp={decorateCanvasEvent('MOUSE_UP')}
        style={{ cursor }}
    >
        {Object.values(graphics).map(g => {
            const Graphic = graphicComponentMap[g.type];
            return <Graphic key={g.id} {...g} />;
        })}
    </svg>;
}

export default App;
