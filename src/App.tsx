import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rect } from './graphics';
import { createGraphic } from './store';
import { AppState, GraphicsState } from './store/types';

const graphicComponentMap = {
    rect: Rect
};

function App() {
    const dispatch = useDispatch();
    const graphics = useSelector<AppState, GraphicsState>(state => state.graphics);

    useEffect(() => {
        dispatch(createGraphic({
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
        }));
    }, []);

    return <svg>
        {Object.values(graphics).map(g => {
            const Graphic = graphicComponentMap[g.type];
            return <Graphic key={g.id} props={g.props} />;
        })}
    </svg>;
}

export default App;
