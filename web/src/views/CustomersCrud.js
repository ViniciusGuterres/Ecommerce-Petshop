import { useState } from "react";

// Components
import Input from "../components/Input.jsx";
import UploadInput from '../components/UploadInput.jsx';

function CustomersCrud() {
    // States
    const [customerPersonalDataObj, setCustomerPersonalDataObj] = useState({});
    const [crudMode, setCrudMode] = useState('create') // options: edit, view, create
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
                return (
                    < PersonalDataForm
                        name={customerPersonalDataObj.name}
                        cpf={customerPersonalDataObj.cpf}
                        telephone={customerPersonalDataObj.telephone}
                    />
                );
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

            {/* Forms content */}
            {buildCurrentTabForm()}
        </div>
    );
}

function PersonalDataForm({ name, lastName, cpf, telephone, address, city, state }) {
    return (
        <form>
            <div className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                    {/* Name */}
                    <Input
                        value={name}
                        type={'text'}
                        onChange={() => console.log('test')}
                        placeholder='Nome'
                        cssClass='text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />

                    {/*  LastName */}
                    <Input
                        value={lastName}
                        type={'text'}
                        onChange={() => console.log('test')}
                        placeholder='Sobrenome'
                        cssClass='text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />
                </div>

                <div className="flex gap-2">
                    {/* CPF */}
                    <Input
                        value={cpf}
                        type={'text'}
                        onChange={() => console.log('test')}
                        placeholder='CPF'
                        cssClass='text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />

                    {/* Telephone */}
                    <Input
                        value={telephone}
                        type={'number'}
                        onChange={() => console.log('test')}
                        placeholder='Telefone'
                        cssClass='text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />
                </div>

                {/* Address */}
                <Input
                    value={address}
                    type={'text'}
                    onChange={() => console.log('test')}
                    placeholder='Endereço'
                    cssClass='text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                />

                <div className="flex gap-2">
                    {/* City */}
                    <Input
                        value={city}
                        type={'text'}
                        onChange={() => console.log('test')}
                        placeholder='Cidade'
                        cssClass='text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />

                    {/* State */}
                    <Input
                        value={state}
                        type={'text'}
                        onChange={() => console.log('test')}
                        placeholder='Estado'
                        cssClass='text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400'
                    />
                </div>

                {/* Profile img */}
                <UploadInput />
            </div>
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