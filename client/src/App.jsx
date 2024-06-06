import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Commercial from './components/Commercial';

import Navbar from './components/Header';
import Proforma from './components/Proforma';
import ViewProforma from './components/ViewProforma';
import EditProforma from './components/EditProforma';
import ViewCommercial from './components/ViewCommercial';
function App() {
    const [data, setData] = useState([]);

    return (
        <Router>
       <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Commercial />} />
                   
                    <Route path="/proforma" element={<Proforma />} />
                    <Route path="/commercial" element={<Commercial />} />
                    <Route path="/viewProforma" element={<ViewProforma />} />
                    <Route path="/editProforma/:id" element={<EditProforma />} />
                    <Route path="/viewCommercial" element={<ViewCommercial />} />
                </Routes>
            </div>
    </Router>
    );
}

export default App;
