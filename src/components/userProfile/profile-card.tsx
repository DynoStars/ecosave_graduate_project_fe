import Image from "next/image"

import { UserProfile} from "@/types"

export default function ProfileCard({ userData }: { userData: UserProfile }) {
  return (
    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4">
          <Image src={userData.avatar || "/placeholder.svg"} alt={userData.username} fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-800">{userData.username}</h2>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </div>
    </div>
  )
}

