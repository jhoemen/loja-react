import { CFormLabel, CFormText } from '@coreui/react'
import InputMask from 'react-input-mask'

export default function PrimaryInputMask(props) {
    const { mask = '', type: campoType = 'text', name: campoName, label: campoLabel, value: campoValue, setStat, valid: campoValid, validMensagem: campoValidMensagem, campoDisabled, disables: formDisables = false, loading = false } = props

    return (
        <>
            <CFormLabel htmlFor={campoName} className="mt-2">
                <h6>{campoLabel}</h6>
            </CFormLabel>
            <InputMask
                mask={mask}
                type={campoType}
                id={campoName}
                className={`form-control form-control-lg ${campoValid}`}
                value={campoValue}
                onChange={(e) => {
                    setStat(e.target.value.toLocaleUpperCase())
                }}
                disabled={loading || formDisables || campoDisabled}
                size="lg"></InputMask>
            {campoValid === 'is-invalid' && <CFormText className="help-block text-danger">{campoValidMensagem}</CFormText>}
        </>
    )
}
