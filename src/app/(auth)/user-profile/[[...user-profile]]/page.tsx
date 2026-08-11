import BreadCrumb from '@/components/navigation/breadcrumb'

import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => (
<div className="flex items-center justify-center h-screen flex-col gap-4">
     <BreadCrumb
      items={[
        {
          label: "User Profile",
          href: "/user-profile",
        },
       
      ]}
    />
<UserProfile />
</div>
)

export default UserProfilePage