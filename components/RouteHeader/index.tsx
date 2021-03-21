import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Endpoints from '~/helpers/endpoints'
interface RouteHeaderProps {
  title?: string
  id?: string
  returnHome?: boolean
}

const RouteHeader: React.FC<RouteHeaderProps> = (props) => {
  const router = useRouter()
  const { title, id } = router.query
  const route = props.returnHome
    ? Endpoints.HOME
    : Endpoints.ROUTE_OVERVIEW(id?.toString())
  return (
    <div className="flex pb-4 pt-2 w-full items-center font-semibold  text-3xl">
      <Link {...route}>
        <a>
          <FaArrowLeft className="mr-3" />{' '}
        </a>
      </Link>
      <p className="mb-0 w-full text-center capitalize">
        {title ?? props.title}
      </p>
    </div>
  )
}

export default RouteHeader
