import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className: 'w-full h-screen bg-gray-300',
})``;

export const Container = styled.main.attrs({
  className: 'bg-gray-700 h-screen mx-auto flex flex-col items-center p-3',
})`
  max-width: 1024px;
`;