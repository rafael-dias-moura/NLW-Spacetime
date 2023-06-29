'use client'
// usa-se quando é preciso reatividade para o usuário, quando é preciso que o navegador receba o javascript
import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      // eslint-disable-next-line no-useless-return
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <div>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        className="invisible h-0 w-0"
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </div>
  )
}
