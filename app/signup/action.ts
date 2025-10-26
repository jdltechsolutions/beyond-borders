'use server'
import { PrismaClient } from '@/lib/generated/prisma'
import { createClient } from '@/utils/supabase/server'

type SignUpFormData = {
  fullName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
}

export async function signup(formData: SignUpFormData) {
  const supabase = await createClient();
  const prisma = new PrismaClient();
  
  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    return { error: 'Passwords do not match' }
  }
  
  try {
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
  
  // Add user to Prisma database
  if (authData.user) {
    await prisma.user.create({
      data: {
        id: authData.user.id,
        email: formData.email,
          name: formData.fullName,
          phone: formData.phone,
          emailConfirmed: false,
          role: 'CUSTOMER'
      }
    })
  }

  return { success: true }
  } catch (error) {
    return { error: 'An error occurred during signup. Please try again.'}
  } finally {
    await prisma.$disconnect();
  }
 
}