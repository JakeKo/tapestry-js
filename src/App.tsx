import { useSelector } from 'react-redux';
import { Rect } from './graphics';
import { AppState, GraphicsState } from './store/types';

const graphicComponentMap = {
    rect: Rect
} as Record<string, () => JSX.Element>;

function App() {
    const graphics = useSelector<AppState, GraphicsState>(state => state.graphics);

    return <svg>
        {Object.values(graphics).map(g => {
            const Graphic = graphicComponentMap[g.type];
            return <Graphic />;
        })}
    </svg>;
}

export default App;
