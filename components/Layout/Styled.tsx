import styled from 'styled-components'

export const Wrapper = styled.div.attrs({
  className: 'w-full h-screen bg-gray-300',
})`
  overflow: scroll;
`

export const Container = styled.main.attrs({
  className: 'bg-gray-700 h-full mx-auto flex flex-col items-center p-3',
})`
  max-width: 1024px;
`
