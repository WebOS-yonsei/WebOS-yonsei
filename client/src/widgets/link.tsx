import { AnyRouter, RegisteredRouter, RoutePaths, Link as TanstackLink, LinkProps as TanstackLinkProps } from '@tanstack/react-router';
import { Link as ChakraLink } from '@chakra-ui/react';
import { ComponentProps } from 'react';

type LinkProps<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends RoutePaths<TRouter['routeTree']> | string = string,
  TTo extends string = '',
  TMaskFrom extends RoutePaths<TRouter['routeTree']> | string = TFrom,
  TMaskTo extends string = '',
> = Omit<ComponentProps<typeof ChakraLink>, 'as' | 'to' | 'from' | 'params' | 'search'> & TanstackLinkProps<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>;

/**
 * @dsecription type safe Link component
 */
export function Link({ to, from, params, search, ...rest }: LinkProps) {
  return <ChakraLink as={TanstackLink} to={to} from={from} params={params} search={search} {...rest} />;
}
