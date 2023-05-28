import { CFormLabel, CFormInput, CFormText } from '@coreui/react'

export default function PrimaryInput(props) {
    const { type: campoType = 'text', name: campoName, label: campoLabel, value: campoValue, setStat, valid: campoValid, validMensagem: campoValidMensagem, campoDisabled, disables: formDisables = false, loading = false } = props

    return (
        <>
            <CFormLabel htmlFor={campoName} className="mt-2">
                <h6>{campoLabel}</h6>
            </CFormLabel>
            <CFormInput
                type={campoType}
                id={campoName}
                className={`form-control form-control-lg ${campoValid}`}
                value={campoValue}
                onChange={(e) => {
                    setStat(e.target.value.toLocaleUpperCase())
                }}
                disabled={loading || formDisables || campoDisabled}
                size="lg"
            />
            {campoValid === 'is-invalid' && <CFormText className="help-block text-danger">{campoValidMensagem}</CFormText>}
        </>
    )
}
