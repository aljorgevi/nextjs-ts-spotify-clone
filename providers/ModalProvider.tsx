'use client'

import { useEffect, useState } from 'react'

import { AuthModal } from '@/components/AuthModal'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)

	// This is a hack to prevent the server from rendering the modals
	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<AuthModal />
		</>
	)
}
