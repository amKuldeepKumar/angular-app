export const loginAction = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook'
}

export const SESSION_KEYS = {
    TOKEN: 'TOKEN',
    EXPIRY: 'EXPIRY',
    USER: 'USER'
}

export const PERSON_TITLES_OPTIONS = [
    { label: 'Mr.', value: 'mr' },
    { label: 'Ms.', value: 'ms' },
    { label: 'Mrs.', value: 'mrs' },
    { label: 'Miss', value: 'miss' },
    { label: 'Dr.', value: 'dr' },
    { label: 'Prof.', value: 'prof' },
    { label: 'Mx.', value: 'mx' }
];


export const MARITIAL_STATUS_OPTIONS = [
    { label: 'Married', value: 'married' },
    { label: 'Civil Partner', value: 'civil_partner' },
    { label: 'Divorced or former Civil Partner', value: 'divorced' },
    { label: 'Single', value: 'single' },
    { label: 'Widowed', value: 'widowed' },
    { label: 'Cohabiting', value: 'cohabiting' },
    { label: 'Separated', value: 'separated' }
];

export const QUESTIONNAIRE_FORM_TABS = [
    { name: 'yourDetails', label: 'Your Details',index:1 , status:'' },
    { name: 'executors', label: 'Executors' ,index:5 ,status:''},
    { name: 'CHILDREN', label: 'Children',index:2 ,status:''},
    { name: 'giftInTheWill', label: 'Gift in the Will(Legacies)',index:6,status:'' },
    { name: 'property', label: 'Property',index:3 ,status:''},
    { name: 'estateDistributed', label: 'How the estate is distributed',index:7 ,status:''},
    { name: 'froeginAssets', label: 'Froegin Assets',index:4,status:'' },
    { name: 'lastFewQuestions', label: 'Last few questions',index:8,status:'' },
]


export const YOUR_DETAILS_QUESTIONS1 = [
    { name: 'title', type: 'select', placeholder: 'Your Title', options: [
        { label: 'Mr.', value: 'mr' },
        { label: 'Ms.', value: 'ms' },
        { label: 'Mrs.', value: 'mrs' },
        { label: 'Miss', value: 'miss' },
        { label: 'Dr.', value: 'dr' },
        { label: 'Prof.', value: 'prof' },
        { label: 'Mx.', value: 'mx' }
    ] },
    { name: 'fullName', type: 'text', placeholder: 'Your full name', infoText: 'include middle name' },
    { name: 'otherName', type: 'text', placeholder: 'Have you ever used any other names?', infoText: 'Maybe you changed your name when you were married? please give details' },
    { name: 'address', type: 'text', placeholder: 'Address', infoText: '' },
    { name: 'dayTimeTelephoneNumber', type: 'number', placeholder: 'Daytime Telephone Number ', infoText: '' },
    { name: 'mobileNo', type: 'number', placeholder: 'MobileNumber ', infoText: '',maxLength:"10" },
    { name: 'emailAddress', type: 'email', placeholder: 'Email Address', infoText: '' },
    { name: 'occupation', type: 'text', placeholder: 'Occupation', infoText: 'if you retired, write "retired", and give your previous occupation' },
    { name: 'dateOfBirth', type: 'date', placeholder: 'Your Date of birth', infoText: '' },
]

export const YOUR_DETAILS_QUESTIONS2 = [
    { name: 'maritalStatus', type: 'radio', label: 'Marital Status', options: MARITIAL_STATUS_OPTIONS, infoText: ''},
    { name: 'ukResidentPermanently', type: 'radio', label: 'Are you normally permanantly resident in the UK?', options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],infoText: ''},
];

export const CHILDREN_DETAILS = [
    { name: 'childName1', type: 'text', placeholder: 'ChildName'},
    { name: 'childAddress1', type: 'text', placeholder: 'Address'},
    { name: 'childDob1', type: 'number', placeholder: 'Date of birth'},
    { name: 'chilType1', type: 'text', placeholder: 'Child or Step Child'},
];