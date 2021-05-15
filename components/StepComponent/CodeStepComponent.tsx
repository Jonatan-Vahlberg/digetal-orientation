import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { caluclateDistance } from '~/helpers/functions'
import { useLocationStore, useUserStore } from '~/helpers/stores'
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
  routeId,
}) => {
  const { formatMessage: f } = useIntl()
  const locationStore = useLocationStore()
  const userStore = useUserStore()

  const [submittalError, setSubmittalError] = useState<string>()
  const onsubmit = () => {
    userStore.markStepAsCompleted(routeId, step, () => {
      console.log('COMPLETED')
    })
  }

  return (
    <Formik
      initialValues={{ code: '' }}
      onSubmit={({ code }) => {
        if (code.toLowerCase() === codeData.code) {
          if (
            codeData.acceptCodeOutside ||
            locationStore.isInPolygon(codeData.node.vertices)
          ) {
            onsubmit()
            return
          }
          setSubmittalError(f({ id: 'step.code.code_outside' }))
          return
        }
        setSubmittalError(f({ id: 'step.code.code_incorrect' }))
      }}
    >
      {({ values }) => (
        <Form>
          <div className="mb-3">
            <Input
              name="code"
              placeholder={f({ id: 'step.code.inputPlaceholder' })}
              className="w-full"
            />
            {submittalError && (
              <p className="text-red-600 text-opacity-75">{submittalError}</p>
            )}
          </div>
          <Button type="submit" disabled={values.code === ''}>
            {f({ id: 'step.code.sendCode' })}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CodeStepComponent
