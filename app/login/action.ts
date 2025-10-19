'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

type LoginFormData = {
  email: string
  password: string
}

export async function login(formData: LoginFormData) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}