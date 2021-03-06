import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import useStep from '../utils/useStep';
import { Layout, RandomGraphicElement } from '../components';
import mypass from '../assets/mypass.svg';
import { useTranslation } from 'react-i18next';

/**
 * Component which will display a Confirmation.
 */
const Confirmation: React.FC = ({ match }: any) => {
    const { nextStep } = useStep(match);
    const [title, setTitle] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        async function getInfo() {
            const employmentHistoryStatus = await localStorage.getItem('employmentHistory');
            const jobOfferStatus = await localStorage.getItem('jobOffer');

            if (jobOfferStatus && jobOfferStatus === 'completed') {
                setTitle("pages.general.confirmation.titleFinalApplication")
            }
            else if (employmentHistoryStatus && employmentHistoryStatus === 'completed') {
                setTitle("pages.general.confirmation.titlePreviousEmployer")
            } else {
                setTitle("pages.general.confirmation.titleCollegeDegree")
            }
        }

        getInfo();
    }, []);

    return (
        <Layout match={match}>
            <RandomGraphicElement elements={5}>
                <div className='confirmation-page'>
                    <div className='mypass-wrapper'>
                        <img src={mypass} alt='myPass.ID app logo' />
                        <h4>{t('pages.general.confirmation.myPass')}</h4>
                    </div>
                    <h2>{t(title)}</h2>
                    <Link to={nextStep}>
                        <Button className="continueBtn">
                            {t("actions.continue")}
                        </Button>
                    </Link>
                </div>
            </RandomGraphicElement>
        </Layout>
    );
};

export default Confirmation;
