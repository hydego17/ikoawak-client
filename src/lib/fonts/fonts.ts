import localFont from 'next/font/local';

export const fontSans = localFont({
  src: [
    {
      path: './ibm-plexsans/IBMPlexSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ibm-plexsans/IBMPlexSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './ibm-plexsans/IBMPlexSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './ibm-plexsans/IBMPlexSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './ibm-plexsans/IBMPlexSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './ibm-plexsans/IBMPlexSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './ibm-plexsans/IBMPlexSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './ibm-plexsans/IBMPlexSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
});
