import { rerouteFromPage } from '../helpers/validation'

export default function Home() {
  return <div></div>
}

export const getServerSideProps = async (ctx) => {
  const props = rerouteFromPage(ctx)
  return props
}
