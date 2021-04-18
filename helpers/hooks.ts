import { useEffect, useState } from 'react'
import { useLocationStore, useRouteStore, useUserStore } from './stores'

export const useWipeData = () => {
  const routeStore = useRouteStore()
  const userStore = useUserStore()
  const locationStore = useLocationStore()
  useEffect(() => {
    routeStore.wipeData()
    userStore.wipeData()
    locationStore.wipeData()
  }, [])
  return null
}
