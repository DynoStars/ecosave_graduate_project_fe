import { UserProfile} from "@/types"
  
export default function UserInfoSection({ userData }: { userData: UserProfile }) {
return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-200">
    {/* Left Column */}
    <div className="space-y-6">
        {/* <div>
        <h3 className="text-base font-medium text-gray-500 mb-1">Họ và tên</h3>
        <p className="text-sm text-gray-800">{userData.username}</p>
        </div> */}
        <div>
        <h3 className="text-base font-medium text-gray-500 mb-1">Email</h3>
        <p className="text-sm text-gray-800">{userData.email}</p>
        </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
        <div>
            <h3 className="text-base font-medium text-gray-500 mb-1">Địa chỉ</h3>
            <p className="text-sm text-gray-800">{userData.address}</p>
        </div>
        {/* <div>
        <h3 className="text-base font-medium text-gray-500 mb-1">Số điện thoại</h3>
        <p className="text-sm text-gray-800">{userData.phone_number}</p>
        </div>
        <div>
        <h3 className="text-base font-medium text-gray-500 mb-1">Mật khẩu</h3>
        <p className="text-base text-gray-800">••••••••••••</p>
        </div> */}
    </div>
    </div>
)
}
  
  