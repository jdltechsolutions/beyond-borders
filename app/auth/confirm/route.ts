import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// import { PrismaClient } from '@/lib/generated/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  // const prisma  = new PrismaClient()

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
    //   const { data: { user } } = await supabase.auth.getUser()

    //   if (user) {
    //     await prisma.user.update({
    //       where: { id: user.id },
    //       data: { emailConfirmed: true }
    //     })
    //   }

      // redirect user to specified redirect URL or root of app
      redirect(next)
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/auth/auth-code-error')
}