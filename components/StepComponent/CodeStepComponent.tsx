import { Form, Formik } from 'formik'
import React from 'react'
import { useIntl } from 'react-intl'
import { caluclateDistance } from '~/helpers/functions'
import Button from '../Button'
import Input from '../Input'
import Map from '../Map'

interface CodeStepComponentProps {
  step: Step
  codeData: CodeData
  routeId: string
}

const CodeStepComponent: React.FC<CodeStepComponentProps> = ({
  step,
  codeData,
}) => {
  const { formatMessage: f } = useIntl()
  return (
    <Formik initialValues={{ code: '' }} onSubmit={() => {}}>
      {({ values }) => (
        <Form>
          <Input
            name="code"
            placeholder={f({ id: 'step.code.inputPlaceholder' })}
            className="w-full mb-3"
          />
          <Button disabled={values.code === ''}>
            {f({ id: 'step.code.sendCode' })}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CodeStepComponent
