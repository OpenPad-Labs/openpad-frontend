import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='layout-header flex w-full flex-shrink-0'>
      <div className='container mx-auto flex justify-between'>
        <div className='flex'>
          <Link href='/' className='logo-box flex items-center justify-center'>
            <Image src='/logo.svg' width={102} height={52} alt='logo' />
          </Link>
          <span className='split-line'></span>
          <nav className='link flex items-center'>
            <Link href='/'>DAO Square</Link>
            <Link href='/mydaos'>MyDAOs</Link>
          </nav>
        </div>
        <div className='flex items-center justify-center'>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
