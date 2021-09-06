/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { decorateCanvasEvent, EVENT, EventHandler, listen, listenOnce, unlisten } from './events';
import { Rect, Ellipse } from './graphics';
import { useTapestryStore } from './store';
import { AppState } from './store/types';
import { objectLayer } from './utils';
import { apply, towards, transform } from './vector';

const graphicComponentMap = {
    rect: Rect,
    ellipse: Ellipse
};

function App() {
    const { createGraphic, updateGraphic, setCursor, setCursorLock } = useTapestryStore();
    const graphics = useSelector((state: AppState) => state.graphics);
    const cursor = useSelector((state: AppState) => state.canvas.cursor);

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

        const drawGraphic: EventHandler = ({ baseEvent, graphic }) => {
            if (graphic) {
                return;
            }

            const id = Math.random().toString();
            const position = { x: baseEvent.clientX, y: baseEvent.clientY };
            createGraphic({
                id,
                type: 'rect',
                props: {
                    origin: position,
                    dimensions: { x: 0, y: 0 }
                }
            });

            listen(EVENT.CANVAS.MOUSE_MOVE, 'draw', ({ baseEvent }) => {
                const newPosition = { x: baseEvent.clientX, y: baseEvent.clientY };
                updateGraphic({
                    id,
                    props: {
                        origin: apply(position, newPosition, Math.min),
                        dimensions: transform(towards(position, newPosition), Math.abs),
                    }
                });
            });

            listenOnce(EVENT.CANVAS.MOUSE_UP, 'end-draw', () => {
                unlisten(EVENT.CANVAS.MOUSE_MOVE, 'draw');
                listenOnce(EVENT.CANVAS.MOUSE_DOWN, 'start-draw', drawGraphic);
            });
        };

        listenOnce(EVENT.CANVAS.MOUSE_DOWN, 'start-draw', drawGraphic);

        listen(EVENT.CANVAS.MOUSE_MOVE, 'canvas-cursor', ({ graphic }) => {
            setCursor(graphic ? 'grab' : 'default');
        });
    }, []);

    return <svg
        onMouseDown={decorateCanvasEvent('MOUSE_DOWN')}
        onMouseMove={decorateCanvasEvent('MOUSE_MOVE')}
        onMouseUp={decorateCanvasEvent('MOUSE_UP')}
        style={{ width: '100%', height: '100%', cursor }}
    >
        {Object.values(graphics).map(g => {
            const Graphic = graphicComponentMap[g.type];
            return <Graphic key={g.id} {...g} />;
        })}
    </svg>;
}

export default App;
