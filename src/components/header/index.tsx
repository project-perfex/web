import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <Link href="/">
      <Image alt="Logo" width={120} height={120} src="/assets/logo.svg" />
    </Link>
  )
}
