
export function ProjectArt({ id }: { id: string }) {
  const projectImages: Record<string, string> = {
    agriguard: '/images/projects/agriguard.png',
    resqnet: '/images/projects/resqnet.png',
    fairhire: '/images/projects/fairhire.png',
    visionedit: '/images/projects/visionedit.png',
  }

  const image = projectImages[id]

  if (!image) return null

  return (
    <figure className="m-0">
      <img
        src={image}
        alt={`${id} project preview`}
className="w-full aspect-[16/9] object-contain rounded-xl border border-line bg-paper p-2"        loading="lazy"
      />
      <figcaption className="mt-1 text-[11px] text-muted">
        Project preview
      </figcaption>
    </figure>
  )
}
