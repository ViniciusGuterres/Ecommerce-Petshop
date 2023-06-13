import '../index.css';

// Components
import Header from './Header.jsx';

import CustomersCrud from '../views/CustomersCrud.js';

function Layout() {
    return (
        <div>
            <Header />

            <CustomersCrud />
        </div>
    );
}

export default Layout;