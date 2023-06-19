import '../index.css';

// Components
import Header from './Header.jsx';

function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default Layout;