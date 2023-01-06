import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';
import Image from 'next/image';
import Link from 'next/link';

import clsxm from '@/lib/clsxm';

const Error = () => {
  return (
    <section className='not-found-page error-page relative h-screen w-screen overflow-hidden bg-[#F0F3F4]'>
      <div className='bg hidden md:block'></div>
      <div className='relative z-10 flex h-full w-full flex-col items-center justify-center pt-14 text-center text-[#554660] md:pt-24'>
        <h1
          className={clsxm(
            'text-stroke-2 text-stroke-black title relative text-center font-semibold text-[#ff5000]',
            'h-[113px] w-[338px] text-[140px] leading-[113px]',
            'md:h-[200px] md:w-[600px] md:text-[248px] md:leading-[200px]',
            'xl:h-[280px] xl:w-[1015px] xl:text-[418px] xl:leading-[280px]'
          )}
        >
          Error
          <Image
            className={clsxm(
              'cat absolute',
              'top-[-5px] right-[55px] w-[85px]',
              'md:top-[-12px] md:right-[100px] md:w-[150px]',
              'xl:top-[-35px] xl:right-[178px] xl:w-[245px]'
            )}
            src='/images/other/cat.png'
            width={245}
            height={290}
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
          Something is wrong
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

Error.getInitialProps = async (contextData: never) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

export default Error;
