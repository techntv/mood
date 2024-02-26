'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setIsLoading(false)
    },
  })

  return (
    <div className="h-full w-full">
      {isLoading && <div>...loading </div>}
      <textarea
        className="h-full w-full p-4 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
