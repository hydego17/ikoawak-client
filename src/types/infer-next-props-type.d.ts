type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R> ? R : any;

type Filter<T, U> = T extends U ? T : never;

/**
 * Gets inferred typings for getStaticProps or getServerSideProps.
 * @see https://github.com/vercel/next.js/issues/15913
 *
 * You can add this type if u dont want to type the data fetching context
 * everytime you use it just to get a correct type inference.
 */
type InferNextProps<T> = Filter<AsyncReturnType<T>, { props: any }>['props'];
