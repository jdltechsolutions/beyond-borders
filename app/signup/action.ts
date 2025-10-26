'use server'
import { createClient } from '@/utils/supabase/server'

type SignUpFormData = {
  fullName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
}

export async function signup(formData: SignUpFormData) {
  const supabase = await createClient()
  
  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    return { error: 'Passwords do not match' }
  }
  
  // Create new user
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
        phone: formData.phone,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
    }
  })
  
  if (signUpError) {
    return { error: signUpError.message }
  }
  return { success: true }
}