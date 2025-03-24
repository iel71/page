// components/MyModal.jsx
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function Modal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-sm data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogDescription className="sr-only"></DialogDescription>
        <div className="modal-contents">
          <p>검색어는 2글자 이상 입력해주세요.</p>
          <Button onClick={() => onOpenChange(false)}>확인</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
