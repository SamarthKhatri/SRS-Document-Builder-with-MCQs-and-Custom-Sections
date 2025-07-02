import React, { useState, Fragment } from 'react';
import { FileTextIcon, CheckCircleIcon, PlusCircleIcon } from 'lucide-react';
export function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    clientName: '',
    logoUrl: '',
    sections: {
      introduction: {
        purpose: '',
        scope: '',
        overview: ''
      },
      generalDescription: {
        functions: '',
        userCommunity: ''
      },
      functionalRequirements: {
        outcomes: '',
        rankedOrder: '',
        inputOutput: ''
      },
      userInterface: {
        interfaces: '',
        examples: ''
      },
      performance: {
        responseTime: '',
        throughput: '',
        scalability: ''
      },
      nonFunctional: {
        usability: '',
        reliability: '',
        security: ''
      },
      schedule: {
        timeline: '',
        costEstimate: ''
      },
      appendices: {
        supplementary: '',
        glossary: ''
      }
    },
    customSections: []
  });
  const [isPreview, setIsPreview] = useState(false);
  const steps = [{
    title: 'Company Information',
    icon: <div className="mr-2" size={18} />
  }, {
    title: 'Introduction',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'General Description',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'Functional Requirements',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'User Interface',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'Performance',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'Non-Functional Attributes',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'Schedule and Budget',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'Appendices',
    icon: <FileTextIcon className="mr-2" size={18} />
  }, {
    title: 'Custom Sections',
    icon: <PlusCircleIcon className="mr-2" size={18} />
  }, {
    title: 'Preview',
    icon: <CheckCircleIcon className="mr-2" size={18} />
  }];
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          ...prev.sections[section],
          [field]: value
        }
      }
    }));
  };
  const handleBasicInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const addCustomSection = () => {
    setFormData(prev => ({
      ...prev,
      customSections: [...prev.customSections, {
        title: '',
        content: ''
      }]
    }));
  };
  const updateCustomSection = (index, field, value) => {
    setFormData(prev => {
      const updatedSections = [...prev.customSections];
      updatedSections[index] = {
        ...updatedSections[index],
        [field]: value
      };
      return {
        ...prev,
        customSections: updatedSections
      };
    });
  };
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };
  return <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SRS Document Generator</h1>
          <button onClick={togglePreview} className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition">
            {isPreview ? 'Edit' : 'Preview SRS'}
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6">
        {!isPreview ? <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                {steps.map((step, index) => <Fragment key={index}>
                    <div className={`flex items-center ${index <= currentStep ? 'text-green-600' : 'text-gray-400'}`} onClick={() => setCurrentStep(index)}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${index <= currentStep ? 'border-green-600 bg-green-100' : 'border-gray-300'} cursor-pointer`}>
                        {index + 1}
                      </div>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-green-600' : 'bg-gray-300'}`}></div>}
                  </Fragment>)}
              </div>
              <h2 className="text-xl font-semibold text-center flex items-center justify-center">
                {steps[currentStep].icon}
                {steps[currentStep].title}
              </h2>
            </div>
            <div className="mt-6">
              {currentStep === 0 && <CompanyInfoStep formData={formData} handleChange={handleBasicInfoChange} />}
              {currentStep === 1 && <IntroductionStep formData={formData.sections.introduction} handleChange={(field, value) => handleChange('introduction', field, value)} />}
              {currentStep === 2 && <GeneralDescriptionStep formData={formData.sections.generalDescription} handleChange={(field, value) => handleChange('generalDescription', field, value)} />}
              {currentStep === 3 && <FunctionalRequirementsStep formData={formData.sections.functionalRequirements} handleChange={(field, value) => handleChange('functionalRequirements', field, value)} />}
              {currentStep === 4 && <UserInterfaceStep formData={formData.sections.userInterface} handleChange={(field, value) => handleChange('userInterface', field, value)} />}
              {currentStep === 5 && <PerformanceStep formData={formData.sections.performance} handleChange={(field, value) => handleChange('performance', field, value)} />}
              {currentStep === 6 && <NonFunctionalStep formData={formData.sections.nonFunctional} handleChange={(field, value) => handleChange('nonFunctional', field, value)} />}
              {currentStep === 7 && <ScheduleStep formData={formData.sections.schedule} handleChange={(field, value) => handleChange('schedule', field, value)} />}
              {currentStep === 8 && <AppendicesStep formData={formData.sections.appendices} handleChange={(field, value) => handleChange('appendices', field, value)} />}
              {currentStep === 9 && <CustomSectionsStep customSections={formData.customSections} addCustomSection={addCustomSection} updateCustomSection={updateCustomSection} />}
              {currentStep === 10 && <PreviewStep formData={formData} />}
              <div className="flex justify-between mt-8">
                <button onClick={prevStep} disabled={currentStep === 0} className={`px-4 py-2 rounded-md ${currentStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                  Previous
                </button>
                <button onClick={nextStep} disabled={currentStep === steps.length - 1} className={`px-4 py-2 rounded-md ${currentStep === steps.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                  Next
                </button>
              </div>
            </div>
          </div> : <SRSPreview formData={formData} onBack={togglePreview} />}
      </main>
    </div>;
}
function CompanyInfoStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        Company Information
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name (creating the SRS)
          </label>
          <input type="text" value={formData.companyName} onChange={e => handleChange('companyName', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Your company name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name (for whom the SRS is made)
          </label>
          <input type="text" value={formData.clientName} onChange={e => handleChange('clientName', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Client company name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Logo URL
          </label>
          <input type="text" value={formData.logoUrl} onChange={e => handleChange('logoUrl', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="https://example.com/logo.png" />
          {formData.logoUrl && <div className="mt-2 p-2 border rounded-md">
              <p className="text-sm text-gray-500 mb-1">Logo Preview:</p>
              <img src={formData.logoUrl} alt="Company Logo" className="max-h-16 object-contain" onError={e => e.currentTarget.style.display = 'none'} />
            </div>}
        </div>
      </div>
    </div>;
}
function IntroductionStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">1. Introduction</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purpose of the document
        </label>
        <select value={formData.purpose} onChange={e => handleChange('purpose', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select a purpose</option>
          <option value="To define requirements for a new software system">
            To define requirements for a new software system
          </option>
          <option value="To define requirements for enhancements to an existing system">
            To define requirements for enhancements to an existing system
          </option>
          <option value="To define requirements for a replacement system">
            To define requirements for a replacement system
          </option>
          <option value="To define requirements for a component of a larger system">
            To define requirements for a component of a larger system
          </option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.purpose === 'custom' && <textarea value={formData.customPurpose} onChange={e => handleChange('customPurpose', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Describe the purpose..." rows={3}></textarea>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scope
        </label>
        <textarea value={formData.scope} onChange={e => handleChange('scope', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="What is the scope of this software project?" rows={3}></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overview
        </label>
        <textarea value={formData.overview} onChange={e => handleChange('overview', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Provide a brief overview of the software system..." rows={3}></textarea>
      </div>
    </div>;
}
function GeneralDescriptionStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        2. General Description
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Main Functions
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="function-user-management" className="mr-2" onChange={e => {
            const currentFunctions = formData.functions ? formData.functions.split(',') : [];
            const value = 'User Management';
            if (e.target.checked) {
              handleChange('functions', [...currentFunctions, value].join(','));
            } else {
              handleChange('functions', currentFunctions.filter(f => f !== value).join(','));
            }
          }} checked={formData.functions && formData.functions.includes('User Management')} />
            <label htmlFor="function-user-management">User Management</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="function-data-processing" className="mr-2" onChange={e => {
            const currentFunctions = formData.functions ? formData.functions.split(',') : [];
            const value = 'Data Processing';
            if (e.target.checked) {
              handleChange('functions', [...currentFunctions, value].join(','));
            } else {
              handleChange('functions', currentFunctions.filter(f => f !== value).join(','));
            }
          }} checked={formData.functions && formData.functions.includes('Data Processing')} />
            <label htmlFor="function-data-processing">Data Processing</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="function-reporting" className="mr-2" onChange={e => {
            const currentFunctions = formData.functions ? formData.functions.split(',') : [];
            const value = 'Reporting';
            if (e.target.checked) {
              handleChange('functions', [...currentFunctions, value].join(','));
            } else {
              handleChange('functions', currentFunctions.filter(f => f !== value).join(','));
            }
          }} checked={formData.functions && formData.functions.includes('Reporting')} />
            <label htmlFor="function-reporting">Reporting</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="function-integration" className="mr-2" onChange={e => {
            const currentFunctions = formData.functions ? formData.functions.split(',') : [];
            const value = 'Integration with Other Systems';
            if (e.target.checked) {
              handleChange('functions', [...currentFunctions, value].join(','));
            } else {
              handleChange('functions', currentFunctions.filter(f => f !== value).join(','));
            }
          }} checked={formData.functions && formData.functions.includes('Integration with Other Systems')} />
            <label htmlFor="function-integration">
              Integration with Other Systems
            </label>
          </div>
        </div>
        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Other Functions (comma separated)
        </label>
        <input type="text" value={formData.otherFunctions || ''} onChange={e => handleChange('otherFunctions', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Authentication, File Uploads, etc." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User Community
        </label>
        <select value={formData.userCommunity} onChange={e => handleChange('userCommunity', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select intended users</option>
          <option value="General public">General public</option>
          <option value="Technical users">Technical users</option>
          <option value="Business professionals">Business professionals</option>
          <option value="Internal employees">Internal employees</option>
          <option value="Mixed user groups">Mixed user groups</option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.userCommunity === 'custom' && <textarea value={formData.customUserCommunity || ''} onChange={e => handleChange('customUserCommunity', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Describe the user community..." rows={3}></textarea>}
      </div>
    </div>;
}
function FunctionalRequirementsStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        3. Functional Requirements
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Possible Outcomes
        </label>
        <textarea value={formData.outcomes} onChange={e => handleChange('outcomes', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="List possible outcomes of the software system..." rows={3}></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Requirements Priority
        </label>
        <select value={formData.rankedOrder} onChange={e => handleChange('rankedOrder', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select priority method</option>
          <option value="MoSCoW (Must, Should, Could, Won't)">
            MoSCoW (Must, Should, Could, Won't)
          </option>
          <option value="High/Medium/Low">High/Medium/Low</option>
          <option value="Numerical ranking (1-10)">
            Numerical ranking (1-10)
          </option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.rankedOrder === 'custom' && <textarea value={formData.customRankedOrder || ''} onChange={e => handleChange('customRankedOrder', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Describe the ranking method..." rows={3}></textarea>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Input-Output Relationship
        </label>
        <textarea value={formData.inputOutput} onChange={e => handleChange('inputOutput', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Describe the relationship between inputs and outputs..." rows={3}></textarea>
      </div>
    </div>;
}
function UserInterfaceStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        4. User Interface Requirements
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Software Interfaces
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="interface-web" className="mr-2" onChange={e => {
            const currentInterfaces = formData.interfaces ? formData.interfaces.split(',') : [];
            const value = 'Web Interface';
            if (e.target.checked) {
              handleChange('interfaces', [...currentInterfaces, value].join(','));
            } else {
              handleChange('interfaces', currentInterfaces.filter(i => i !== value).join(','));
            }
          }} checked={formData.interfaces && formData.interfaces.includes('Web Interface')} />
            <label htmlFor="interface-web">Web Interface</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="interface-mobile" className="mr-2" onChange={e => {
            const currentInterfaces = formData.interfaces ? formData.interfaces.split(',') : [];
            const value = 'Mobile App';
            if (e.target.checked) {
              handleChange('interfaces', [...currentInterfaces, value].join(','));
            } else {
              handleChange('interfaces', currentInterfaces.filter(i => i !== value).join(','));
            }
          }} checked={formData.interfaces && formData.interfaces.includes('Mobile App')} />
            <label htmlFor="interface-mobile">Mobile App</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="interface-desktop" className="mr-2" onChange={e => {
            const currentInterfaces = formData.interfaces ? formData.interfaces.split(',') : [];
            const value = 'Desktop Application';
            if (e.target.checked) {
              handleChange('interfaces', [...currentInterfaces, value].join(','));
            } else {
              handleChange('interfaces', currentInterfaces.filter(i => i !== value).join(','));
            }
          }} checked={formData.interfaces && formData.interfaces.includes('Desktop Application')} />
            <label htmlFor="interface-desktop">Desktop Application</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="interface-api" className="mr-2" onChange={e => {
            const currentInterfaces = formData.interfaces ? formData.interfaces.split(',') : [];
            const value = 'API';
            if (e.target.checked) {
              handleChange('interfaces', [...currentInterfaces, value].join(','));
            } else {
              handleChange('interfaces', currentInterfaces.filter(i => i !== value).join(','));
            }
          }} checked={formData.interfaces && formData.interfaces.includes('API')} />
            <label htmlFor="interface-api">API</label>
          </div>
        </div>
        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Other Interfaces (comma separated)
        </label>
        <input type="text" value={formData.otherInterfaces || ''} onChange={e => handleChange('otherInterfaces', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="CLI, Voice Interface, etc." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Interface Examples or Mockups
        </label>
        <textarea value={formData.examples} onChange={e => handleChange('examples', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Describe any UI mockups or examples..." rows={3}></textarea>
      </div>
    </div>;
}
function PerformanceStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        5. Performance Requirements
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Response Time
        </label>
        <select value={formData.responseTime} onChange={e => handleChange('responseTime', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select response time requirement</option>
          <option value="Under 1 second for all operations">
            Under 1 second for all operations
          </option>
          <option value="Under 3 seconds for complex operations">
            Under 3 seconds for complex operations
          </option>
          <option value="Under 5 seconds for data-intensive operations">
            Under 5 seconds for data-intensive operations
          </option>
          <option value="Varies by operation type">
            Varies by operation type
          </option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.responseTime === 'custom' && <textarea value={formData.customResponseTime || ''} onChange={e => handleChange('customResponseTime', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Specify response time requirements..." rows={3}></textarea>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Throughput
        </label>
        <select value={formData.throughput} onChange={e => handleChange('throughput', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select throughput requirement</option>
          <option value="Support for up to 100 concurrent users">
            Support for up to 100 concurrent users
          </option>
          <option value="Support for up to 1,000 concurrent users">
            Support for up to 1,000 concurrent users
          </option>
          <option value="Support for up to 10,000 concurrent users">
            Support for up to 10,000 concurrent users
          </option>
          <option value="Support for 10,000+ concurrent users">
            Support for 10,000+ concurrent users
          </option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.throughput === 'custom' && <textarea value={formData.customThroughput || ''} onChange={e => handleChange('customThroughput', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Specify throughput requirements..." rows={3}></textarea>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scalability
        </label>
        <select value={formData.scalability} onChange={e => handleChange('scalability', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select scalability requirement</option>
          <option value="Vertical scaling (more powerful hardware)">
            Vertical scaling (more powerful hardware)
          </option>
          <option value="Horizontal scaling (more instances)">
            Horizontal scaling (more instances)
          </option>
          <option value="Both vertical and horizontal scaling">
            Both vertical and horizontal scaling
          </option>
          <option value="Cloud-native auto-scaling">
            Cloud-native auto-scaling
          </option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.scalability === 'custom' && <textarea value={formData.customScalability || ''} onChange={e => handleChange('customScalability', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Specify scalability requirements..." rows={3}></textarea>}
      </div>
    </div>;
}
function NonFunctionalStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        6. Non-Functional Attributes
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Usability
        </label>
        <select value={formData.usability} onChange={e => handleChange('usability', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select usability requirement</option>
          <option value="Intuitive for non-technical users">
            Intuitive for non-technical users
          </option>
          <option value="Accessible (WCAG 2.1 AA compliant)">
            Accessible (WCAG 2.1 AA compliant)
          </option>
          <option value="Mobile-friendly design">Mobile-friendly design</option>
          <option value="Consistent UI patterns">Consistent UI patterns</option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.usability === 'custom' && <textarea value={formData.customUsability || ''} onChange={e => handleChange('customUsability', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Specify usability requirements..." rows={3}></textarea>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reliability
        </label>
        <select value={formData.reliability} onChange={e => handleChange('reliability', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select reliability requirement</option>
          <option value="99.9% uptime (three nines)">
            99.9% uptime (three nines)
          </option>
          <option value="99.99% uptime (four nines)">
            99.99% uptime (four nines)
          </option>
          <option value="99.999% uptime (five nines)">
            99.999% uptime (five nines)
          </option>
          <option value="Fault-tolerant design">Fault-tolerant design</option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.reliability === 'custom' && <textarea value={formData.customReliability || ''} onChange={e => handleChange('customReliability', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Specify reliability requirements..." rows={3}></textarea>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Security
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="security-authentication" className="mr-2" onChange={e => {
            const currentSecurity = formData.security ? formData.security.split(',') : [];
            const value = 'User Authentication';
            if (e.target.checked) {
              handleChange('security', [...currentSecurity, value].join(','));
            } else {
              handleChange('security', currentSecurity.filter(s => s !== value).join(','));
            }
          }} checked={formData.security && formData.security.includes('User Authentication')} />
            <label htmlFor="security-authentication">User Authentication</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="security-authorization" className="mr-2" onChange={e => {
            const currentSecurity = formData.security ? formData.security.split(',') : [];
            const value = 'Role-based Authorization';
            if (e.target.checked) {
              handleChange('security', [...currentSecurity, value].join(','));
            } else {
              handleChange('security', currentSecurity.filter(s => s !== value).join(','));
            }
          }} checked={formData.security && formData.security.includes('Role-based Authorization')} />
            <label htmlFor="security-authorization">
              Role-based Authorization
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="security-encryption" className="mr-2" onChange={e => {
            const currentSecurity = formData.security ? formData.security.split(',') : [];
            const value = 'Data Encryption';
            if (e.target.checked) {
              handleChange('security', [...currentSecurity, value].join(','));
            } else {
              handleChange('security', currentSecurity.filter(s => s !== value).join(','));
            }
          }} checked={formData.security && formData.security.includes('Data Encryption')} />
            <label htmlFor="security-encryption">Data Encryption</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="security-audit" className="mr-2" onChange={e => {
            const currentSecurity = formData.security ? formData.security.split(',') : [];
            const value = 'Audit Logging';
            if (e.target.checked) {
              handleChange('security', [...currentSecurity, value].join(','));
            } else {
              handleChange('security', currentSecurity.filter(s => s !== value).join(','));
            }
          }} checked={formData.security && formData.security.includes('Audit Logging')} />
            <label htmlFor="security-audit">Audit Logging</label>
          </div>
        </div>
        <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
          Other Security Requirements
        </label>
        <textarea value={formData.otherSecurity || ''} onChange={e => handleChange('otherSecurity', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="GDPR compliance, penetration testing, etc." rows={3}></textarea>
      </div>
    </div>;
}
function ScheduleStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        7. Schedule and Budget
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timeline
        </label>
        <select value={formData.timeline} onChange={e => handleChange('timeline', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select project timeline</option>
          <option value="Less than 3 months">Less than 3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6-12 months">6-12 months</option>
          <option value="More than 12 months">More than 12 months</option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.timeline === 'custom' && <textarea value={formData.customTimeline || ''} onChange={e => handleChange('customTimeline', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Specify project timeline..." rows={3}></textarea>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cost Estimate
        </label>
        <select value={formData.costEstimate} onChange={e => handleChange('costEstimate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500">
          <option value="">Select budget range</option>
          <option value="Under $10,000">Under $10,000</option>
          <option value="$10,000 - $50,000">$10,000 - $50,000</option>
          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
          <option value="$100,000 - $500,000">$100,000 - $500,000</option>
          <option value="Over $500,000">Over $500,000</option>
          <option value="custom">Custom (specify below)</option>
        </select>
        {formData.costEstimate === 'custom' && <textarea value={formData.customCostEstimate || ''} onChange={e => handleChange('customCostEstimate', e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Specify budget details..." rows={3}></textarea>}
      </div>
    </div>;
}
function AppendicesStep({
  formData,
  handleChange
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">8. Appendices</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplementary Information
        </label>
        <textarea value={formData.supplementary} onChange={e => handleChange('supplementary', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Any additional information that supports the SRS..." rows={4}></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Glossary
        </label>
        <textarea value={formData.glossary} onChange={e => handleChange('glossary', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Define any technical terms used in the document..." rows={4}></textarea>
      </div>
    </div>;
}
function CustomSectionsStep({
  customSections,
  addCustomSection,
  updateCustomSection
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">Custom Sections</h3>
      <p className="text-gray-600">
        Add any additional sections that you want to include in your SRS
        document.
      </p>
      {customSections.length > 0 ? <div className="space-y-6">
          {customSections.map((section, index) => <div key={index} className="border p-4 rounded-md">
              <h4 className="font-medium text-green-700 mb-2">
                Custom Section {index + 1}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Title
                  </label>
                  <input type="text" value={section.title} onChange={e => updateCustomSection(index, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter section title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Content
                  </label>
                  <textarea value={section.content} onChange={e => updateCustomSection(index, 'content', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Enter section content" rows={4}></textarea>
                </div>
              </div>
            </div>)}
        </div> : <div className="text-center py-6 bg-gray-50 rounded-md">
          <p className="text-gray-500">No custom sections added yet.</p>
        </div>}
      <div className="mt-4">
        <button onClick={addCustomSection} className="flex items-center justify-center w-full py-2 px-4 border border-green-600 rounded-md text-green-600 hover:bg-green-50 transition">
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Add Custom Section
        </button>
      </div>
    </div>;
}
function PreviewStep({
  formData
}) {
  return <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-700">
        Preview Your SRS Document
      </h3>
      <p className="text-gray-600">
        Review your SRS document before finalizing.
      </p>
      <div className="border p-4 rounded-md bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            Software Requirements Specification
          </h2>
          <p className="text-lg mt-2">for</p>
          <p className="text-xl font-semibold mt-1">
            {formData.clientName || '[Client Name]'}
          </p>
          <p className="mt-4">Prepared by:</p>
          <p className="font-semibold">
            {formData.companyName || '[Your Company]'}
          </p>
          {formData.logoUrl && <div className="mt-4 flex justify-center">
              <img src={formData.logoUrl} alt="Company Logo" className="max-h-16 object-contain" onError={e => e.currentTarget.style.display = 'none'} />
            </div>}
        </div>
        <div className="space-y-6 mt-8">
          {/* This is just a preview. In a real implementation, we would render all sections with their content */}
          <div className="bg-green-50 p-3 rounded-md">
            <h3 className="font-semibold text-green-700">1. Introduction</h3>
            <p className="text-sm text-gray-600 italic">
              Purpose, Scope, Overview
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <h3 className="font-semibold text-green-700">
              2. General Description
            </h3>
            <p className="text-sm text-gray-600 italic">
              Functions, User Community
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-md">
            <h3 className="font-semibold text-green-700">
              3. Functional Requirements
            </h3>
            <p className="text-sm text-gray-600 italic">
              Possible Outcomes, Ranked Order, Input-Output Relationship
            </p>
          </div>
          {/* More sections would follow... */}
          <p className="text-center text-gray-500 italic">
            [Full preview would display all sections with their content]
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Generate Final SRS Document
        </button>
      </div>
    </div>;
}
function SRSPreview({
  formData,
  onBack
}) {
  return <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">
          SRS Document Preview
        </h2>
        <button onClick={onBack} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          Back to Editor
        </button>
      </div>
      <div className="border-2 border-green-100 p-6 rounded-lg">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">
            Software Requirements Specification
          </h1>
          <p className="text-xl mt-4">for</p>
          <p className="text-2xl font-semibold mt-2">
            {formData.clientName || '[Client Name]'}
          </p>
          <div className="mt-6">
            <p>Prepared by:</p>
            <p className="font-semibold text-lg">
              {formData.companyName || '[Your Company]'}
            </p>
            {formData.logoUrl && <div className="mt-4 flex justify-center">
                <img src={formData.logoUrl} alt="Company Logo" className="max-h-20 object-contain" onError={e => e.currentTarget.style.display = 'none'} />
              </div>}
          </div>
        </div>
        <div className="space-y-8 mt-12">
          <section>
            <h2 className="text-2xl font-bold text-green-700 pb-2 border-b-2 border-green-200">
              1. Introduction
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">1.1 Purpose</h3>
                <p className="mt-1">
                  {formData.sections.introduction.purpose || '[Purpose not specified]'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">1.2 Scope</h3>
                <p className="mt-1">
                  {formData.sections.introduction.scope || '[Scope not specified]'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">1.3 Overview</h3>
                <p className="mt-1">
                  {formData.sections.introduction.overview || '[Overview not specified]'}
                </p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-green-700 pb-2 border-b-2 border-green-200">
              2. General Description
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">2.1 Functions</h3>
                <p className="mt-1">
                  {formData.sections.generalDescription.functions || '[Functions not specified]'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">2.2 User Community</h3>
                <p className="mt-1">
                  {formData.sections.generalDescription.userCommunity || '[User community not specified]'}
                </p>
              </div>
            </div>
          </section>
          {/* Additional sections would be rendered similarly... */}
          {formData.customSections.length > 0 && <section>
              <h2 className="text-2xl font-bold text-green-700 pb-2 border-b-2 border-green-200">
                Custom Sections
              </h2>
              <div className="mt-4 space-y-6">
                {formData.customSections.map((section, index) => <div key={index}>
                    <h3 className="text-lg font-semibold">
                      {section.title || `Custom Section ${index + 1}`}
                    </h3>
                    <p className="mt-1">
                      {section.content || '[Content not specified]'}
                    </p>
                  </div>)}
              </div>
            </section>}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center">
          <FileTextIcon className="mr-2" size={18} />
          Export SRS Document
        </button>
      </div>
    </div>;
}