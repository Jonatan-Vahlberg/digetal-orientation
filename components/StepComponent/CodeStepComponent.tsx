import { Form, Formik } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import Button from '../Button'
import Input from '../Input'
import Map from '../Map'

interface CodeStepComponentProps {
  step: Step
}

const codeData: CodeData = {
  title: 'Där barn leker och målet är synligt',
  description: 'Finn där i västra kanten längs bänken som',
  node: {
    vertices: [
      { lat: 59.2851255144915, lng: 18.038505839647919 },
      { lat: 59.28524470267394, lng: 18.03881437387636 },
      { lat: 59.284876176943975, lng: 18.039348133470323 },
      { lat: 59.284755617474765, lng: 18.039026268388536 },
    ],
    information: {
      title: 'Football field',
    },
  },
  acceptCodeOutside: true,
  code: 'testing',
}

const TestingData: Step = {
  stepIndex: 0,
  stepData: codeData,
  type: 'CODE',
}

const CodeStepComponent: React.FC<CodeStepComponentProps> = ({ step }) => {
  const { formatMessage: f } = useIntl()
  const stepdetails = { ...TestingData.stepData } as CodeData
  return (
    <div className="w-full flex flex-col max-h-screen h-full">
      <p className="flex-none">{stepdetails.title}</p>
      <p className="flex-none">{stepdetails.description}</p>
      <div className="flex-grow my-3">
        <Map visiblePolygonNodes={[stepdetails.node]} />
      </div>
      <div>
        <Formik initialValues={{ code: '' }} onSubmit={() => {}}>
          {({}) => (
            <Form>
              <Input name="code" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CodeStepComponent
