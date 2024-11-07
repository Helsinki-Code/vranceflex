import Image from 'next/image'

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/vranceflex-logo.png"
        alt="VranceFlex Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="font-semibold text-xl bg-gradient-to-r from-[#0066ff] to-[#00ccff] text-transparent bg-clip-text">
        VranceFlex
      </span>
    </div>
  )
}