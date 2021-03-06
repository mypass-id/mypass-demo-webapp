import React, { useEffect } from 'react';
import {
    App,
    ControlIdentity,
    Footer,
    Header,
    HowItWorks,
    Main,
    MyPass,
    Benefits
} from '../components/landing';

/**
 * Component which will display a Landing page.
 */
const Landing: React.FC = ({ location }: any) => {
    useEffect(() => {
        if (location.hash) {
            const target: Element | null = document.querySelector(location.hash);
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [location.hash]);

    return (
        <div className='theme-demo'>
            <div className='landing-page-wrapper'>
                <Header />
                <Main />
                <ControlIdentity />
                <MyPass />
                <HowItWorks />
                <Benefits />
                <App />
                <Footer />
            </div>
        </div>
    );
};

export default Landing;
