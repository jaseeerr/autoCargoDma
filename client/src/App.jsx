import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Commercial from './components/Commercial';

import Navbar from './components/Header';
import Proforma from './components/Proforma';
import ViewProforma from './components/ViewProforma';
import EditProforma from './components/EditProforma';
import ViewCommercial from './components/ViewCommercial';
import EditCommercial from './components/EditCommercial';
import Proforma1 from './components/v2/ProformaV2';
import EditProformaV2 from './components/v2/EditProformaV2';
import ProformaV2 from './components/v2/ProformaV2';
import CommercialV2 from './components/v2/CommercialV2';
import EditCommercialV2 from './components/v2/EditCommercialV2';
function App() {
    const [data, setData] = useState([]);

    return (
        <Router>
       <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<CommercialV2 />} />
                    <Route path="/test" element={<ProformaV2 />} />

                   
                    <Route path="/proforma" element={<ProformaV2 />} />
                    <Route path="/commercial" element={<CommercialV2 />} />
                    <Route path="/viewProforma" element={<ViewProforma />} />
                    <Route path="/editProforma/:id" element={<EditProformaV2 />} />
                    <Route path="/viewCommercial" element={<ViewCommercial />} />
                    <Route path="/editCommerical/:id" element={<EditCommercialV2 />} />

                </Routes>
            </div>
    </Router>
    );
}

export default App;
