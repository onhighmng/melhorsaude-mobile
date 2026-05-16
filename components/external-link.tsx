import { Href } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { Pressable, Text } from 'react-native';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Pressable>, 'href'> & { href: Href & string };

export function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <Pressable
      {...rest}
      onPress={async () => {
        if (process.env.EXPO_OS !== 'web') {
          await openBrowserAsync(String(href), {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
  );
}
