import { CFormLabel, CFormText, CFormSelect } from '@coreui/react'

export default function PrimarySelect(props) {
    const { campoName, label: campoLabel, value: campoValue, options: campoOptions, setStat, valid: campoValid, validMensagem: campoValidMensagem, campoDisabled, disables: formDisables = false, loading = false } = props
    console.log('props', props)
    return (
        <>
            <CFormLabel htmlFor={campoName} className="mt-2">
                <h6>{campoLabel}</h6>
            </CFormLabel>
            <CFormSelect
                id={campoName}
                className={`form-control form-control-lg ${campoValid}`}
                value={campoValue}
                onChange={(e) => {
                    setStat(e.target.value)
                }}
                disabled={loading || formDisables || campoDisabled}
                options={campoOptions}
                aria-label="Selecione"
                size="lg"
            />
            {campoValid === 'is-invalid' && <CFormText className="help-block text-danger">{campoValidMensagem}</CFormText>}
        </>
    )
}
