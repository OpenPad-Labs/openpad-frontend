import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import clsxm from '@/lib/clsxm';

const NotFoundPage: NextPage = () => {
  return (
    <section className='not-found-page h-full overflow-hidden bg-[#F0F3F4]'>
      <div className='bg hidden md:block'></div>
      <div className='relative z-10 flex h-full w-full flex-col items-center justify-center pt-14 text-center text-[#554660] md:pt-24'>
        <h1
          className={clsxm(
            'text-stroke-2 text-stroke-black title relative text-center font-semibold text-[#ff5000]',
            'h-[113px] w-[285px] text-[170px] leading-[113px]',
            'md:h-[240px] md:w-[600px] md:text-[359px] md:leading-[240px]',
            'xl:h-[362px] xl:w-[903px] xl:text-[541px] xl:leading-[362px]'
          )}
        >
          404
          <Image
            className={clsxm(
              'absolute',
              'top-[5px] left-[87px] w-[70px]',
              'md:top-[18px] md:left-[183px] md:w-[150px]',
              'xl:top-[25px] xl:left-[275px] xl:w-[220px]'
            )}
            src='/images/other/paw.png'
            width={270}
            height={216}
            alt=''
          />
        </h1>
        <h2
          className={clsxm(
            'font-semibold',
            'mt-9 text-2xl',
            'md:mt-20 md:text-4xl',
            'xl:mt-24 xl:text-6xl'
          )}
        >
          oops! Page not found
        </h2>
        <Link
          className={clsxm(
            'rounded-lg bg-white px-4 py-2 text-2xl font-bold',
            'mt-5',
            'md:mt-12'
          )}
          href='/'
        >
          BACK TO HOME
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
