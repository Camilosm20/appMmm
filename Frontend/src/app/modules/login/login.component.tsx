import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import AuthUseCase from '../../../Core/login/application/useCase'
import { AuthGatewayImpl } from '../../../Core/login/infraestructure/gateway-impl'

type FormState = {
  username: string
  email: string
  password: string
}

const initialState: FormState = {
  username: '',
  email: '',
  password: ''
}

export default function LoginComponent() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  const gateway = new AuthGatewayImpl();
  const useCase = new AuthUseCase(gateway);
  const navigate = useNavigate();
  

  const validate = (values: FormState) => {
    const e: Partial<FormState> = {}
    if (!values.username.trim()) e.username = 'El nombre de usuario es requerido'
    if (!values.email.trim()) e.email = 'El correo es requerido'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) e.email = 'Correo inválido'
    if (!values.password) e.password = 'La contraseña es requerida'
    else if (values.password.length < 4) e.password = 'La contraseña debe tener al menos 4 caracteres'
    return e
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validate(form)
    if (Object.keys(validation).length) {
      setErrors(validation)
      return
    }
    setSubmitting(true)
    try {
      const response = await useCase.login(form)
      if (response.isSuccess) {
          localStorage.setItem('access_token', response?.data ?? '');
          navigate('/');
      }else{
        setErrors(validation);
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Ocurrió un error al enviar el formulario'
      alert(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-aside">
          <div className="login-logo">MMM</div>
          <div className="login-aside-accent" />
          <div className="login-tagline">Super Admin</div>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label className="login-label">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`login-input ${errors.username ? 'login-input--error' : ''}`}
              placeholder="Tu usuario"
              autoComplete="username"
            />
            {errors.username && <div className="login-error">{errors.username}</div>}
          </label>

          <label className="login-label">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`login-input ${errors.email ? 'login-input--error' : ''}`}
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              type="email"
            />
            {errors.email && <div className="login-error">{errors.email}</div>}
          </label>

          <label className="login-label">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`login-input ${errors.password ? 'login-input--error' : ''}`}
              placeholder="Contraseña"
              type="password"
              autoComplete="current-password"
            />
            {errors.password && <div className="login-error">{errors.password}</div>}
          </label>

          <button type="submit" className="login-button" disabled={submitting}>
            {submitting ? 'Enviando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

// Styles moved to `login.scss`
