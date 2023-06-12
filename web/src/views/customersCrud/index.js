import { useState } from "react";


function CustomersCrud() {
    // States
    const [customerInfoObj, setCustomerInfoObj] = useState({});
    const [viewMode, setViewMode] = useState('create') // options: edit, view, create
    const [currentTab, setCurrentTab] = useState('personalData') // options: personalData, loginData, creditCardData

    // Globals vars
    const defaultTabClass = 'inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300';
    const selectedTabClass = 'text-primary-700 border-primary-700 inline-block rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300';

    // Functions
    /**
     * @function buildCurrentTabForm - Will render the selected tab PersonalDataForm, LoginDataForm or CreditCardData form 
     * @returns {Element} - Wil return a react element
     */
    const buildCurrentTabForm = () => {
        switch (currentTab) {
            case 'personalData': {
                return PersonalDataForm();
            }
            case 'loginData': {
                return LoginDataForm();
            }
            case 'creditCardData': {
                return CreditCardDataForm();
            }
            default: {
                return PersonalDataForm();
            }
        }
    }

    /**
     * @function getTabButtonClass - Will return selected css class if the current tab is selected, otherwise will return default css style class
     * @returns {string} - Will return class string
     */
    const getTabButtonClass = (tabName) => {
        return tabName === currentTab ? selectedTabClass : defaultTabClass;
    }

    return (
        <div>
            {/* Tabs selector */}
            <div className="max-w-2xl mx-auto">

                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                    <ul
                        className="flex flex-wrap justify-center -mb-px"
                        id="myTab"
                        data-tabs-toggle="#myTabContent"
                        role="tablist"
                    >
                        <li className="mr-2" role="presentation">
                            <button
                                className={getTabButtonClass('personalData')}
                                id="personalData-tab"
                                data-tabs-target="#personalData"
                                type="button"
                                role="tab"
                                aria-controls="personalData"
                                aria-selected="false"
                                onClick={() => setCurrentTab('personalData')}
                            >
                                Dados Pessoais
                            </button>
                        </li>

                        <li className="mr-2" role="presentation">
                            <button
                                className={getTabButtonClass('loginData')}
                                id="loginData-tab"
                                data-tabs-target="#loginData"
                                type="button"
                                role="tab"
                                aria-controls="loginData"
                                aria-selected="false"
                                onClick={() => setCurrentTab('loginData')}
                            >
                                Dados de Login
                            </button>
                        </li>

                        <li className="mr-2" role="presentation">
                            <button
                                className={getTabButtonClass('creditCardData')}
                                id="creditCardData-tab"
                                data-tabs-target="#creditCardData"
                                type="button"
                                role="tab"
                                aria-controls="creditCardData"
                                aria-selected="false"
                                onClick={() => setCurrentTab('creditCardData')}

                            >
                                Dados de cartão de crédito
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {buildCurrentTabForm()}
        </div>
    );
}

function PersonalDataForm() {
    return (
        <form>
            Personal data form
        </form>
    )
}

function LoginDataForm() {
    return (
        <form>
            Login data form
        </form>
    )
}

function CreditCardDataForm() {
    return (
        <form>
            Credit data form
        </form>
    )
}

export default CustomersCrud;