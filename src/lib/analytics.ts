const gtagEvent = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  gtag('event', 'website_click', {
    [name]: 1,
  });
};

export default gtagEvent;
