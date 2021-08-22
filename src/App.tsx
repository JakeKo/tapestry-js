import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { EVENT, listen, unlisten } from './events';
import { Rect } from './graphics';
import { useTapestryStore } from './store';
import { AppState, GraphicsState } from './store/types';

const graphicComponentMap = {
    rect: Rect
};

let i = 0;
function App() {
    const { createGraphic, updateGraphic } = useTapestryStore();
    const graphics = useSelector<AppState, GraphicsState>(state => state.graphics);

    useEffect(() => {
        listen(EVENT.GRAPHIC_MOUSE_DOWN, 'mousedown', event => {
            if (event.graphic.id !== 'hello-world') {
                updateGraphic({
                    id: 'hello-world',
                    props: {
                        strokeWidth: i
                    }
                });
            } else {
                i++;
                createGraphic({
                    id: 'hello-world-' + i,
                    type: 'rect', 
                    props: {
                        origin: { x: 50 * i, y: 0 },
                        dimensions: { x: 50, y: 50 },
                        fill: '#00000088',
                        strokeWidth: 4,
                        strokeColor: '#FF0000',
                        rotation: 45
                    }
                });
            }
        });

        createGraphic({
            id: 'hello-world',
            type: 'rect', 
            props: {
                origin: { x: 0, y: 0 },
                dimensions: { x: 50, y: 50 },
                fill: '#00000088',
                strokeWidth: 4,
                strokeColor: '#FF0000',
                rotation: 45
            }
        });

        return () => unlisten(EVENT.GRAPHIC_MOUSE_DOWN, 'mousedown');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <svg>
        {Object.values(graphics).map(g => {
            const Graphic = graphicComponentMap[g.type];
            return <Graphic key={g.id} {...g} />;
        })}
    </svg>;
}

export default App;
