import { VueQueryPlugin, QueryClient, type UseQueryOptions } from '@tanstack/vue-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3
        },
    }
}
);


type VueQueryOptions<T extends (...args: any) => unknown> = Omit<UseQueryOptions<Awaited<ReturnType<T>>, unknown>, "queryKey" | "queryFn">


export { VueQueryPlugin, queryClient, type VueQueryOptions }

