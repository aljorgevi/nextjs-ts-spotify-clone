'use client'

import React, { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

import { useAuthModal } from '@/hooks/useAuthModal'

import { Modal } from './Modal'

export const AuthModal = () => {
	const { session } = useSessionContext()
	const router = useRouter()
	const { onClose, isOpen } = useAuthModal()

	const supabaseClient = useSupabaseClient()

	useEffect(() => {
		if (session) {
			router.refresh() // <- this is for the user to be able to see the changes
			onClose()
		}
	}, [session, router, onClose])

	const onChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return (
		<Modal
			title='Welcome back'
			description='Login to your account.'
			isOpen={isOpen}
			onChange={onChange}
		>
			<Auth
				supabaseClient={supabaseClient}
				providers={['github', 'google']}
				magicLink
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: '#404040',
								brandAccent: '#22c55e'
							}
						}
					}
				}}
				theme='dark'
			/>
		</Modal>
	)
}