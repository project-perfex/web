'use client'

import { useEffect, useState } from 'react'

import { Button } from '../ui/button'

import Modal from '../modal'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title="Deseja excluir?"
      description="Está ação não poderá ser desfeita."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className="
          pt-6
          space-x-2
          flex
          items-center
          justify-end
          w-full
        "
      >
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continuar
        </Button>
      </div>
    </Modal>
  )
}
