import axios from "axios";
import { useRouter } from "next/router"
import { useState } from "react";
import { mutate } from "swr";


function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

const CreateForm:React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");

  const [field, setField] = useState<string>("transactionId");
  const [operation, setOperation] = useState<string>("contains");

  const [nameError, setNameError] = useState<string>();
  const [criteriaError, setCriteriaError] = useState<string>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<string>();

  const submitForm = async () => {
    setIsProcessing(true);

    try {
      await axios.post('/api/rules', {
        name: name,
        criteria: criteria,
        isEnabled: true,
        field: field,
        operation: operation
      });  // All new rules are enabled by default

      // Invalid the rules cache
      mutate('/api/rules');
      router.push('/rules');
    } catch(err:any) {
      setProcessingError(err.response.data.message);
    } finally {
      setIsProcessing(false);
    }
    
  }

  const handleCancel = () => {
    router.push('/rules');
  }

  const validate = () => {
    let hasError = false;
    if (!name) {
      setNameError("Name is required");
      hasError = true;
    } else {
      setNameError(undefined);
    }

    if (!criteria) {
      setCriteriaError("Criteria is required");
      hasError = true;
    } else {
      setCriteriaError(undefined);
    }

    return hasError;
  }

  const handleSubmit = (event:React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    // Save it
    if (!validate()) {
      submitForm();
    }
  }

  return (
    <div className="px-4 sm:px-6 md:px-8">

      <div hidden={!processingError} className="mb-5">
        <div className="bg-gray-700 border-l-4 border-gray-800 text-gray-300 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{processingError}</p>
        </div>
      </div>

      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create Rule</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Create a new rule to exlude certain transactions from being included in calculations.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="rule-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="rule-name"
                    id="rule-name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    className={classNames(
                      nameError ? 
                        'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
                        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500', 
                        'max-w-lg block w-full shadow-sm sm:max-w-xs sm:text-sm rounded-md'
                      )
                    }
                  />
                  <p className="mt-2 text-sm text-red-600" id="name-error">
                    {nameError}
                  </p>
                </div>
               
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="rule-field" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Field
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="rule-field"
                    name="rule-field"
                    className="mt-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 max-w-lg block w-full shadow-sm  sm:max-w-xs sm:text-sm rounded-md"
                    value={field}
                    onChange={e => setField(e.target.value)}
                  >
                    <option>name</option>
                    <option>transactionId</option>
                    <option>paymentChannel</option>
                  </select>
                </div>
               
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="rule-operation" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Operation
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="rule-operation"
                    name="rule-operation"
                    className="mt-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 max-w-lg block w-full shadow-sm  sm:max-w-xs sm:text-sm rounded-md"
                    onChange={e => setOperation(e.target.value)}
                    value={operation}
                  >
                    <option>contains</option>
                    <option>equals</option>
                  </select>
                </div>
               
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="rule-criteria" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Rule criteria
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    rows={3}
                    name="rule-criteria"
                    id="rule-criteria"
                    onChange={e => setCriteria(e.target.value)}
                    value={criteria}
                    className={classNames(
                      criteriaError ? 
                        'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
                        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500', 
                        'max-w-lg block w-full shadow-sm  sm:max-w-xs sm:text-sm rounded-md'
                      )
                    }/>
                    <p className="mt-2 text-sm text-red-600" id="criteria-error">
                      {criteriaError}
                    </p>
                </div>
              </div>
            </div>
          </div>

    
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              disabled={isProcessing}
              onClick={handleCancel}
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              disabled={isProcessing}
              onClick={(event) => handleSubmit(event)}
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div hidden={!isProcessing}>
                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
              </div>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default CreateForm;