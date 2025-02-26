import {Dashboard} from "./components/home/Dashboard.tsx";
import {Route, Routes} from "react-router-dom";
import {ResultsComponent} from "./components/page/ResultsComponent.tsx";
import {FinalizeComponent} from "./components/page/FinalizeComponent.tsx";


export const App = () => {
    return (
        <div className = {'wrapper'}>
        <div className={'container'}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/results/:testId" element={<ResultsComponent />} />
                <Route path="/finalize/:testId" element={<FinalizeComponent />} />
            </Routes>
        </div>
        </div>
    );
};
