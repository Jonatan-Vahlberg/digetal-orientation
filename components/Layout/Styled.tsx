import styled from 'styled-components'

export const Wrapper = styled.div.attrs({
  className: 'w-full min-h-screen white',
})`
  overflow: scroll;
`

export const Container = styled.main.attrs({
  className: 'bg-white h-full mx-auto flex flex-col items-center p-3',
})`
  max-width: 1024px;
`
