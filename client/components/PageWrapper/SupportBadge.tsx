import { GiftIcon } from "@heroicons/react/24/solid"


const SupportBadge:React.FC = () => {
  return (
    <div className="flex-shrink-0 flex bg-gray-700 p-4 hidden">
      <a href="#" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <GiftIcon className="inline-block h-10 w-10 rounded-full text-white"/>
            
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-white">Support Ledger</p>
            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">Buy Me A Coffee</p>
          </div>
        </div>
      </a>
    </div>
  )
}

export default SupportBadge;